require(JsBarcode, (result) => (JsBarcode = result));
import { jsPDF } from "jspdf";

let pdfButton = document.getElementById("pdfButton");
const func = JsBarcode;
pdfButton.addEventListener("click", () => openPdf(func));

// TAMAÑO DE CARDS
const cardWidth = 40;
const cardHeight = 80;

// TAMAÑOS DEL LOGO
const logoWidth = 23;
const logoHeight = 11;

// TAMAÑOS DE INPUTS
const rectWidth = 34;
const rectMarginLeft = 8;
const rectHeight = 8;
const rectMarginTop = 18;

// TEXTOS "OPERADOR"
const textMarginTop = 20;
const textMarginLeft = 25;

// IMPRESION DE LOGOS
// let secuence = 0;
let countToTwenty = 0;

function openPdf(func) {
  let doc = new jsPDF("p", "mm", [210, 330]);

  // TAMAÑOS OFICIALES
  doc.setFontSize(6);
  doc.setLineWidth(0.4);
  let counter = 0;
  const pages = 5;
  let counterOfPages = 1;

  while (counter / 20 < pages) {
    // counter / 20 < page;
    for (let heightIterator = 0; heightIterator < 4; heightIterator++) {
      for (let widthIterator = 0; widthIterator < 5; widthIterator++) {
        let stringToShow =
          countToTwenty.toString().padStart(7, "0") +
          counterOfPages.toString().padStart(3, "0");
        // secuence++;
        doc.cell(
          5 + cardWidth * widthIterator,
          4 + cardHeight * heightIterator,
          cardWidth,
          cardHeight,
          " ",
          heightIterator,
          "align"
        );

        // doc.addImage(
        //   "test.png",
        //   "JPEG",
        //   19.5 + cardWidth * widthIterator,
        //   5 + cardHeight * heightIterator,
        //   logoWidth,
        //   logoHeight,
        //   "logo"
        // );

        // doc.rect(
        //   rectMarginLeft + cardWidth * widthIterator,
        //   rectMarginTop + cardHeight * heightIterator,
        //   rectWidth,
        //   rectHeight
        // );
        // doc.rect(
        //   rectMarginLeft + cardWidth * widthIterator,
        //   rectMarginTop + 11 + cardHeight * heightIterator,
        //   rectWidth,
        //   rectHeight
        // );
        // doc.rect(
        //   rectMarginLeft + cardWidth * widthIterator,
        //   rectMarginTop + 22 + cardHeight * heightIterator,
        //   rectWidth,
        //   rectHeight
        // );
        // doc.rect(
        //   rectMarginLeft + cardWidth * widthIterator,
        //   rectMarginTop + 33 + cardHeight * heightIterator,
        //   rectWidth,
        //   rectHeight
        // );

        // doc.text(
        //   "Operador",
        //   textMarginLeft + cardWidth * widthIterator,
        //   textMarginTop + cardHeight * heightIterator,
        //   { align: "center" }
        // );
        // doc.text(
        //   "Conteos",
        //   textMarginLeft + cardWidth * widthIterator,
        //   textMarginTop + 11 + cardHeight * heightIterator,
        //   {
        //     align: "center",
        //   }
        // );
        // doc.text(
        //   "Total",
        //   textMarginLeft + cardWidth * widthIterator,
        //   textMarginTop + 22 + cardHeight * heightIterator,
        //   {
        //     align: "center",
        //   }
        // );
        // doc.text(
        //   "Validación",
        //   textMarginLeft + cardWidth * widthIterator,
        //   textMarginTop + 33 + cardHeight * heightIterator,
        //   {
        //     align: "center",
        //   }
        // );

        let img = createBarcode(
          func,
          `001` + stringToShow + random_number(stringToShow),
          stringToShow + `-${random_number(stringToShow)}`
        );
        doc.addImage(
          img,
          7.5 + cardWidth * widthIterator,
          60 + cardHeight * heightIterator,
          35,
          17
        );
        countToTwenty == 19
          ? ((countToTwenty = 0), counterOfPages++)
          : countToTwenty++;

        // doc.text(
        //   `SECUENCIA Nº ${counter}`,
        //   25 + cardWidth * widthIterator,
        //   80 + cardHeight * heightIterator,
        //   {
        //     align: "center",
        //   }
        // );
        counter++;
      }
    }
    doc.setDrawColor("#ffffff");
    doc.cell(1, 1, 1, 5, " ", 1, "align");
    doc.cell(1, 1, 1, 4, " ", 2, "align");
    doc.setDrawColor("#000000");
  }

  window.open(URL.createObjectURL(doc.output("blob")));
}

function createBarcode(func, hiddenCode, showedCode) {
  let canvas = document.createElement("canvas");
  func(canvas, hiddenCode, {
    format: "CODE128",
    height: 40,
    width: 1.7,
    displayValue: true,
    text: showedCode,
    textMargin: 2,
  });
  return canvas.toDataURL();
}

function random_number(n) {
  let number = n.split("").reduce((partialSum, e, indx) => {
    let a = Number.parseInt(e);
    let c = indx % 2 === 0 ? a * 1 : a * 3;
    return partialSum + c;
  }, 0);
  return String(10 - (number % 10)).slice(-1);
}
