import { chromium as playwrightChromium } from "playwright";
import chromiumPkg from "@sparticuz/chromium";
import { PDFDocument } from "pdf-lib";

const isVercel = !!process.env.VERCEL;

async function launchBrowser() {
  if (isVercel) {
    const chromium = await chromiumPkg.executablePath();
    return await playwrightChromium.launch({
      args: chromiumPkg.args,
      executablePath: chromium,
      headless: true,
    });
  } else {
    return await playwrightChromium.launch({ headless: true });
  }
}

/**
 * html: original HTML (should include a placeholder string <!--FIRST_PAGE_HEADER--> where the header should be injected)
 */
export async function htmlToPdf(html: string) {
  const browser = await launchBrowser();
  const page = await browser.newPage();

  // first pass: render to get total pages
  await page.setContent(html, { waitUntil: "networkidle" });

  // Wait for MathJax to finish if present
  try {
    await page.waitForFunction(() => (window as any).MathJax?.typesetPromise, {
      timeout: 5000,
    });
    await page.evaluate(() => (window as any).MathJax?.typesetPromise?.());
  } catch (e) {
    // if MathJax not present or times out, proceed
  }

  const margin = {
    top: "36px",
    bottom: "80px",
    left: "52px",
    right: "52px",
  };

  // Use an empty headerTemplate but keep footerTemplate so we can still get a properly laid-out PDF.
  const tempPdfBytes = await page.pdf({
    format: "A4",
    printBackground: true,
    margin,
    displayHeaderFooter: true,
    headerTemplate: `<div></div>`,
    footerTemplate: `
      <div style="
      width:100%;
      font-size:16px;
      text-align:center;
      font-family: 'Times New Roman', serif;
      font-weight:600;
      margin-top:10mm;
      margin-bottom:10mm;
      ">
        Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `,
  });

  // get page count using pdf-lib
  const tempPdf = await PDFDocument.load(tempPdfBytes);
  const totalPages = tempPdf.getPageCount();

  // Build a first-page-only header block and inject totalPages
  const headerHtml = `
  <div style="
    font-family:'Times New Roman', serif;
    width:100%;
    font-size:18px;
    font-weight:bold;
    margin-bottom:8mm;
  ">
    <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
    ">
      <!-- Total Pages -->
      <div>[Total No. of Pages : ${totalPages}]</div>

      <!-- Seat Number -->
      <div style="display:flex; align-items:center; gap:10px;">
        <span>SEAT NUMBER</span>

        <div style="display:flex; border:2px solid #000;">
          <div style="width:28px;height:34px;border-right:2px solid #000;"></div>
          <div style="width:28px;height:34px;border-right:2px solid #000;"></div>
          <div style="width:28px;height:34px;border-right:2px solid #000;"></div>
          <div style="width:28px;height:34px;border-right:2px solid #000;"></div>
          <div style="width:28px;height:34px;border-right:2px solid #000;"></div>
          <div style="width:28px;height:34px;"></div>
        </div>
      </div>
    </div>
  </div>
`;

  // Insert header into html. You must have a placeholder in your HTML where this should go.
  // If you don't have one, we prepend the header to the body.
  let htmlWithHeader;
  if (html.includes("<!--FIRST_PAGE_HEADER-->")) {
    htmlWithHeader = html.replace("<!--FIRST_PAGE_HEADER-->", headerHtml);
  } else {
    // prepend inside body so it's part of the first page's flow (not position:fixed)
    htmlWithHeader = html.replace(
      /<body([^>]*)>/i,
      (m) => `${m}\n${headerHtml}`,
    );
  }

  // final render: header is now part of the document body (so it appears only on page 1).
  // Keep footer via displayHeaderFooter for automatic pageNumbers (optional).
  await page.setContent(htmlWithHeader, { waitUntil: "networkidle" });

  // re-run MathJax if needed
  try {
    await page.waitForFunction(() => (window as any).MathJax?.typesetPromise, {
      timeout: 5000,
    });
    await page.evaluate(() => (window as any).MathJax?.typesetPromise?.());
  } catch (e) {}

  const finalPdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin,
    displayHeaderFooter: true,
    // empty headerTemplate so it doesn't render an extra header area on each page
    headerTemplate: `<div></div>`,
    // keep your footerTemplate for page number placement
    footerTemplate: `
      <div style="
      width:100%;
      font-size:16px;
      text-align:center;
      font-family: 'Times New Roman', serif;
      font-weight:600;
      margin-bottom:10mm;
      ">
        Page <span class="pageNumber"></span>
      </div>
    `,
  });

  await browser.close();
  return finalPdf;
}
