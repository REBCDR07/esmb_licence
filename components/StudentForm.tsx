import React, { useState } from 'react';
import { StudentInfo } from '../types';

interface StudentFormProps {
  data: StudentInfo;
  onUpdate: (data: StudentInfo) => void;
  onNext: () => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({ data, onUpdate, onNext }) => {
  const [errors, setErrors] = useState<Partial<Record<keyof StudentInfo, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ ...data, [name]: value });
    // Clear error when user types
    if (errors[name as keyof StudentInfo]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof StudentInfo, string>> = {};
    if (!data.firstName) newErrors.firstName = "Le prénom est requis.";
    if (!data.lastName) newErrors.lastName = "Le nom est requis.";
    if (!data.major) newErrors.major = "La filière est requise.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) newErrors.email = "Adresse email invalide.";
    
    const phoneRegex = /^[0-9+\s-]{8,}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) newErrors.phone = "Numéro de téléphone invalide (min 8 chiffres).";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  // Shared styles for inputs to ensure consistency and clarity
  const inputClasses = (hasError: boolean) => `
    w-full px-4 py-3 rounded-lg border-2 text-slate-700 font-medium 
    placeholder-slate-400 transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-4 focus:ring-blue-500/10
    ${hasError 
      ? 'border-red-300 bg-red-50 focus:border-red-500' 
      : 'border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white'}
  `;

  const labelClasses = "block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-slate-100 animate-fade-in-up">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-3xl text-slate-800 mb-2 font-display">Qui êtes-vous ?</h2>
        <p className="text-slate-500">Commencez par renseigner vos informations académiques.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PRENOM */}
        <div>
          <label className={labelClasses}>Prénom</label>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            className={inputClasses(!!errors.firstName)}
            placeholder="Ex: Jean"
          />
          {errors.firstName && <p className="mt-2 text-xs font-bold text-red-500 flex items-center">⚠️ {errors.firstName}</p>}
        </div>

        {/* NOM */}
        <div>
          <label className={labelClasses}>Nom</label>
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            className={inputClasses(!!errors.lastName)}
            placeholder="Ex: Dupont"
          />
          {errors.lastName && <p className="mt-2 text-xs font-bold text-red-500 flex items-center">⚠️ {errors.lastName}</p>}
        </div>

        {/* FILIERE - Changed to Text Input */}
        <div className="md:col-span-2">
          <label className={labelClasses}>Filière / Spécialité</label>
          <input
            type="text"
            name="major"
            value={data.major}
            onChange={handleChange}
            className={inputClasses(!!errors.major)}
            placeholder="Ex: Licence en Droit Public, Master en Marketing Digital..."
          />
          <p className="text-xs text-slate-400 mt-2 italic">Saisissez l'intitulé exact de votre formation.</p>
          {errors.major && <p className="mt-2 text-xs font-bold text-red-500 flex items-center">⚠️ {errors.major}</p>}
        </div>

        {/* EMAIL */}
        <div>
          <label className={labelClasses}>Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className={inputClasses(!!errors.email)}
            placeholder="etudiant@exemple.com"
          />
          {errors.email && <p className="mt-2 text-xs font-bold text-red-500 flex items-center">⚠️ {errors.email}</p>}
        </div>

        {/* TELEPHONE */}
        <div>
          <label className={labelClasses}>Téléphone</label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className={inputClasses(!!errors.phone)}
            placeholder="06 00 00 00 00"
          />
          {errors.phone && <p className="mt-2 text-xs font-bold text-red-500 flex items-center">⚠️ {errors.phone}</p>}
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 flex items-center text-lg"
        >
          Suivant
        </button>
      </div>
    </form>
  );
};