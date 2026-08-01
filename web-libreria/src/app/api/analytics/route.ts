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

    const range = searchParams.get("range");


    const { from, to } = getDateRange(
      (range as any) || "today"
    );

    
    const { data } = await vercelApi.get(`query/web-analytics/visits/count`, {
        params: {
            projectId: PROJECT_ID,
            teamId: TEAM_ID,
            since: from,
            until: to
        },
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    });

   return NextResponse.json(data);
    
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