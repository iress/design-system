import {
  IressBreadcrumbs,
  IressPanel,
  IressStack,
  IressText,
} from '@/main';

export function BreadcrumbsAllConfigurations() {
  return (
    <IressPanel>
      <IressStack gap="xl">
        <IressStack>
          <IressText element="h3">2 Breadcrumbs</IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[{ label: 'Home', href: '/' }, { label: 'Current' }]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">3 Breadcrumbs</IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Details' },
            ]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">4 Breadcrumbs</IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Category', href: '/category' },
              { label: 'Subcategory', href: '/subcategory' },
              { label: 'Details' },
            ]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">
            5+ Breadcrumbs (with default overflow)
          </IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Level 1', href: '/l1' },
              { label: 'Level 2', href: '/l2' },
              { label: 'Level 3', href: '/l3' },
              { label: 'Level 4', href: '/l4' },
              { label: 'Current' },
            ]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">
            5+ Breadcrumbs (with overflow disabled)
          </IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Level 1', href: '/l1' },
              { label: 'Level 2', href: '/l2' },
              { label: 'Level 3', href: '/l3' },
              { label: 'Level 4', href: '/l4' },
              { label: 'Current' },
            ]}
            limit={0}
          />
        </IressStack>
      </IressStack>
    </IressPanel>
  );
}
