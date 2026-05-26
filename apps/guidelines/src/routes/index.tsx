import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <h1>Iress Design System Guidelines</h1>
      <p>Component usage guidance, patterns, and best practices.</p>
    </div>
  );
}
