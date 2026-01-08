import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportPNG() {
  const element = document.getElementById("dashboard-root");
  if (!element) return;

  const canvas = await html2canvas(element, { scale: 2 });
  const image = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = image;
  link.download = "dashboard.png";
  link.click();
}

export async function exportPDF() {
  const element = document.getElementById("dashboard-root");
  if (!element) return;

  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = (canvas.height * pageWidth) / canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,          // x
    0,          // y
    pageWidth,  // width
    pageHeight  // height
  );

  pdf.save("dashboard.pdf");
}
