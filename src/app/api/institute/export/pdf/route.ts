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
      // 🔹 If section has subQuestions
      if (section.subQuestions?.length > 0) {
        return section.subQuestions.reduce((subSum: number, sub: any) => {
          const subTotal = (sub.questions || [])
            .map((q: any) => q.marks || 0)
            .sort((a: number, b: number) => b - a)
            .slice(0, sub.questionsToAttempt || 0)
            .reduce((sum: number, m: number) => sum + m, 0);

          return subSum + subTotal;
        }, 0);
      }

      // 🔹 Normal section
      return (section.questions || [])
        .map((q: any) => q.marks || 0)
        .sort((a: number, b: number) => b - a)
        .slice(0, section.questionsToAttempt || 0)
        .reduce((sum: number, m: number) => sum + m, 0);
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

    for (let sIdx = 0; sIdx < paperSet.sections.length; sIdx++) {
      const section = paperSet.sections[sIdx];
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
        section.questions.length > 0 ? `[${marks}]` : ``,
        y,
        60,
        12,
        TimesBold,
      );

      y -= 22;

      const LABEL_X = 80;
      const CONTENT_X = 100;
      const QUESTION_WIDTH = 400; // adjust based on your layout

      const renderFullQuestion = async (
        questionObj: any,
        label: string,
        x = 80,
      ) => {
        drawQuestionWithLabel(
          label,
          questionObj.question,
          12,
          x,
          12,
          TimesFont,
        );

        // MCQ
        if (
          questionObj.questionType === "MCQ" &&
          questionObj.options?.length > 0
        ) {
          y -= 4;
          drawMCQOptions(questionObj.options, 100, 12, TimesFont);
        }

        // SubQuestions
        if (questionObj.subQuestions?.length) {
          y -= 4;

          questionObj.subQuestions.forEach((sq: any, i: number) => {
            const text = `${toRoman(i + 1).toLowerCase()}) ${sq.question}`;

            page.drawText(text, {
              x: 110,
              y,
              size: 12,
              font: TimesFont,
            });

            y -= 14;
          });
        }

        // Image
        if (questionObj.image?.base64) {
          const bytes = Uint8Array.from(
            Buffer.from(questionObj.image.base64.split(",")[1], "base64"),
          );

          const isJpeg =
            questionObj.image.type === "image/jpeg" ||
            questionObj.image.base64.startsWith("data:image/jpeg");

          const img = isJpeg
            ? await pdfDoc.embedJpg(bytes)
            : await pdfDoc.embedPng(bytes);

          const imgWidth = 100;
          const imgHeight = (img.height / img.width) * imgWidth;

          page.drawImage(img, {
            x: 100,
            y: y - imgHeight,
            width: imgWidth,
            height: imgHeight,
          });

          y -= imgHeight + 10;
        }

        // Table
        if (questionObj.table) {
          const cellWidth = 60;
          const cellHeight = 18;
          y -= 10;

          questionObj.table.data.forEach((row: string[], r: number) => {
            row.forEach((cell: string, c: number) => {
              const x = 110 + c * cellWidth;
              const cellY = y - r * cellHeight;

              page.drawRectangle({
                x,
                y: cellY,
                width: cellWidth,
                height: cellHeight,
                borderWidth: 0.5,
                borderColor: rgb(0, 0, 0),
              });

              page.drawText(cell || "—", {
                x: x + 4,
                y: cellY + 5,
                size: 12,
                font: TimesFont,
              });
            });
          });

          y -= questionObj.table.data.length * cellHeight + 8;
        }

        y -= 6;
      };

      if (section.subQuestions?.length > 0) {
        for (let subIdx = 0; subIdx < section.subQuestions.length; subIdx++) {
          const sub = section.subQuestions[subIdx];

          // SubQuestion Header Label (A., B., C.)
          const subLabel = `${String.fromCharCode(65 + subIdx)}.`;

          // Calculate marks for sub block
          const subMarks = sub.questions
            .map((q: any) => q.marks)
            .sort((a: number, b: number) => b - a)
            .slice(0, sub.questionsToAttempt)
            .reduce((a: number, b: number) => a + b, 0);

          // Draw SubQuestion Header Line
          drawLR(
            `${subLabel} ${sub.label}`,
            `[${subMarks}]`,
            y,
            80,
            12,
            TimesBold,
          );

          y -= 18;

          // Reset inner alphabet counter
          let innerLetterIndex = 0;

          for (let qIdx = 0; qIdx < sub.questions.length; qIdx++) {
            const q = sub.questions[qIdx];

            const mainLabel = `${String.fromCharCode(97 + innerLetterIndex)}.`;
            innerLetterIndex++;

            await renderFullQuestion(q, mainLabel, 90);

            if (q.internalChoice) {
              y += 4;
              const orText = "OR";
              const fontSize = 12;
              const orWidth = TimesFont.widthOfTextAtSize(orText, fontSize);
              const orX = CONTENT_X + (QUESTION_WIDTH - orWidth) / 2;

              page.drawText(orText, {
                x: orX,
                y,
                size: fontSize,
                font: TimesFont,
              });

              y -= 16;

              const internalLabel = `${String.fromCharCode(
                97 + innerLetterIndex,
              )}.`;
              innerLetterIndex++;

              await renderFullQuestion(q.internalChoice, internalLabel, 90);
            }
          }

          y -= 10;
        }
      } else {
        let letterIndex = 0;

        for (let qIdx = 0; qIdx < section.questions.length; qIdx++) {
          const q = section.questions[qIdx];

          const mainLabel = `${String.fromCharCode(97 + letterIndex)}.`;
          letterIndex++;

          await renderFullQuestion(q, mainLabel);

          if (q.internalChoice) {
            y += 4;
            const orText = "OR";
            const fontSize = 12;
            const orWidth = TimesFont.widthOfTextAtSize(orText, fontSize);
            const orX = CONTENT_X + (QUESTION_WIDTH - orWidth) / 2;

            page.drawText(orText, {
              x: orX,
              y,
              size: fontSize,
              font: TimesFont,
            });

            y -= 16;

            const internalLabel = `${String.fromCharCode(97 + letterIndex)}.`;
            letterIndex++;

            await renderFullQuestion(q.internalChoice, internalLabel);
          }
        }
      }

      y -= 8;
    }

    // ---------------- BLOOM TABLE (UNIVERSITY FORMAT) ----------------
    type CellOptions = {
      fontSize?: number;
      align?: "center" | "top";
    };

    const wrapText = (
      text: string,
      maxWidth: number,
      font: any,
      fontSize: number,
    ) => {
      // First split manual newlines safely
      const paragraphs = text.split("\n");

      const lines: string[] = [];

      paragraphs.forEach((para) => {
        const words = para.split(" ");
        let currentLine = "";

        words.forEach((word) => {
          const testLine = currentLine ? currentLine + " " + word : word;

          // IMPORTANT: remove any accidental newline
          const safeTestLine = testLine.replace(/\n/g, "");

          const width = font.widthOfTextAtSize(safeTestLine, fontSize);

          if (width < maxWidth - 6) {
            currentLine = testLine;
          } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
          }
        });

        if (currentLine) lines.push(currentLine);
      });

      return lines;
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

      const lines = wrapText(text, width, TimesFont, fontSize);
      const lineHeight = fontSize + 1;

      let startY: number;

      if (align === "top") {
        startY = y + height - fontSize - 4;
      } else {
        const totalTextHeight = (lines.length - 1) * lineHeight + fontSize;

        startY =
          y + (height - totalTextHeight) / 2 + totalTextHeight - fontSize;
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
    const flatQuestions: {
      label: string;
      bloom: string;
      sectionIndex: number;
    }[] = [];

    paperSet.sections.forEach((section: any, sIdx: number) => {
      const hasSub = section.subQuestions?.length > 0;

      if (hasSub) {
        // 🔹 A., B., C.
        section.subQuestions.forEach((sub: any, subIdx: number) => {
          const bloomLevels = (sub.questions || [])
            .map((q: any) => {
              const bloom = BLOOM_LABELS[q.bloomsLevel];

              if (q.internalChoice) {
                return `${bloom}, ${bloom}`;
              }

              return bloom;
            })
            .join(", ");

          flatQuestions.push({
            label: String.fromCharCode(65 + subIdx), // A, B
            bloom: bloomLevels,
            sectionIndex: sIdx,
          });
        });
      } else {
        // 🔹 a., b., c.
        section.questions.forEach((q: any, qIdx: number) => {
          let bloom = BLOOM_LABELS[q.bloomsLevel];

          if (q.internalChoice) {
            bloom = `${bloom}, ${bloom}`;
          }

          flatQuestions.push({
            label: String.fromCharCode(97 + qIdx), // a, b
            bloom,
            sectionIndex: sIdx,
          });
        });
      }
    });

    const TOTAL_COLUMNS = FIXED_COLUMNS + flatQuestions.length;

    let colWidth = Math.floor(AVAILABLE_WIDTH / TOTAL_COLUMNS);
    const MIN_COL_WIDTH = 22;
    if (colWidth < MIN_COL_WIDTH) colWidth = MIN_COL_WIDTH;

    // How many dynamic columns fit per block
    const maxDynamicCols = Math.floor(
      (AVAILABLE_WIDTH - FIXED_COLUMNS * colWidth) / colWidth,
    );

    // Split into blocks
    for (let i = 0; i < flatQuestions.length; i += maxDynamicCols) {
      const block = flatQuestions.slice(i, i + maxDynamicCols);

      let x = MARGIN_LEFT;

      const blockSections: Record<number, any[]> = {};

      block.forEach((q) => {
        if (!blockSections[q.sectionIndex]) {
          blockSections[q.sectionIndex] = [];
        }
        blockSections[q.sectionIndex].push(q);
      });

      // -------- Row 1: Questions + Q.1 Q.2 Q.3 --------

      drawCell("Questions", x, y - rowHeight, colWidth * 3, rowHeight * 2, {
        fontSize: 10,
      });
      x += colWidth * 3;

      Object.entries(blockSections).forEach(([sectionIndex, questions]) => {
        drawCell(
          `Q.${Number(sectionIndex) + 1}.`,
          x,
          y,
          questions.length * colWidth,
          rowHeight,
          { fontSize: 10 },
        );

        x += questions.length * colWidth;
      });

      // -------- Row 2: a b c --------
      x = MARGIN_LEFT + colWidth * 3;
      block.forEach((q) => {
        drawCell(q.label + ".", x, y - rowHeight, colWidth, rowHeight);
        x += colWidth;
      });

      // -------- Row 3: Bloom row --------
      y -= rowHeight * 2;
      x = MARGIN_LEFT;

      const bloomLabel = "Bloom's\nTaxonomy level";
      const fontSize = 9;

      // First calculate max lines needed in this block
      let maxLines = 1;

      block.forEach((q) => {
        const wrapped = wrapText(q.bloom, colWidth, TimesFont, fontSize);
        if (wrapped.length > maxLines) {
          maxLines = wrapped.length;
        }
      });

      const BLOOM_CELL_HEIGHT = Math.max(
        rowHeight,
        maxLines * (fontSize + 2) + 8,
      );

      // Amount by which height increased
      const heightDelta = BLOOM_CELL_HEIGHT - rowHeight;

      // Move y DOWN so growth happens downward
      y -= heightDelta;

      x = MARGIN_LEFT;

      // Left label cell
      drawCell(bloomLabel, x, y - 10, colWidth * 3, BLOOM_CELL_HEIGHT + 10, {
        fontSize: fontSize,
      });
      x += colWidth * 3;

      // Bloom value cells
      block.forEach((q) => {
        drawCell(q.bloom, x, y - 10, colWidth, BLOOM_CELL_HEIGHT + 10, {
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
