import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType, VerticalAlign, AlignmentType, PageOrientation, TableLayoutType, BorderStyle } from "docx";
import FileSaver from "file-saver";
import { ProjectInfo, StudentInfo } from "../types";

export const generateDocx = async (student: StudentInfo, project: ProjectInfo) => {
  // CONSTANTES DE DIMENSIONNEMENT (En Twips: 1/20 de point)
  // A4 Largeur = 11906 twips
  // Marges Latérales = 800 * 2 = 1600 twips
  // Espace utile = 10306 twips
  
  const PAGE_MARGIN = 800; // ~1.4cm
  const PAGE_WIDTH_DXA = 11906;
  const CONTENT_WIDTH_DXA = PAGE_WIDTH_DXA - (PAGE_MARGIN * 2);
  
  const COL_1_WIDTH = Math.floor(CONTENT_WIDTH_DXA * 0.25); // 25%
  const COL_2_WIDTH = Math.floor(CONTENT_WIDTH_DXA * 0.75); // 75%

  // Configuration police
  const FONT_SIZE_CONTENT = 28; // 14pt
  const FONT_SIZE_LABEL = 28; // 14pt
  const COLOR_BLACK = "000000"; // Force le noir pour éviter les textes invisibles sur mobile

  // Helper pour créer une cellule d'étiquette (Colonne gauche)
  const createLabelCell = (text: string) => {
    return new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({ 
              text, 
              bold: true, 
              size: FONT_SIZE_LABEL, 
              font: "Montserrat",
              color: COLOR_BLACK 
            })
          ],
          alignment: AlignmentType.LEFT,
          spacing: { after: 100, before: 50 } // Espacement interne via paragraphe
        }),
      ],
      width: { size: COL_1_WIDTH, type: WidthType.DXA },
      shading: { fill: "F3F4F6" }, // Gris très clair
      verticalAlign: VerticalAlign.CENTER,
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" },
      },
      margins: { top: 100, bottom: 100, left: 150, right: 150 },
    });
  };

  // Helper pour créer une cellule de valeur (Colonne droite)
  const createValueCell = (content: string | Paragraph[]) => {
    const children = typeof content === "string" 
      ? [
          new Paragraph({ 
            children: [
              new TextRun({ 
                text: content, 
                size: FONT_SIZE_CONTENT, 
                font: "Roboto",
                color: COLOR_BLACK
              })
            ],
            spacing: { after: 50 }
          })
        ]
      : content;

    return new TableCell({
      children: children,
      width: { size: COL_2_WIDTH, type: WidthType.DXA },
      verticalAlign: VerticalAlign.CENTER,
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" },
      },
      margins: { top: 100, bottom: 100, left: 150, right: 150 },
    });
  };

  const table = new Table({
    layout: TableLayoutType.FIXED, // CRUCIAL pour mobile : Force la largeur des colonnes
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    rows: [
      // Row 1: Nom et Prénom
      new TableRow({
        children: [
          createLabelCell("Nom et Prénom"),
          createValueCell(`${student.lastName.toUpperCase()} ${student.firstName}`),
        ],
        cantSplit: true, // Empêche la ligne de se couper
      }),
      // Row 2: Filière
      new TableRow({
        children: [
          createLabelCell("Filière"),
          createValueCell(student.major),
        ],
        cantSplit: true,
      }),
      // Row 3: Contact
      new TableRow({
        children: [
          createLabelCell("Contact"),
          createValueCell([
            new Paragraph({ 
              children: [new TextRun({ text: `Email: ${student.email}`, size: FONT_SIZE_CONTENT, font: "Roboto", color: COLOR_BLACK })],
              spacing: { after: 0 }
            }),
            new Paragraph({ 
              children: [new TextRun({ text: `Tél: ${student.phone}`, size: FONT_SIZE_CONTENT, font: "Roboto", color: COLOR_BLACK })],
              spacing: { before: 0 }
            }),
          ]),
        ],
        cantSplit: true,
      }),
      // Row 4: Sujet
      new TableRow({
        children: [
          createLabelCell("Sujet"),
          createValueCell(project.topic),
        ],
        cantSplit: true,
      }),
      // Row 5: Objectif Général
      new TableRow({
        children: [
          createLabelCell("Objectif Général"),
          createValueCell(project.generalObjective),
        ],
        cantSplit: true,
      }),
      // Row 6: Objectifs Spécifiques
      new TableRow({
        children: [
          createLabelCell("Objectifs Spécifiques"),
          createValueCell(
            project.specificObjectives.map((obj, index) => 
              new Paragraph({
                children: [new TextRun({ text: obj, size: FONT_SIZE_CONTENT, font: "Roboto", color: COLOR_BLACK })],
                bullet: { level: 0 }, // Puce standard Word
                spacing: { after: 50 } 
              })
            )
          ),
        ],
        cantSplit: true,
      }),
    ],
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              orientation: PageOrientation.PORTRAIT,
              width: PAGE_WIDTH_DXA, // A4 explicite
              height: 16838, // A4 Hauteur explicite
            },
            margin: {
              top: PAGE_MARGIN,
              bottom: PAGE_MARGIN,
              left: PAGE_MARGIN,
              right: PAGE_MARGIN,
            },
          },
        },
        children: [
          // Titre Principal
          new Paragraph({
            children: [
              new TextRun({
                text: "Fiche de renseignements sujet de mémoire",
                bold: true,
                size: 36, // 18pt
                font: "Montserrat",
                color: "2563EB" // Bleu standard
              }),
            ],
            heading: "Heading1",
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 }, 
          }),
          // Sous-titre
          new Paragraph({
            children: [
              new TextRun({
                text: "Cours Méthodologie de Recherche",
                bold: true,
                size: 28, // 14pt
                font: "Montserrat",
                color: "1E293B" // Gris foncé
              }),
            ],
            spacing: { after: 400 }, 
            heading: "Heading2",
            alignment: AlignmentType.CENTER,
          }),
          // Tableau
          table,
          // Footer
          new Paragraph({
            children: [
              new TextRun({
                text: `Généré le ${new Date().toLocaleDateString('fr-FR')}`,
                size: 16, // 8pt
                italics: true,
                color: "9CA3AF"
              })
            ],
            spacing: { before: 200 },
            alignment: AlignmentType.RIGHT,
          })
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const save = (FileSaver as any).saveAs || FileSaver;
  save(blob, `Synthese_${student.lastName.replace(/\s+/g, '_')}_${student.firstName.replace(/\s+/g, '_')}.docx`);
};