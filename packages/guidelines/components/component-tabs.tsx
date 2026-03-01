'use client';

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { IressTabSet, IressTab, IressLink } from '@iress-oss/ids-components';

interface ComponentTabsContextValue {
  activeTab: string;
  figma?: string;
}

const ComponentTabsContext = createContext<ComponentTabsContextValue>({
  activeTab: 'development',
});

export function DevelopmentTab({ children }: { children: ReactNode }) {
  const { activeTab } = useContext(ComponentTabsContext);
  if (activeTab !== 'development') return null;
  return <>{children}</>;
}

export function DesignTab() {
  const { activeTab, figma } = useContext(ComponentTabsContext);
  if (activeTab !== 'design') return null;

  if (!figma) {
    return (
      <p style={{ color: 'var(--ids-semantic-foreground-subtle)' }}>
        Design specifications are not yet available for this component.
      </p>
    );
  }

  return (
    <p>
      View the design specifications and guidelines in Figma:{' '}
      <IressLink href={figma} target="_blank">
        Open in Figma →
      </IressLink>
    </p>
  );
}

export function APITab({ children }: { children: ReactNode }) {
  const { activeTab } = useContext(ComponentTabsContext);
  if (activeTab !== 'api') return null;
  return <>{children}</>;
}

interface ComponentTabsProps {
  children: ReactNode;
  figma?: string;
}

export function ComponentTabs({ children, figma }: ComponentTabsProps) {
  const [activeTab, setActiveTab] = useState<string>('development');

  return (
    <ComponentTabsContext.Provider value={{ activeTab, figma }}>
      <IressTabSet
        selected={activeTab}
        onChange={(event) => setActiveTab(String(event.value))}
      >
        <IressTab value="development" label="⌨ Development" />
        <IressTab value="design" label="🎨 Design" />
        <IressTab value="api" label="📖 API" />
      </IressTabSet>
      <div style={{ marginTop: 'var(--ids-spacing-lg, 1.5rem)' }}>
        {children}
      </div>
    </ComponentTabsContext.Provider>
  );
}
