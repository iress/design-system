import { createRootRoute, Outlet, Link } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">IDS Guidelines</Link>
          <Link to="/get-started/develop">Get Started</Link>
          <Link to="/foundations/principles">Foundations</Link>
          <Link to="/styling-props/styling-props">Styling Props</Link>
          <Link to="/components/button">Components</Link>
          <Link to="/patterns/form">Patterns</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
