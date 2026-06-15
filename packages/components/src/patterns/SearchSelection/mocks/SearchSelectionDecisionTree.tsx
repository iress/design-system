import { useState } from 'react';
import {
  IressAlert,
  IressCol,
  IressContainer,
  IressField,
  IressLink,
  IressPanel,
  IressRadio,
  IressRadioGroup,
  IressRow,
  IressStyled,
  IressText,
} from '@/main';

type Recommendation =
  | 'autocomplete'
  | 'select'
  | 'dropdown-menu'
  | 'input-popover'
  | 'popover'
  | 'invalid'
  | null;

const questions = [
  {
    id: 'trigger',
    label: 'How is the interaction triggered?',
    options: [
      { label: 'User types in an input', value: 'input' },
      { label: 'User clicks a button', value: 'button' },
      { label: 'User clicks an input (no typing needed)', value: 'click' },
    ],
  },
  {
    id: 'purpose',
    label: 'What happens when the user makes a selection?',
    options: [
      { label: 'A form value is set', value: 'form-value' },
      { label: 'The user navigates to a page', value: 'navigate' },
      { label: 'An action is triggered', value: 'action' },
      { label: 'Custom content is shown', value: 'custom' },
    ],
  },
  {
    id: 'freetext',
    label: 'Can the user submit a value not in the list?',
    options: [
      { label: 'Yes, any text is valid', value: 'yes' },
      { label: 'No, must pick from the list', value: 'no' },
    ],
  },
];

type Answers = Record<string, string>;

function getVisibleQuestions(answers: Answers) {
  const visible = [questions[0]];
  if (answers.trigger) visible.push(questions[1]);
  // Only ask about freetext when typing into an input to set a form value
  if (answers.trigger === 'input' && answers.purpose === 'form-value')
    visible.push(questions[2]);
  return visible;
}

function getRecommendation(answers: Answers): Recommendation {
  const { trigger, purpose, freetext } = answers;
  if (!trigger || !purpose) return null;

  // Input-triggered
  if (trigger === 'input') {
    if (purpose === 'navigate') return 'input-popover';
    if (purpose === 'form-value') {
      if (!freetext) return null; // need the freetext answer
      return freetext === 'yes' ? 'autocomplete' : 'select';
    }
    // input + action or custom is not a valid pattern
    return 'invalid';
  }

  // Button-triggered
  if (trigger === 'button') {
    if (purpose === 'action' || purpose === 'navigate') return 'dropdown-menu';
    if (purpose === 'form-value') return 'select';
    if (purpose === 'custom') return 'popover';
  }

  // Click-triggered (input that opens on click, no typing)
  if (trigger === 'click') {
    if (purpose === 'form-value') return 'select';
    if (purpose === 'action' || purpose === 'navigate') return 'dropdown-menu';
    if (purpose === 'custom') return 'popover';
  }

  return 'invalid';
}

const recommendations: Record<
  Exclude<Recommendation, null>,
  { heading: string; description: string; link: string }
> = {
  autocomplete: {
    heading: 'Use Autocomplete',
    description:
      'Autocomplete lets users type freetext and receive suggestions to set a form value. The input accepts any value, not just suggestions.',
    link: '/components/autocomplete',
  },
  select: {
    heading: 'Use Select',
    description:
      'Select requires users to pick from a predefined set of options. Use async options for large lists with search.',
    link: '/components/select',
  },
  'dropdown-menu': {
    heading: 'Use DropdownMenu',
    description:
      'DropdownMenu displays a list of actions or navigation options triggered by a button click.',
    link: '/patterns/dropdown-menu',
  },
  'input-popover': {
    heading: 'Use InputPopover + Menu',
    description:
      'InputPopover with Menu gives full control over search results that navigate to pages. Supports real links for right-click → open in new tab.',
    link: '/components/popover',
  },
  popover: {
    heading: 'Use Popover',
    description:
      'Popover displays custom rich content triggered by a button. Use when the content does not fit into a menu or select pattern.',
    link: '/components/popover',
  },
};

export function SearchSelectionDecisionTree() {
  const [answers, setAnswers] = useState<Answers>({});
  const recommendation = getRecommendation(answers);

  return (
    <IressContainer>
      <IressStyled p="lg" maxWidth="overlay.lg" mx="auto">
        <IressAlert>
          Answer the questions below to determine which search or selection
          component is most appropriate for your use case.
        </IressAlert>
        <IressRow>
          <IressCol>
        {getVisibleQuestions(answers).map((q) => (
          <IressField key={q.id} label={q.label}>
            <IressRadioGroup
              name={q.id}
              value={answers[q.id] ?? ''}
              onChange={(_, value) => {
                if (value === undefined) return;
                setAnswers((prev) => ({ ...prev, [q.id]: value }));
              }}
              id={q.id}
            >
              {q.options.map((opt) => (
                <IressRadio key={opt.value} value={opt.value}>
                  {opt.label}
                </IressRadio>
              ))}
            </IressRadioGroup>
          </IressField>
        ))}
        </IressCol>
        <IressCol>
        {recommendation && recommendation !== 'invalid' && (
          <IressPanel stretch>
            <IressText mb="sm">
              <h2>{recommendations[recommendation].heading}</h2>
              {recommendations[recommendation].description}
            </IressText>
            <IressLink href={recommendations[recommendation].link}>
              View documentation →
            </IressLink>
          </IressPanel>
        )}
        {recommendation === 'invalid' && (
          <IressAlert status="warning">
            This combination doesn't map to a standard pattern. Consider
            rethinking the interaction — for example, typing in an input
            typically sets a form value or navigates, not triggers actions.
          </IressAlert>
        )}
        </IressCol>
        </IressRow>
      </IressStyled>
    </IressContainer>
  );
}
