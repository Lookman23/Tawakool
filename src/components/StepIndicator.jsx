import React from 'react';
import { Check } from 'lucide-react';

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            {stepIdx < currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-amber-600" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-amber-600">
                  <Check className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
              </>
            ) : stepIdx === currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-amber-600 bg-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-600" aria-hidden="true" />
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white" />
              </>
            )}
            <div className="absolute -bottom-6 w-max text-center -left-1/2 right-1/2 transform translate-x-1/4">
                <span className={`text-xs ${stepIdx <= currentStep ? 'font-semibold text-amber-600' : 'text-gray-500'}`}>{step.name}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepIndicator;