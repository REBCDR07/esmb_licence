import React, { useState } from 'react';
import { ProjectInfo } from '../types';

interface ProjectFormProps {
  data: ProjectInfo;
  studentMajor: string;
  onUpdate: (data: ProjectInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ data, onUpdate, onNext, onBack }) => {
  const [errors, setErrors] = useState<Partial<Record<keyof ProjectInfo | 'specific', string>>>({});

  const handleChange = (field: keyof ProjectInfo, value: string) => {
    onUpdate({ ...data, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...data.specificObjectives] as [string, string, string];
    newObjectives[index] = value;
    onUpdate({ ...data, specificObjectives: newObjectives });
  };

  const validate = () => {
    const newErrors: any = {};
    if (!data.topic) newErrors.topic = "Le sujet est requis.";
    if (!data.generalObjective) newErrors.generalObjective = "L'objectif général est requis.";
    if (data.specificObjectives.some(obj => !obj.trim())) newErrors.specific = "Les 3 objectifs spécifiques sont requis.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  const inputClasses = (hasError: boolean) => `
    w-full px-4 py-3 rounded-lg border-2 text-slate-700 font-medium 
    placeholder-slate-400 transition-all duration-200 ease-in-out resize-none
    focus:outline-none focus:ring-4 focus:ring-blue-500/10
    ${hasError 
      ? 'border-red-300 bg-red-50 focus:border-red-500' 
      : 'border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white'}
  `;

  const labelClasses = "block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-slate-100 animate-fade-in-up">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-3xl text-slate-800 mb-1 font-display">Votre Projet</h2>
        <p className="text-slate-500">Détaillez le contenu de votre mémoire.</p>
      </div>

      <div className="space-y-8">
        {/* SUJET */}
        <div>
          <label className={labelClasses}>Sujet du Mémoire</label>
          <textarea
            value={data.topic}
            onChange={(e) => handleChange('topic', e.target.value)}
            rows={2}
            className={inputClasses(!!errors.topic)}
            placeholder="Ex: L'impact de l'intelligence artificielle sur la productivité des entreprises..."
          />
          {errors.topic && <p className="mt-2 text-xs font-bold text-red-500">⚠️ {errors.topic}</p>}
        </div>

        {/* OBJECTIF GENERAL */}
        <div>
          <label className={labelClasses}>Objectif Général</label>
          <textarea
            value={data.generalObjective}
            onChange={(e) => handleChange('generalObjective', e.target.value)}
            rows={3}
            className={inputClasses(!!errors.generalObjective)}
            placeholder="Décrivez le but principal de votre recherche..."
          />
          {errors.generalObjective && <p className="mt-2 text-xs font-bold text-red-500">⚠️ {errors.generalObjective}</p>}
        </div>

        {/* OBJECTIFS SPECIFIQUES */}
        <div>
          <label className={labelClasses}>Objectifs Spécifiques (3 requis)</label>
          <div className="space-y-4">
            {data.specificObjectives.map((obj, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="mt-3 text-sm font-black text-slate-300 w-6 text-right">0{index + 1}</span>
                <input
                  type="text"
                  value={obj}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                  className={`${inputClasses(!!errors.specific)} py-2.5`}
                  placeholder={`Objectif spécifique ${index + 1}`}
                />
              </div>
            ))}
          </div>
          {errors.specific && <p className="mt-2 text-xs font-bold text-red-500">⚠️ {errors.specific}</p>}
        </div>
      </div>

      <div className="mt-10 flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          className="text-slate-500 hover:text-slate-800 font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Retour
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 text-lg"
        >
          Voir le Récapitulatif
        </button>
      </div>
    </form>
  );
};