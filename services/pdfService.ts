import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProjectInfo, StudentInfo } from "../types";

export const generatePdf = (student: StudentInfo, project: ProjectInfo) => {
  // 1. Initialisation du document (A4, Portrait)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // --- TITRES ---
  
  // Titre principal
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(37, 99, 235); // Bleu (Equivalent blue-600)
  // Centrage manuel approximatif ou calculé
  const title = "Fiche de renseignements sujet de mémoire";
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - textWidth) / 2, 20);

  // Sous-titre
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59); // Slate-800
  const subtitle = "Cours Méthodologie de Recherche";
  const subtitleWidth = doc.getTextWidth(subtitle);
  doc.text(subtitle, (pageWidth - subtitleWidth) / 2, 28);

  // --- DONNÉES DU TABLEAU ---

  const specificObjectivesFormatted = project.specificObjectives
    .map((obj, idx) => `• ${obj}`)
    .join("\n");

  const contactFormatted = `Email: ${student.email}\nTél: ${student.phone}`;

  const tableBody = [
    ["Nom et Prénom", `${student.lastName.toUpperCase()} ${student.firstName}`],
    ["Filière", student.major],
    ["Contact", contactFormatted],
    ["Sujet", project.topic],
    ["Objectif Général", project.generalObjective],
    ["Objectifs Spécifiques", specificObjectivesFormatted]
  ];

  // --- GÉNÉRATION DU TABLEAU ---

  autoTable(doc, {
    startY: 40,
    head: [], // Pas d'en-tête horizontal, c'est un tableau vertical
    body: tableBody,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 11,
      cellPadding: 4,
      lineColor: [226, 232, 240], // slate-200
      lineWidth: 0.1,
      textColor: [0, 0, 0], // Noir pur
      overflow: 'linebreak', // Gestion du texte long
    },
    columnStyles: {
      0: { 
        cellWidth: 50, 
        fontStyle: 'bold', 
        fillColor: [243, 244, 246], // gray-100 (Fond gris pour les étiquettes)
        textColor: [30, 41, 59], // Texte gris foncé
        valign: 'middle'
      },
      1: { 
        cellWidth: 'auto', // Prend le reste de la place
        fontStyle: 'normal',
        textColor: [0, 0, 0], // Noir
        valign: 'middle'
      }
    },
    // Gestion des sauts de page si le contenu est très long
    pageBreak: 'auto',
  });

  // --- FOOTER ---
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(156, 163, 175); // Gray-400
  doc.text(
    `Généré le ${new Date().toLocaleDateString('fr-FR')}`, 
    pageWidth - 20, 
    pageHeight - 10, 
    { align: 'right' }
  );

  // --- SAUVEGARDE ---
  doc.save(`Synthese_${student.lastName.replace(/\s+/g, '_')}_${student.firstName.replace(/\s+/g, '_')}.pdf`);
};