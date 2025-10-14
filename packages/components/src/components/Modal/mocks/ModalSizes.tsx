import {
  IressButton,
  IressCard,
  IressCheckbox,
  IressCol,
  IressDivider,
  IressExpander,
  IressField,
  IressInline,
  IressInput,
  IressModal,
  IressProgress,
  IressRichSelect,
  IressRow,
  IressStack,
  IressTable,
} from '@/main';
import { useState } from 'react';
import modalIsDone from './modal-is-done.svg';

const SmallModal = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressCard
        heading="Small modal"
        stretch
        footer={
          <IressButton onClick={() => setShow(true)}>
            View small modal example
          </IressButton>
        }
      >
        <p>
          Small modals communicate the outcome of an irreversible action. They
          should be concise and straightforward, containing a single action and,
          in some cases, a single input field.
        </p>
      </IressCard>

      <IressModal
        width="overlay.sm"
        heading="Terms of service update"
        footer={
          <IressButton mode="primary" onClick={() => setShow(false)}>
            Accept
          </IressButton>
        }
        disableBackdropClick
        show={show}
        onShowChange={setShow}
      >
        <p>
          A change in our <a href="#">terms of service</a> takes effect on July
          1st, 2024. Please read and accept the terms.
        </p>
        <IressCheckbox>I accept the terms of service</IressCheckbox>
      </IressModal>
    </>
  );
};

const MediumModal = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressCard
        stretch
        heading="Medium modal"
        footer={
          <IressButton onClick={() => setShow(true)}>
            View medium modal example
          </IressButton>
        }
      >
        <p>
          Medium modals provide optional supporting information to help users
          understand the context of a word or screen. They may contain a single
          action and, in some cases, a larger input such as a textarea.
        </p>
      </IressCard>

      <IressModal
        width="overlay.md"
        heading="History of Iress"
        footer={<IressButton onClick={() => setShow(false)}>Close</IressButton>}
        fixedFooter
        show={show}
        onShowChange={setShow}
      >
        <h3>Founding and Early Years (1993 - 2000)</h3>
        <p>
          Iress Limited (ASX: IRE) was founded in 1993 in Melbourne, Australia,
          as a provider of financial market data and trading software.
          Initially, the company focused on delivering technology solutions for
          stockbrokers and traders, providing real-time market data, order
          management, and trading execution tools.
        </p>
        <h3>Expansion and IPO (2001 - 2010)</h3>
        <p>
          In 2001, Iress went public, listing on the Australian Securities
          Exchange (ASX). This move provided the company with capital to expand
          its operations and invest in new technologies. During this period,
          Iress expanded its services beyond trading platforms to include
          financial planning software, portfolio management, and wealth
          management solutions. The company also started expanding
          internationally, entering markets such as the UK, Canada, New Zealand,
          and South Africa, through organic growth and acquisitions.
        </p>
        <h3>Global Growth and Acquisitions (2011 - 2020)</h3>
        <p>
          Between 2011 and 2020, Iress continued its global expansion through
          acquisitions and product diversification. Key acquisitions included:
        </p>
        <ul>
          <li>
            Avelo (2013): Strengthened its presence in the UK financial services
            market.
          </li>
          <li>
            Pulse Software (2014): Added financial advice solutions to its
            portfolio.
          </li>
          <li>
            INET BFA (2016): Expanded its reach into South Africa’s financial
            market.
          </li>
          <li>
            OneVue (2020): Enhanced its superannuation and investment
            administration capabilities.
          </li>
        </ul>
        <p>
          During this period, Iress also expanded into mortgage lending
          technology and digital financial services, adapting to the increasing
          demand for automation and efficiency in financial markets.
        </p>
        <h3>Recent Developments (2021 - Present)</h3>
        <p>
          In 2021, Iress announced a strategic review of its business, focusing
          on streamlining operations and improving profitability. The company
          also experienced leadership changes, including new CEO appointments to
          drive digital transformation.{' '}
        </p>
        <p>
          Iress has continued to innovate with cloud-based solutions, artificial
          intelligence (AI), and data analytics, catering to financial
          institutions, brokers, and wealth management firms globally.
        </p>
        <IressExpander activator="Was this helpful?">
          <IressStack gap="sm">
            <IressInput rows={2} placeholder="Enter your feedback" />
            <IressButton>Provide feedback</IressButton>
          </IressStack>
        </IressExpander>
      </IressModal>
    </>
  );
};

