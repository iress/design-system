import { IressButton, IressTooltip } from '@iress-oss/ids-components';

const GEMINI_GEM_URL = 'https://gemini.google.com/gem/68dd0863ccea';

export function AiPanel() {
  return (
    <IressTooltip
      align="bottom-end"
      tooltipText="Ask Iris, our AI assistant, for help with any questions about IDS. Powered by Google Gemini."
    >
      <IressButton
        element="a"
        href={GEMINI_GEM_URL}
        target="_blank"
        rel="noopener noreferrer"
        borderRadius="radius.4"
      >
        🌸 Ask Iris
      </IressButton>
    </IressTooltip>
  );
}
