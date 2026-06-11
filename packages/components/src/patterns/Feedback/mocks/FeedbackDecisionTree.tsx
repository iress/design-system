import { useState } from 'react';
import {
  IressAlert,
  IressButton,
  IressContainer,
  IressField,
  IressModal,
  IressPanel,
  IressRadio,
  IressRadioGroup,
  IressStyled,
  IressText,
  IressToasterProvider,
  useToaster,
} from '@/main';

type Recommendation = 'alert' | 'toast' | 'modal' | null;

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
];

type Answers = Record<string, string>;

function getRecommendation(answers: Answers): Recommendation {
  const { interrupt, action, persist } = answers;
  if (!interrupt || !action || !persist) return null;
  if (interrupt === 'yes' || action === 'required') return 'modal';
  if (persist === 'no') return 'toast';
  return 'alert';
}

function ToastExample() {
  const toaster = useToaster();

  return (
    <>
      <IressText mb="sm">
        <h2>Use a toast</h2>
        Toasts are ideal for brief, transient confirmations. They auto-dismiss
        and should not contain critical information.
      </IressText>
      <IressButton
        onClick={() =>
          toaster.success({
            heading: 'Record saved',
            content: 'Your changes have been saved successfully.',
          })
        }
        alignSelf="start"
      >
        Save record
      </IressButton>
    </>
  );
}

function ModalExample() {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressText mb="sm">
        <h2>Use a modal</h2>
        Modals block interaction and require the user to make a decision before
        continuing.
      </IressText>
      <IressButton onClick={() => setShow(true)} alignSelf="start">
        Delete record
      </IressButton>
      <IressModal
        show={show}
        onShowChange={setShow}
        heading="Discard unsaved changes?"
        status="warning"
        actions={[
          {
            children: 'Discard',
            mode: 'tertiary',
            onClick: () => setShow(false),
          },
          { children: 'Keep editing', onClick: () => setShow(false) },
        ]}
      >
        You have unsaved changes that will be lost if you leave this page.
      </IressModal>
    </>
  );
}

function RecommendationResult({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  if (recommendation === 'alert') {
    return (
      <>
        <IressText mb="sm">
          <h2>Use an alert</h2>
          Alerts display inline and persist on the page. Ideal for contextual
          messages the user can act on at their own pace.
        </IressText>
        <IressAlert status="info" heading="This record is read-only" multiLine>
          You do not have permission to edit this record. Contact your
          administrator to request access.
        </IressAlert>
      </>
    );
  }

  if (recommendation === 'toast') {
    return (
      <IressToasterProvider container={document.body}>
        <ToastExample />
      </IressToasterProvider>
    );
  }

  if (recommendation === 'modal') {
    return <ModalExample />;
  }

  return null;
}

export function FeedbackDecisionTree() {
  const [answers, setAnswers] = useState<Answers>({});
  const recommendation = getRecommendation(answers);

  return (
    <IressContainer>
      <IressStyled p="lg" maxWidth="overlay.lg" mx="auto">
        <IressAlert>
          Answer the questions below to determine which feedback pattern is most
          appropriate for your use case.
        </IressAlert>
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
        {recommendation && (
          <IressPanel>
            <RecommendationResult recommendation={recommendation} />
          </IressPanel>
        )}
      </IressStyled>
    </IressContainer>
  );
}