interface LargeModalActionsProps {
  isStart: boolean;
  isFinal: boolean;
  onBack: () => void;
  onNext: () => void;
  onCancel: () => void;
  onFinish: () => void;
}

const LargeModalActions = ({
  isStart,
  isFinal,
  onBack,
  onNext,
  onCancel,
  onFinish,
}: LargeModalActionsProps) => (
  <IressInline gap="sm" horizontalAlign={isFinal ? 'center' : 'left'}>
    {isFinal && (
      <IressButton mode="primary" onClick={onFinish}>
        Finish
      </IressButton>
    )}
    {!isFinal && (
      <IressButton mode="primary" onClick={onNext}>
        Next
      </IressButton>
    )}
    {!isStart && !isFinal && (
      <IressButton onClick={onBack}>Previous</IressButton>
    )}
    {!isFinal && (
      <IressInline ml="auto">
        <IressButton onClick={onCancel} mode="tertiary">
          Cancel
        </IressButton>
      </IressInline>
    )}
  </IressInline>
);

const LargeModal = () => {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  return (
    <>
      <IressCard
        heading="Large modal"
        stretch
        footer={
          <IressButton onClick={() => setShow(true)}>
            View large modal example
          </IressButton>
        }
      >
        <p>
          Large modals facilitate sub-flows within a primary flow, allowing
          users to focus on tasks that will impact the underlying screen once
          the modal is closed (e.g., adding an item to a table or bulk uploading
          items). They should be used sparingly and only when there is a direct
          relationship to the underlying screen, where the action wouldn't
          warrant a separate dedicated screen.
        </p>
      </IressCard>

      <IressModal
        width="overlay.lg"
        heading="Upload from CSV"
        footer={
          <LargeModalActions
            isStart={step === 0}
            isFinal={step === 2}
            onBack={() => setStep(step - 1)}
            onNext={() => setStep(step + 1)}
            onFinish={() => setShow(false)}
            onCancel={() => setShow(false)}
          />
        }
        disableBackdropClick
        show={show}
        onShowChange={setShow}
        fixedFooter
      >
        <IressStack gap="lg" mb="md">
          <IressProgress max={3} value={step + 1} />
          {step === 0 && (
            <IressStack gap="md">
              <IressField label="Select a file to upload">
                <IressInput type="file" accept=".csv" />
              </IressField>
              <IressDivider />
              <IressField label="Type of data">
                <IressRichSelect
                  options={[
                    { label: 'Clients' },
                    { label: 'Products' },
                    { label: 'Transactions' },
                  ]}
                />
              </IressField>
              <IressCheckbox>Overwrite existing data</IressCheckbox>
            </IressStack>
          )}
          {step === 1 && (
            <IressTable
              caption="Preview of data to be uploaded"
              columns={[
                { key: 'import', label: 'Upload', width: '1%' },
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
              ]}
              rows={[
                {
                  import: <IressCheckbox defaultChecked />,
                  name: 'Luke Skywalker',
                  email: 'luke.skywalker@iress.com',
                },
                {
                  import: <IressCheckbox defaultChecked />,
                  name: 'Leia Skywalker',
                  email: 'leia.skywalker@iress.com',
                },
                {
                  import: <IressCheckbox defaultChecked />,
                  name: 'Han Solo',
                  email: 'han.solo@iress.com',
                },
              ]}
            />
          )}
          {step === 2 && (
            <IressStack gap="md" horizontalAlign="center">
              <img
                src={modalIsDone}
                alt=""
                style={{ maxWidth: '200px', height: 'auto' }}
              />
              <h3>3 items have been uploaded</h3>
              <IressCheckbox>Send a copy to yourself</IressCheckbox>
            </IressStack>
          )}
        </IressStack>
      </IressModal>
    </>
  );
};

export const ModalSizes = () => (
  <IressRow gutter="spacing.700" verticalAlign="stretch">
    <IressCol>
      <SmallModal />
    </IressCol>
    <IressCol>
      <MediumModal />
    </IressCol>
    <IressCol>
      <LargeModal />
    </IressCol>
  </IressRow>
);
