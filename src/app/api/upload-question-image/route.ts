import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs"; // IMPORTANT

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // ✅ Validate MIME type
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      return NextResponse.json(
        { message: "Only PNG and JPG allowed" },
        { status: 400 }
      );
    }

    // ✅ Read file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ Generate safe filename
    const ext = file.type === "image/png" ? "png" : "jpg";
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;

    // ✅ Save path
    const uploadDir = path.join(process.cwd(), "public/uploads/questions");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    // ✅ Public URL
    const url = `/uploads/questions/${fileName}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("IMAGE UPLOAD ERROR:", error);
    return NextResponse.json(
      { message: "Image upload failed" },
      { status: 500 }
    );
  }
}
