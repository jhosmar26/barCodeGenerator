require(JsBarcode, (result) => (JsBarcode = result));
import { jsPDF } from "jspdf";

let pdfButton = document.getElementById("pdfButton");
let pdfButtonLast = document.getElementById("pdfButtonLast");
const func = JsBarcode;
pdfButton.addEventListener("click", () => openPdf(func));
pdfButtonLast.addEventListener("click", () => openPdfLast(func));

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
  let doc = new jsPDF("p", "mm", [210, 335]);

  // TAMAÑOS OFICIALES
  doc.setFontSize(6);
  doc.setLineWidth(0.4);
  let counter = 0;
  const pages = 249;
  let counterOfPages = 751;

  while (counter / 20 < pages) {
    doc.line(0,2.5,2.5,2.5)
    doc.line(207.5,2.5,210,2.5)
    // counter / 20 < page;
    for (let heightIterator = 0; heightIterator < 4; heightIterator++) {
      for (let widthIterator = 0; widthIterator < 5; widthIterator++) {
        let stringToShow =
          countToTwenty.toString().padStart(6, "0") +
          counterOfPages.toString().padStart(3, "0");
        // secuence++;
        // doc.cell(
        //   7 + cardWidth * widthIterator,
        //   2.5 + cardHeight * heightIterator,
        //   cardWidth,
        //   cardHeight,
        //   " ",
        //   heightIterator,
        //   "align"
        // );

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
          `001` + stringToShow + random_number("001"+stringToShow),
          stringToShow + `-${random_number("001"+stringToShow)}`
        );
        doc.addImage(
          img,
          9.5 + cardWidth * widthIterator,
          56.5 + cardHeight * heightIterator,
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
    if (counter / 20 == pages) {
    } else {
      doc.addPage();
    }

    // doc.setDrawColor("#ffffff");
    // doc.cell(1, 1, 1, 5, " ", 1, "align");
    // doc.cell(1, 1, 1, 4, " ", 2, "align");
    // doc.setDrawColor("#000000");
  }

  window.open(URL.createObjectURL(doc.output("blob")));
}

function openPdfLast(func) {
  let doc = new jsPDF("p", "mm", [210, 335]);

  // TAMAÑOS OFICIALES
  doc.setFontSize(6);
  doc.setLineWidth(0.4);
  let iteratorFinalPdf = 1;

  doc.line(0,4,5,4)
  doc.line(205,4,210,4)
  for (let heightIterator = 0; heightIterator < 4; heightIterator++) {
    for (let widthIterator = 0; widthIterator < 5; widthIterator++) {
      let stringToShow = iteratorFinalPdf.toString().padStart(2, "0").slice(-2);
      let img = createBarcode(
        func,
        "0010 000" +
          stringToShow +
          "000" +
          random_number("0010000" + stringToShow + "000"),
        "0000" +
          stringToShow +
          "000" +
          `-${random_number("0010000" + stringToShow + "000")}`
      );
      doc.addImage(
        img,
        9.5 + cardWidth * widthIterator,
        56.5 + cardHeight * heightIterator,
        35,
        17
      );

      iteratorFinalPdf == 19 ? (iteratorFinalPdf = 0) : iteratorFinalPdf++;
    }
  }
  let img = createBarcode(
    func,
    "001000020000" + random_number("001000020000"),
    "000020000" + `-${random_number("001000020000")}`
  );
  doc.addImage(img, 9.2 + cardWidth * 4, 56.7 + cardHeight * 3, 35, 17);
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
