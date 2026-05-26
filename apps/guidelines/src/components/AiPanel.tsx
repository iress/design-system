const GEMINI_GEM_URL = 'https://gemini.google.com/gem/68dd0863ccea';

export function AiPanel() {
  return (
    <a
      href={GEMINI_GEM_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
        padding: '8px 16px',
        borderRadius: 20,
        border: 'none',
        background: '#0066cc',
        color: '#fff',
        cursor: 'pointer',
        fontSize: 14,
        textDecoration: 'none',
      }}
    >
      🌸 Ask Iris
    </a>
  );
}
