import Link from 'next/link';

export default function HomePage() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '1.5rem',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'var(--ids-font-family-body)',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>
        Iress Design System
      </h1>
      <p
        style={{
          fontSize: '1.125rem',
          color: 'var(--ids-semantic-foreground-subtle)',
          maxWidth: '600px',
        }}
      >
        Component documentation, patterns, and guidelines for building
        consistent Iress user interfaces.
      </p>
      <Link
        href="/docs"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--ids-semantic-foreground-action)',
          color: '#fff',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '1rem',
        }}
      >
        View Documentation →
      </Link>
    </main>
  );
}
