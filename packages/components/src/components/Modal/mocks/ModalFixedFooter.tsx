import { IressButton, IressModal, IressText } from '@/main';
import { useModal } from '../hooks/useModal';

const MODAL_ID = 'fixed-footer-modal';

export function ModalFixedFooter() {
  const { showModal } = useModal();

  return (
    <>
      <IressButton onClick={() => showModal(MODAL_ID)}>
        Show scrollable modal
      </IressButton>
      <IressModal
        id={MODAL_ID}
        show={false}
        heading="Terms and Conditions"
        footer={<IressButton mode="primary">I agree</IressButton>}
        fixedFooter
      >
        <IressText>
          <p>
            Please read the following terms carefully. The footer below remains
            fixed while you scroll through the content.
          </p>
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing and using this service, you accept and agree to be
            bound by the terms and provision of this agreement.
          </p>
          <h3>2. Use of Service</h3>
          <p>
            You agree to use the service only for purposes that are permitted by
            these Terms and any applicable law, regulation or generally accepted
            practices or guidelines.
          </p>
          <h3>3. Privacy Policy</h3>
          <p>
            Your privacy is important to us. Our Privacy Policy explains how we
            collect, use, and protect your personal information when you use our
            services.
          </p>
          <h3>4. Account Security</h3>
          <p>
            You are responsible for safeguarding the password that you use to
            access the service and for any activities or actions under your
            account.
          </p>
          <h3>5. Intellectual Property</h3>
          <p>
            The service and its original content, features and functionality are
            owned by the company and are protected by international copyright,
            trademark and other intellectual property laws.
          </p>
          <h3>6. Termination</h3>
          <p>
            We may terminate or suspend your account immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms.
          </p>
        </IressText>
      </IressModal>
    </>
  );
}
