import Image from 'next/image';

export default function Stepper({ currentStep, completedSteps = [] }) {
  const steps = [
    { id: 1, title: 'Personal Details', icon: '/step1.svg' },
    { id: 2, title: 'Education Details', icon: '/step2.svg' },
    { id: 3, title: 'Work Experience', icon: '/step3.svg' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center relative gap-14 sm:gap-20 px-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="flex items-center relative">
              {/* Step Circle */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md border-2 ${
                    isCompleted
                      ? 'bg-prime border-white'
                      : isCurrent
                        ? 'bg-white border-prime'
                        : 'bg-white border-white'
                    }`}
                >
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={28}
                    height={28}
                    className={`${isCompleted ? 'brightness-0 invert' : ''}`}
                  />
                </div>
                <span
                  className={`text-xs mt-2 text-center transition-colors duration-200 ${isCurrent ? 'text-prime font-semibold' : 'text-gray-500'
                    }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-1/3 left-1/2 sm:w-38 w-32 h-1 transform transition-colors duration-300 ${completedSteps.includes(steps[index].id)
                      ? 'bg-prime'
                      : 'bg-gray-300'
                    }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Decorative line below stepper */}
      <div className="max-w-2xl mx-auto h-0.5 mt-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </div>
  );
}
