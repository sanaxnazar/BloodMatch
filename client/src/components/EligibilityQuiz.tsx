
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; disqualifying?: boolean }[];
}

const EligibilityQuiz = ({ onComplete }: { onComplete: (eligible: boolean, score: number) => void }) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const questions: Question[] = [
    {
      id: 'age',
      question: 'What is your age?',
      options: [
        { value: 'under18', label: 'Under 18', disqualifying: true },
        { value: '18-65', label: '18-65 years' },
        { value: 'over65', label: 'Over 65', disqualifying: true }
      ]
    },
    {
      id: 'weight',
      question: 'What is your weight?',
      options: [
        { value: 'under50', label: 'Under 50 kg', disqualifying: true },
        { value: '50-110', label: '50-110 kg' },
        { value: 'over110', label: 'Over 110 kg' }
      ]
    },
    {
      id: 'health',
      question: 'Are you currently feeling well?',
      options: [
        { value: 'yes', label: 'Yes, I feel healthy' },
        { value: 'no', label: 'No, I have symptoms', disqualifying: true }
      ]
    },
    {
      id: 'medications',
      question: 'Are you taking any medications?',
      options: [
        { value: 'none', label: 'No medications' },
        { value: 'safe', label: 'Safe medications only' },
        { value: 'restricted', label: 'Blood thinners/restricted meds', disqualifying: true }
      ]
    },
    {
      id: 'lastDonation',
      question: 'When was your last blood donation?',
      options: [
        { value: 'never', label: 'Never donated before' },
        { value: 'over8weeks', label: 'More than 8 weeks ago' },
        { value: 'recent', label: 'Less than 8 weeks ago', disqualifying: true }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    const disqualifyingAnswers = Object.entries(answers).filter(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(opt => opt.value === answer);
      return option?.disqualifying;
    });

    const eligible = disqualifyingAnswers.length === 0;
    const score = Math.max(0, 100 - (disqualifyingAnswers.length * 25));

    setIsComplete(true);
    onComplete(eligible, score);

    toast({
      title: eligible ? "Eligibility Confirmed" : "Eligibility Requirements Not Met",
      description: eligible 
        ? "You're eligible to donate blood!" 
        : "Please consult with a healthcare provider about donation eligibility.",
    });
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswerValue = answers[questions[currentQuestion]?.id];

  if (isComplete) {
    const eligible = Object.entries(answers).every(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(opt => opt.value === answer);
      return !option?.disqualifying;
    });

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {eligible ? (
              <CheckCircle className="w-16 h-16 text-green-600" />
            ) : (
              <XCircle className="w-16 h-16 text-red-600" />
            )}
          </div>
          <CardTitle className={eligible ? "text-green-900" : "text-red-900"}>
            {eligible ? "You're Eligible!" : "Not Eligible at This Time"}
          </CardTitle>
          <CardDescription>
            {eligible 
              ? "You meet all the requirements for blood donation."
              : "Some requirements are not met. Please consult a healthcare provider."
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
          >
            Take Quiz Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <span>Medical Eligibility Quiz</span>
        </CardTitle>
        <CardDescription>
          Question {currentQuestion + 1} of {questions.length}
        </CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {questions[currentQuestion].question}
          </h3>
          <RadioGroup value={currentAnswerValue} onValueChange={handleAnswer}>
            {questions[currentQuestion].options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!currentAnswerValue}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EligibilityQuiz;
