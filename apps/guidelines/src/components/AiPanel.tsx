import { IressButton } from '@iress-oss/ids-components';

const GEMINI_GEM_URL = 'https://gemini.google.com/gem/68dd0863ccea';

export function AiPanel() {
  return (
    <IressButton
      element="a"
      href={GEMINI_GEM_URL}
      target="_blank"
      rel="noopener noreferrer"
      mode="primary"
      style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}
    >
      🌸 Ask Iris
    </IressButton>
  );
}
