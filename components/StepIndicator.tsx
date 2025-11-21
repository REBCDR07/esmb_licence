import React from 'react';
import { Step } from '../types';
import { User, BookOpen, FileText, Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { id: Step.STUDENT_INFO, label: "Identité", icon: User },
  { id: Step.PROJECT_INFO, label: "Projet", icon: BookOpen },
  { id: Step.REVIEW, label: "Validation", icon: FileText },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 
                    ${isCompleted || isCurrent 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-110' 
                      : 'bg-white border-gray-300 text-gray-400'}`}
                >
                  {isCompleted ? <Check size={20} /> : <Icon size={18} />}
                </div>
                <span
                  className={`absolute top-12 text-xs font-medium whitespace-nowrap transition-colors duration-300
                    ${isCurrent || isCompleted ? 'text-blue-700' : 'text-gray-400'}`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`w-16 md:w-32 h-1 mx-2 rounded transition-colors duration-300 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
