import React, { useState } from 'react';
import { AppState, Step } from './types';
import { StepIndicator } from './components/StepIndicator';
import { StudentForm } from './components/StudentForm';
import { ProjectForm } from './components/ProjectForm';
import { ReviewStep } from './components/ReviewStep';
import { GraduationCap } from 'lucide-react';

function App() {
  const [state, setState] = useState<AppState>({
    step: Step.STUDENT_INFO,
    studentInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      major: '',
    },
    projectInfo: {
      topic: '',
      generalObjective: '',
      specificObjectives: ['', '', ''],
    },
  });

  const handleStudentUpdate = (info: any) => {
    setState((prev) => ({ ...prev, studentInfo: info }));
  };

  const handleProjectUpdate = (info: any) => {
    setState((prev) => ({ ...prev, projectInfo: info }));
  };

  const nextStep = () => setState((prev) => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setState((prev) => ({ ...prev, step: prev.step - 1 }));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 text-blue-600">
            <div className="p-2 bg-blue-50 rounded-lg">
               <GraduationCap size={32} />
            </div>
            <h1 className="text-2xl font-display tracking-tight text-slate-800">Mémoire<span className="text-blue-600">Genius</span></h1>
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 hidden md:block bg-slate-100 px-3 py-1 rounded-full">
            Outil Académique
          </div>
        </div>
      </header>

      <main className="flex-grow px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <StepIndicator currentStep={state.step} />

          <div className="mt-8">
            {state.step === Step.STUDENT_INFO && (
              <StudentForm
                data={state.studentInfo}
                onUpdate={handleStudentUpdate}
                onNext={nextStep}
              />
            )}

            {state.step === Step.PROJECT_INFO && (
              <ProjectForm
                data={state.projectInfo}
                studentMajor={state.studentInfo.major}
                onUpdate={handleProjectUpdate}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {state.step === Step.REVIEW && (
              <ReviewStep
                state={state}
                onBack={prevStep}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 text-center">
        <p className="text-slate-400 text-sm font-medium">&copy; {new Date().getFullYear()} MémoireGenius.</p>
      </footer>
    </div>
  );
}

export default App;