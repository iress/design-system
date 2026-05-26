import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { Search } from '../components/Search';
import { AiPanel } from '../components/AiPanel';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">IDS Guidelines</Link>
          <Link to={'/get-started/develop' as string}>Get Started</Link>
          <Link to={'/foundations/principles' as string}>Foundations</Link>
          <Link to={'/styling-props/styling-props' as string}>Styling Props</Link>
          <Link to={'/components/button' as string}>Components</Link>
          <Link to={'/patterns/form' as string}>Patterns</Link>
          <Search />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <AiPanel />
    </div>
  );
}
