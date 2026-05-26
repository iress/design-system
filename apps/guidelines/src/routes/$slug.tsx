import { createFileRoute, Link } from '@tanstack/react-router';
import { MdxLayout } from '@/components/MdxLayout';

interface MdxModule {
  default: React.ComponentType;
  meta?: { title: string; description?: string };
}

const modules = import.meta.glob<MdxModule>('../../content/*.mdx', {
  eager: true,
});

function getGuide(slug: string): MdxModule | undefined {
  const key = `../../content/${slug}.mdx`;
  return modules[key];
}

export const Route = createFileRoute('/$slug')({
  component: GuideRoute,
});

function GuideRoute() {
  const { slug } = Route.useParams();
  const guide = getGuide(slug);

  if (!guide) {
    const available = Object.keys(modules).map((k) => k.replace('../../content/', '').replace('.mdx', ''));
    return (
      <div>
        <h1>Page not found</h1>
        <p>No guide found for &ldquo;{slug}&rdquo;.</p>
        <h2>Available guides:</h2>
        <ul>
          {available.map((s) => (
            <li key={s}>
              <Link to="/$slug" params={{ slug: s }}>{s}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const Content = guide.default;
  const { title = slug, description } = guide.meta ?? {};

  return (
    <MdxLayout title={title} description={description}>
      <Content />
    </MdxLayout>
  );
}
