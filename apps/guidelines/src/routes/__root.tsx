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
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
