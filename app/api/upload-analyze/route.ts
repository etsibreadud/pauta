import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { buildFallbackAnalysis } from "@/lib/utils/analysis";

export const runtime = "nodejs";

const extractText = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  if (file.type === "application/pdf") {
    const data = await pdfParse(buffer);
    return data.text;
  }
  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.toLowerCase().endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
  return "";
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Arquivo inválido" }, { status: 400 });
  }

  const text = await extractText(file);
  const analysis = buildFallbackAnalysis(text);

  return NextResponse.json({ analysis });
}
