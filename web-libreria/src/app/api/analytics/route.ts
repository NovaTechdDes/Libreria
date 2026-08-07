import { getDateRange } from "@/src/helper/date-range";
import { vercelApi } from "@/src/service/vercel.service";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.VERCEL_TOKEN_LACHI!;
const PROJECT_ID = process.env.VERCEL_PROJECT_ID!;
const TEAM_ID = process.env.VERCEL_TEAM_ID!;


async function fetchVisitsCount(since: string, until: string) {
  try {
    const { data } = await vercelApi.get("query/web-analytics/visits/count", {
      params: {
        projectId: PROJECT_ID,
        teamId: TEAM_ID,
        since,
        until,
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return data?.data ?? { visitors: 0, pageviews: 0 };
  } catch {
    return { visitors: 0, pageviews: 0 };
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const range = (searchParams.get("range") as any) || "today";

    const ranges = getDateRange(range);

    const [currentData, previousData] = await Promise.all([
      fetchVisitsCount(ranges.current.from, ranges.current.to),
      fetchVisitsCount(ranges.previous.from, ranges.previous.to),
    ]);

    return NextResponse.json({
      data: currentData,
      current: currentData,
      previous: previousData,
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