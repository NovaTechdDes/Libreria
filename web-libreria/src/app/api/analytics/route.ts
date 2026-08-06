import { getDateRange } from "@/src/helper/date-range";
import { vercelApi } from "@/src/service/vercel.service";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.VERCEL_TOKEN_LACHI!;
const PROJECT_ID = process.env.VERCEL_PROJECT_ID!;
const TEAM_ID = process.env.VERCEL_TEAM_ID!;


export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const range = (searchParams.get("range") as any) || "today";

    const { from, to } = getDateRange(range);

    // Si es "today", hacemos una única consulta directa
    if (range === "today") {
      const { data } = await vercelApi.get(`query/web-analytics/visits/count`, {
        params: {
          projectId: PROJECT_ID,
          teamId: TEAM_ID,
          since: from,
          until: to,
        },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      return NextResponse.json(data);
    }

    // Para rangos de varios días (semana, 30 días, etc.),
    // dividimos el rango día por día y consultamos en paralelo
    const startDate = new Date(from);
    const endDate = new Date(to);
    
    const dayRanges: { since: string; until: string }[] = [];
    const current = new Date(startDate);

    while (current < endDate) {
      const dayStart = new Date(current);
      const dayEnd = new Date(current);
      dayEnd.setDate(dayEnd.getDate() + 1);

      dayRanges.push({
        since: dayStart.toISOString(),
        until: dayEnd.toISOString(),
      });

      current.setDate(current.getDate() + 1);
    }

    // Consultar todos los días en paralelo con el endpoint funcional 'visits/count'
    const results = await Promise.all(
      dayRanges.map(async (dRange) => {
        try {
          const res = await vercelApi.get(`query/web-analytics/visits/count`, {
            params: {
              projectId: PROJECT_ID,
              teamId: TEAM_ID,
              since: dRange.since,
              until: dRange.until,
            },
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          });
          return res.data?.data ?? { visitors: 0, pageviews: 0 };
        } catch {
          return { visitors: 0, pageviews: 0 };
        }
      })
    );

    const totalVisitors = results.reduce((sum, item) => sum + (item.visitors || 0), 0);
    const totalPageviews = results.reduce((sum, item) => sum + (item.pageviews || 0), 0);

    return NextResponse.json({
      data: {
        visitors: totalVisitors,
        pageviews: totalPageviews,
      },
    });

  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data ?? error.message,
        },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}