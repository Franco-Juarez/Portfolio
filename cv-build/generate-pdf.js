const { chromium } = require("playwright");
const path = require("path");

(async () => {
  const htmlPath = path.resolve(__dirname, "Franco-Juarez-CV.html");
  const pdfPath = path.resolve(__dirname, "../public/Franco-Juarez-CV.pdf");
  const fileUrl = `file://${htmlPath}`;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(fileUrl, { waitUntil: "networkidle" });

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "13mm", right: "15mm", bottom: "13mm", left: "15mm" },
  });

  await browser.close();
  console.log(`Wrote ${pdfPath}`);
})();
