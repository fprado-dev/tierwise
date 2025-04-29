'use client';

import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

const OnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && !user.user_metadata.onboarding_completed) {
        setIsOpen(true);
      }
    };

    checkOnboardingStatus();
  }, []);

  const steps = [
    {
      title: 'Welcome! 👋',
      content: 'Welcome to AICost! We\'re excited to help you manage and track your AI model costs effectively.',
    },
    {
      title: 'Create Your First Project',
      content: 'Let\'s get started by creating your first project. This will help you organize and monitor your AI models.',
    },
    {
      title: 'You\'re All Set! 🎉',
      content: 'Congratulations! You\'re ready to start managing your AI costs. Enjoy using AICost!',
    },
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.auth.updateUser({
          data: { onboarding_completed: true }
        });
      }
      setIsOpen(false);
    }
  };

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle>

            <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
          </DialogTitle>
          <DialogDescription>
            <p className="text-gray-600 mb-6">{steps[currentStep].content}</p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </Button>
        </div>
      </DialogContent>

    </Dialog>
  );
};

export default OnboardingModal;