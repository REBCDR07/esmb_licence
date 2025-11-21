import React, { useState } from 'react';
import { AppState } from '../types';
import { generateDocx } from '../services/docxService';
import { generatePdf } from '../services/pdfService';
import { Download, ArrowLeft, CheckCircle, FileType } from 'lucide-react';

interface ReviewStepProps {
  state: AppState;
  onBack: () => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ state, onBack }) => {
  const [isDocxDownloading, setIsDocxDownloading] = useState(false);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);

  const handleDownloadDocx = async () => {
    setIsDocxDownloading(true);
    try {
        await generateDocx(state.studentInfo, state.projectInfo);
    } catch (e) {
        console.error(e);
        alert("Erreur lors de la génération du document Word.");
    } finally {
        setIsDocxDownloading(false);
    }
  };

  const handleDownloadPdf = () => {
    setIsPdfDownloading(true);
    try {
        generatePdf(state.studentInfo, state.projectInfo);
    } catch (e) {
        console.error(e);
        alert("Erreur lors de la génération du PDF.");
    } finally {
        setIsPdfDownloading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Tout est prêt !</h2>
        <p className="text-slate-500 mt-1">Vérifiez vos informations ci-dessous avant de télécharger.</p>
      </div>

      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          <div>
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Étudiant</h3>
            <p className="font-medium text-slate-800 text-lg">{state.studentInfo.lastName.toUpperCase()} {state.studentInfo.firstName}</p>
            <p className="text-slate-600">{state.studentInfo.major}</p>
          </div>
          
          <div>
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Contact</h3>
            <p className="text-slate-600">{state.studentInfo.email}</p>
            <p className="text-slate-600">{state.studentInfo.phone}</p>
          </div>

          <div className="md:col-span-2 border-t border-slate-200 pt-4">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Sujet</h3>
            <p className="font-medium text-slate-800">{state.projectInfo.topic}</p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Objectif Général</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{state.projectInfo.generalObjective}</p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Objectifs Spécifiques</h3>
            <ul className="space-y-2">
              {state.projectInfo.specificObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full mt-0.5">{idx + 1}</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          
          {/* Bouton Word */}
          <button
            onClick={handleDownloadDocx}
            disabled={isDocxDownloading || isPdfDownloading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isDocxDownloading ? (
               <>Génération Word...</>
            ) : (
               <><Download size={20} /> Télécharger Word</>
            )}
          </button>

          {/* Bouton PDF */}
          <button
            onClick={handleDownloadPdf}
            disabled={isDocxDownloading || isPdfDownloading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPdfDownloading ? (
               <>Génération PDF...</>
            ) : (
               <><FileType size={20} /> Télécharger PDF</>
            )}
          </button>
        </div>

        <button
          onClick={onBack}
          className="mx-auto text-slate-500 hover:text-slate-800 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} />
          Retourner aux modifications
        </button>
      </div>
    </div>
  );
};