import fs from "fs";
import path from "path";
import { buildHtmlPaper } from "@/lib/pdf/buildHtmlPaper";
import { htmlToPdf } from "@/lib/pdf/htmlToPdf";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const data = await req.json();

  const html = buildHtmlPaper(data);

  const pdf = await htmlToPdf(`${html}`);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store",
    },
  });
}
