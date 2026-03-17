import { useState, type ReactNode } from 'react';
import { IressRadioGroup, IressRadio, IressField, IressStack } from '@/main';
import {
  RecommendationContext,
  type Recommendation,
} from './RecommendationContext';

const questions = [
  {
    id: 'interrupt',
    label: 'Does the message need to interrupt the user?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    id: 'action',
    label: 'Does the user need to take action?',
    options: [
      { label: 'Yes, they must decide before continuing', value: 'required' },
      { label: 'Optional or no action needed', value: 'optional' },
    ],
  },
  {
    id: 'persist',
    label: 'Should the message persist on screen?',
    options: [
      { label: 'Yes, until the user or condition dismisses it', value: 'yes' },
      { label: 'No, it can disappear automatically', value: 'no' },
    ],
  },
] as const;

type Answers = Record<string, string>;

const getRecommendation = (answers: Answers): Recommendation => {
  const { interrupt, action, persist } = answers;
  if (!interrupt || !action || !persist) return null;
  if (interrupt === 'yes' || action === 'required') return 'modal';
  if (persist === 'no') return 'toast';
  return 'alert';
};

export const DecisionTreeDecorator = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [answers, setAnswers] = useState<Answers>({});
  const recommendation = getRecommendation(answers);

  return (
    <RecommendationContext.Provider value={recommendation}>
      <IressStack gap="lg">
        {questions.map((q) => (
          <IressField key={q.id} label={q.label}>
            <IressRadioGroup
              name={q.id}
              value={answers[q.id] ?? ''}
              onChange={(_, value) => {
                if (value === undefined) return;
                setAnswers((prev) => ({ ...prev, [q.id]: value }));
              }}
              layout="inline"
            >
              {q.options.map((opt) => (
                <IressRadio key={opt.value} value={opt.value}>
                  {opt.label}
                </IressRadio>
              ))}
            </IressRadioGroup>
          </IressField>
        ))}
        {recommendation && children}
      </IressStack>
    </RecommendationContext.Provider>
  );
};
