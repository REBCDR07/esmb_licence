import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType, BorderStyle, AlignmentType, VerticalAlign } from "docx";
import FileSaver from "file-saver";
import { ProjectInfo, StudentInfo } from "../types";

export const generateDocx = async (student: StudentInfo, project: ProjectInfo) => {
  // Helper to create a label cell (Left column)
  const createLabelCell = (text: string) => {
    return new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text, bold: true, size: 28, font: "Montserrat" })], // 28 half-points = 14pt
        }),
      ],
      width: { size: 30, type: WidthType.PERCENTAGE },
      shading: { fill: "F3F4F6" }, // Light gray background
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 200, bottom: 200, left: 200, right: 200 },
    });
  };

  // Helper to create a value cell (Right column)
  const createValueCell = (content: string | Paragraph[]) => {
    const children = typeof content === "string" 
      ? [new Paragraph({ children: [new TextRun({ text: content, size: 28, font: "Roboto" })] })] // 28 half-points = 14pt
      : content;

    return new TableCell({
      children: children,
      width: { size: 70, type: WidthType.PERCENTAGE },
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 200, bottom: 200, left: 200, right: 200 },
    });
  };

  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      // Row 1: Name
      new TableRow({
        children: [
          createLabelCell("Nom et Prénom"),
          createValueCell(`${student.lastName.toUpperCase()} ${student.firstName}`),
        ],
      }),
      // Row 2: Major
      new TableRow({
        children: [
          createLabelCell("Filière"),
          createValueCell(student.major),
        ],
      }),
      // Row 3: Contact
      new TableRow({
        children: [
          createLabelCell("Contact"),
          createValueCell([
            new Paragraph({ children: [new TextRun({ text: `Email: ${student.email}`, size: 28, font: "Roboto" })] }),
            new Paragraph({ children: [new TextRun({ text: `Tél: ${student.phone}`, size: 28, font: "Roboto" })] }),
          ]),
        ],
      }),
      // Row 4: Topic
      new TableRow({
        children: [
          createLabelCell("Sujet du Mémoire"),
          createValueCell(project.topic),
        ],
      }),
      // Row 5: General Objective
      new TableRow({
        children: [
          createLabelCell("Objectif Général"),
          createValueCell(project.generalObjective),
        ],
      }),
      // Row 6: Specific Objectives
      new TableRow({
        children: [
          createLabelCell("Objectifs Spécifiques"),
          createValueCell(
            project.specificObjectives.map((obj, index) => 
              new Paragraph({
                children: [new TextRun({ text: obj, size: 28, font: "Roboto" })],
                bullet: { level: 0 } 
              })
            )
          ),
        ],
      }),
    ],
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Fiche de renseignements sujet de mémoire",
                bold: true,
                size: 48, // 24pt
                font: "Montserrat",
                color: "2563EB" // Blue 600
              }),
            ],
            heading: "Heading1",
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Cours Méthodologie de Recherche",
                bold: true,
                size: 36, // 18pt
                font: "Montserrat",
                color: "2563EB" // Blue 600
              }),
            ],
            spacing: { after: 600 },
            heading: "Heading2",
            alignment: AlignmentType.CENTER,
          }),
          table,
          new Paragraph({
            children: [
              new TextRun({
                text: `Généré le ${new Date().toLocaleDateString('fr-FR')}`,
                size: 20, // 10pt
                italics: true,
                color: "6B7280"
              })
            ],
            spacing: { before: 400 },
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