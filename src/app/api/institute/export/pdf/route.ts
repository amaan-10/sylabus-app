import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import fontkit from "@pdf-lib/fontkit";
import { toRoman } from "@/lib/utility/helper";

const BLOOM_LABELS: Record<string, string> = {
  Remember: "R1",
  Understand: "U2",
  Apply: "A3",
  Analyze: "A4",
  Evaluate: "E5",
  Create: "C6",
};

function numberToWords(n: number) {
  const words = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
    "Twenty",
  ];
  return words[n] || n.toString();
}

async function blobUrlToBase64(blobUrl: string): Promise<string> {
  const res = await fetch(blobUrl);
  const blob = await res.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

export async function POST(req: Request) {
  try {
    const { institute, courseMeta, paperSet, paperSetNo } = await req.json();

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    let page = pdfDoc.addPage([595, 842]); // A4

    const PAGE_WIDTH = page.getWidth();
    const MARGIN_LEFT = 40;
    const LEFT_MARGIN = 80;
    const MARGIN_RIGHT = 40;
    const AVAILABLE_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
    const MAX_WIDTH = PAGE_WIDTH - LEFT_MARGIN - MARGIN_RIGHT;

    const rowHeight = 22;
    const FIXED_COLUMNS = 3;

    const fontPathGeorgia = path.join(
      process.cwd(),
      "public/fonts/Georgia.ttf",
    );
    const fontPathGeorgiaBold = path.join(
      process.cwd(),
      "public/fonts/Georgia-Bold.ttf",
    );
    const fontPathGeorgiaBoldItalic = path.join(
      process.cwd(),
      "public/fonts/Georgia-BoldItalic.ttf",
    );
    const fontPathCambria = path.join(
      process.cwd(),
      "public/fonts/Cambria.ttf",
    );
    const fontPathCambriaBold = path.join(
      process.cwd(),
      "public/fonts/Cambria-Bold.ttf",
    );
    const fontPathCambriaBoldItalic = path.join(
      process.cwd(),
      "public/fonts/Cambria-BoldItalic.ttf",
    );

    const georgiaBytes = fs.readFileSync(fontPathGeorgia);
    const georgiaBytesBold = fs.readFileSync(fontPathGeorgiaBold);
    const georgiaBytesBoldItalic = fs.readFileSync(fontPathGeorgiaBoldItalic);
    const cambriaBytes = fs.readFileSync(fontPathCambria);
    const cambriaBytesBold = fs.readFileSync(fontPathCambriaBold);
    const cambriaBytesBoldItalic = fs.readFileSync(fontPathCambriaBoldItalic);

    const TimesFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const TimesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    const GeorgiaFont = await pdfDoc.embedFont(georgiaBytes);
    const GeorgiaBold = await pdfDoc.embedFont(georgiaBytesBold);
    const GeorgiaBoldItalic = await pdfDoc.embedFont(georgiaBytesBoldItalic);

    const CambriaFont = await pdfDoc.embedFont(cambriaBytes);
    const CambriaBold = await pdfDoc.embedFont(cambriaBytesBold);
    const CambriaBoldItalic = await pdfDoc.embedFont(cambriaBytesBoldItalic);

    let y = 800;

    const drawText = (text: string, size = 10, x = 40, font = TimesFont) => {
      page.drawText(text, {
        x,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });

      y -= size + 6;
    };

    const drawCentered = (
      text: string,
      y: number,
      size = 12,
      font = GeorgiaBold,
    ) => {
      const width = font.widthOfTextAtSize(text, size);
      page.drawText(text, {
        x: (page.getWidth() - width) / 2,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });
    };

    /* ---------------- HEADER ---------------- */
    const logoPath = path.join(process.cwd(), `public/${institute.logoUrl}`);
    const logoBytes = fs.readFileSync(logoPath);
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const totalPages = pdfDoc.getPageCount();
    const pagesLabel = String(totalPages).padStart(2, "0");
    const examDate = courseMeta.examDate
      ? new Date(courseMeta.examDate)
      : new Date();

    const month = String(examDate.getMonth() + 1).padStart(2, "0");
    const year = String(examDate.getFullYear()).slice(-2);

    const monthYear = `${month}${year}`; // e.g. 0925
    const headerRightText = `No. of Pages: ${pagesLabel}     ${monthYear}/${String(paperSetNo).padStart(2, "0")}`;

    page.drawImage(logoImage, {
      x: 24,
      y: 725,
      width: 70,
      height: 70,
    });

    page.drawText(headerRightText, {
      x: 450,
      y: 805,
      size: 9,
      font: CambriaBold,
    });

    // const totalQuestions = paperSet.sections.reduce(
    //   (sum: number, section: any) => sum + section.questions.length,
    //   0,
    // );
    const totalQuestions = paperSet.sections.length;
    const totalQuestionsLabel = String(totalQuestions).padStart(2, "0");

    page.drawText(`Total No. of Questions: ${totalQuestionsLabel}`, {
      x: 450,
      y: 793,
      size: 9,
      font: CambriaBold,
    });

    y = 800;

    drawCentered(`${institute.society}`, y, 10);
    y -= 16;

    drawCentered(`${institute.name}`, y, 16);
    y -= 16;

    drawCentered(
      `${institute.description} ${institute.autonomous ? "(Autonomous)" : ""}`,
      y,
      12,
    );
    y -= 18;

    drawCentered(`${institute.affiliation}`, y, 10);
    y -= 18;

    drawCentered(`${courseMeta.examTitle.toUpperCase()}`, y, 10);
    y -= 22;

    drawCentered(`${courseMeta.degree}`, y, 12);
    y -= 14;

    drawCentered(
      `${courseMeta.pattern} Pattern (Semester – ${toRoman(courseMeta.semester)})`,
      y,
      11,
      CambriaBold,
    );
    y -= 14;

    drawCentered(
      `${courseMeta.courseCode}: ${courseMeta.courseTitle} (${courseMeta.credits} Credits)`,
      y,
      12,
      CambriaBold,
    );

    const seatY = y + 15;

    page.drawRectangle({
      x: 430,
      y: seatY,
      width: 125,
      height: 28,
      borderWidth: 1,
      borderColor: rgb(0, 0, 0),
    });

    page.drawText("Seat No.:", {
      x: 440,
      y: seatY + 9,
      size: 10,
      font: GeorgiaBold,
    });

    const drawLR = (
      left: string,
      right: string,
      y: number,
      x = 40,
      size = 11,
      font = CambriaBold,
    ) => {
      page.drawText(left, {
        x,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });

      const rightWidth = GeorgiaBold.widthOfTextAtSize(right, size);

      page.drawText(right, {
        x: page.getWidth() - 40 - rightWidth,
        y,
        size,
        font: CambriaBold,
        color: rgb(0, 0, 0),
      });
    };

    y -= 20;

    const calculateSectionMarks = (section: any) => {
      return section.questions
        .map((q: any) => q.marks)
        .sort((a: number, b: number) => b - a)
        .slice(0, section.questionsToAttempt)
        .reduce((a: number, b: number) => a + b, 0);
    };

    const totalMaxMarks = paperSet.sections.reduce(
      (sum: number, section: any) => sum + calculateSectionMarks(section),
      0,
    );

    drawLR("Time: 2 Hours", `Max. Marks: ${totalMaxMarks}`, y);

    y -= 24;

    page.drawText("Instructions to the Candidates:", {
      x: 60,
      y,
      size: 11,
      font: CambriaBoldItalic,
      color: rgb(0, 0, 0),
    });

    y -= 18;

    const instructions = [
      "1) Question 1 is compulsory.",
      "2) Attempt any FIVE from Q.2.",
      "3) Draw the neat sketches wherever necessary to illustrate the answer.",
    ];

    instructions.forEach((line) => {
      page.drawText(line, {
        x: 80,
        y,
        size: 11,
        font: CambriaBoldItalic,
        color: rgb(0, 0, 0),
      });

      y -= 16;
    });

    page.drawLine({
      start: { x: 40, y: y },
      end: { x: 555, y: y },
      thickness: 2,
      color: rgb(0, 0, 0),
    });

    /* ---------------- QUESTIONS ---------------- */
    const drawQuestionWithLabel = (
      label: string,
      text: string,
      size = 12,
      x = 80,
      labelGap = 18,
      font = TimesFont,
      lineGap = 4,
    ) => {
      // Draw label (h), a), etc.)
      page.drawText(label, {
        x,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });

      const labelWidth = font.widthOfTextAtSize(label, size);

      // Question text starts AFTER label
      const textX = x + labelWidth + labelGap;
      const maxWidth = PAGE_WIDTH - textX - MARGIN_RIGHT;

      const words = text.split(" ");
      let line = "";

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const testWidth = font.widthOfTextAtSize(testLine, size);

        if (testWidth > maxWidth && line !== "") {
          page.drawText(line, {
            x: textX,
            y,
            size,
            font,
            color: rgb(0, 0, 0),
          });

          y -= size + lineGap;
          line = words[i] + " ";
        } else {
          line = testLine;
        }
      }

      // Draw remaining line
      if (line) {
        page.drawText(line, {
          x: textX,
          y,
          size,
          font,
          color: rgb(0, 0, 0),
        });

        y -= size + lineGap;
      }

      // Page break safety
      if (y < 80) {
        page = pdfDoc.addPage([595, 842]);
        y = 800;
      }
    };
    const drawMCQOptions = (
      options: string[],
      startX = 110,
      size = 12,
      font = TimesFont,
    ) => {
      options.forEach((opt, i) => {
        const roman = `(${toRoman(i + 1).toLowerCase()})`;

        drawQuestionWithLabel(roman, opt, size, startX, 8, font);
      });
    };

    y -= 18;

    paperSet.sections.forEach(async (section: any, sIdx: number) => {
      const marks = section.questions
        .map((q: any) => q.marks)
        .sort((a: number, b: number) => b - a)
        .slice(0, section.questionsToAttempt)
        .reduce((a: number, b: number) => a + b, 0);

      drawLR(
        `Q.${sIdx + 1}] ${section.sectionTitle} ${
          section.questionsToAttempt !== section.questions.length
            ? `(Attempt ANY ${numberToWords(section.questionsToAttempt).toUpperCase()})`
            : ``
        }`,
        `[${marks}]`,
        y,
        60,
        12,
        TimesBold,
      );

      y -= 22;

      for (let qIdx = 0; qIdx < section.questions.length; qIdx++) {
        const q = section.questions[qIdx];
        const label = `${String.fromCharCode(97 + qIdx)})`;

        // 1️⃣ Main Question
        drawQuestionWithLabel(label, q.question, 12, 80, 12, TimesFont);

        // 2️⃣ MCQ Options
        if (q.questionType === "MCQ" && q.options?.length > 0) {
          y -= 4;

          drawMCQOptions(
            q.options,
            100, // same indentation area
            12,
            TimesFont,
          );
        }

        // 3️⃣ Sub-questions (same area)
        if (q.subQuestions?.length) {
          y -= 4;

          q.subQuestions.forEach((sq: any, i: number) => {
            const text = `${toRoman(i + 1).toLowerCase()}) ${sq.question} (${sq.marks})`;

            page.drawText(text, {
              x: 100, // same indent as MCQ
              y,
              size: 10,
              font: TimesFont,
            });

            y -= 14;
          });
        }

        // 4️⃣ Image (same flow)
        function base64ToBytes(base64: string): Uint8Array {
          return Uint8Array.from(Buffer.from(base64.split(",")[1], "base64"));
        }

        if (q.image?.base64) {
          const bytes = base64ToBytes(q.image.base64);

          // 🧠 safer image type detection
          const isJpeg =
            q.image.type === "image/jpeg" ||
            q.image.base64.startsWith("data:image/jpeg");

          const img = isJpeg
            ? await pdfDoc.embedJpg(bytes)
            : await pdfDoc.embedPng(bytes);

          const imgWidth = 100;
          const imgHeight = (img.height / img.width) * imgWidth;

          // ⚠️ page-break guard
          // if (y - imgHeight < 50) {
          //   page = pdfDoc.addPage();
          //   y = page.getHeight() - 60;
          // }

          page.drawImage(img, {
            x: 100,
            y: y - imgHeight,
            width: imgWidth,
            height: imgHeight,
          });

          y -= imgHeight + 10;
        }

        // 5️⃣ Table (same flow, same area)
        if (q.table) {
          const cellWidth = 60;
          const cellHeight = 18;
          y -= 10;

          q.table.data.forEach((row: string[], r: number) => {
            row.forEach((cell: string, c: number) => {
              const x = 100 + c * cellWidth;
              const cellY = y - r * cellHeight;

              // Border
              page.drawRectangle({
                x,
                y: cellY,
                width: cellWidth,
                height: cellHeight,
                borderWidth: 0.5,
                borderColor: rgb(0.7, 0.7, 0.7),
              });

              // Text
              page.drawText(cell || "—", {
                x: x + 4,
                y: cellY + 5,
                size: 9,
                font: TimesFont,
              });
            });
          });

          y -= q.table.data.length * cellHeight + 8;
        }

        // 6️⃣ Space after question block
        y -= 6;
      }

      y -= 8;
    });

    // ---------------- BLOOM TABLE (UNIVERSITY FORMAT) ----------------
    type CellOptions = {
      fontSize?: number;
      align?: "center" | "top";
    };

    const drawCell = (
      text: string,
      x: number,
      y: number,
      width: number,
      height: number,
      options: CellOptions = {},
    ) => {
      const fontSize = options.fontSize ?? 9;
      const align = options.align ?? "center";

      page.drawRectangle({
        x,
        y,
        width,
        height,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
      });

      const lines = text.split("\n");
      const lineHeight = fontSize + 1;

      let startY: number;

      if (align === "top") {
        startY = y + height - fontSize - 4;
      } else {
        const totalTextHeight = lines.length * fontSize;
        startY = y + (height - totalTextHeight) / 2 + 2;
      }

      lines.forEach((line) => {
        const textWidth = TimesFont.widthOfTextAtSize(line, fontSize);
        const textX = x + (width - textWidth) / 2;

        page.drawText(line, {
          x: textX,
          y: startY,
          size: fontSize,
          font: TimesFont,
          color: rgb(0, 0, 0),
        });

        startY -= lineHeight;
      });
    };

    // ---------------- BLOOM TABLE (SAFE & RESPONSIVE) ----------------
    y -= 30;

    // Page break safety
    if (y < 80) {
      page = pdfDoc.addPage([595, 842]);
      y = 800;
    }

    // Flatten questions
    const flatQuestions: { label: string; bloom: string }[] = [];

    paperSet.sections.forEach((section: any, sIdx: number) => {
      section.questions.forEach((q: any, qIdx: number) => {
        flatQuestions.push({
          label: `Q${sIdx + 1}${String.fromCharCode(97 + qIdx)}`,
          bloom: BLOOM_LABELS[q.bloomsLevel] ?? q.bloomsLevel,
        });
      });
    });

    const TOTAL_COLUMNS = FIXED_COLUMNS + flatQuestions.length;

    let colWidth = Math.floor(AVAILABLE_WIDTH / TOTAL_COLUMNS);
    const MIN_COL_WIDTH = 22;
    if (colWidth < MIN_COL_WIDTH) colWidth = MIN_COL_WIDTH;

    // How many dynamic columns fit per block
    const maxDynamicCols = Math.floor(
      (AVAILABLE_WIDTH - FIXED_COLUMNS * colWidth) / colWidth,
    );

    const sectionMeta = paperSet.sections.map((section: any, sIdx: number) => ({
      title: `Q.${sIdx + 1}`,
      count: section.questions.length,
    }));

    // Split into blocks
    for (let i = 0; i < flatQuestions.length; i += maxDynamicCols) {
      const block = flatQuestions.slice(i, i + maxDynamicCols);

      let x = MARGIN_LEFT;

      // -------- Row 1: Questions / Q.x --------
      drawCell("Questions", x, y - rowHeight, colWidth * 3, rowHeight * 2, {
        fontSize: 10,
      });
      x += colWidth * 3;

      sectionMeta.forEach((sec: any) => {
        drawCell(sec.title, x, y, sec.count * colWidth, rowHeight, {
          fontSize: 10,
        });
        x += sec.count * colWidth;
      });

      // -------- Row 2: a b c --------
      x = MARGIN_LEFT + colWidth * 3;
      block.forEach((q) => {
        drawCell(
          q.label.slice(-1) + ".",
          x,
          y - rowHeight,
          colWidth,
          rowHeight,
        );
        x += colWidth;
      });

      // -------- Row 3: Bloom row --------
      y -= rowHeight * 2;
      x = MARGIN_LEFT;

      const bloomLabel = "Bloom’s\nTaxonomy level";
      const fontSize = 9;

      const bloomLines = bloomLabel.split("\n").length;
      const BLOOM_CELL_HEIGHT = Math.max(rowHeight, bloomLines * fontSize + 10);

      // Amount by which height increased
      const heightDelta = BLOOM_CELL_HEIGHT - rowHeight;

      // Move y DOWN so growth happens downward
      y -= heightDelta;

      x = MARGIN_LEFT;

      // Left label cell
      drawCell(bloomLabel, x, y, colWidth * 3, BLOOM_CELL_HEIGHT, {
        fontSize: fontSize,
        align: "top",
      });
      x += colWidth * 3;

      // Bloom value cells
      block.forEach((q) => {
        drawCell(q.bloom, x, y, colWidth, BLOOM_CELL_HEIGHT, {
          fontSize: fontSize,
        });
        x += colWidth;
      });

      // Now move cursor BELOW the row
      y -= BLOOM_CELL_HEIGHT + 15;
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(
      new Blob([pdfBytes as BlobPart], { type: "application/pdf" }),
      {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${paperSet.setName}.pdf"`,
        },
      },
    );
  } catch (err) {
    console.error("PDF generation failed:", err);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 },
    );
  }
}
