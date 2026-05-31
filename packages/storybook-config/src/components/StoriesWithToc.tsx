import { Description } from '@storybook/addon-docs/blocks';
import { useEffect } from 'react';
import { ComponentCanvas } from './ComponentCanvas';
import {
  IressCol,
  IressMenu,
  IressMenuHeading,
  IressMenuItem,
  IressPanel,
  IressRow,
} from '@iress-oss/ids-components';
import type { BroadcastHashEvent } from '../types';
import { cssVars } from '@iress-oss/ids-tokens';

export interface StoryItem {
  id: string;
  name: string;
  moduleExport: unknown;
}

export const setParentHash = (hash: string) => {
  window.parent.location.hash = hash;
};

export const scrollToStory = (storyId: string) => {
  document.getElementById(storyId)?.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Hook that listens for hash changes via postMessage and scrolls to the target story.
 * @param onNavigate Optional callback receiving the full hash string (e.g. "examples_story-id")
 */
export function useHashNavigation(onNavigate?: (hash: string) => void) {
  useEffect(() => {
    const handleHashMessage = (event: MessageEvent<BroadcastHashEvent>) => {
      if (event.data?.type !== 'UPDATE_HASH' || !event.data.hash) return;
      const hash = event.data.hash;
      if (onNavigate) onNavigate(hash);
      const storyId = hash.includes('_')
        ? hash.split('_').slice(1).join('_')
        : hash;
      scrollToStory(storyId);
    };

    const initialHash = window.parent.location.hash.substring(1);
    if (initialHash) {
      if (onNavigate) onNavigate(initialHash);
      const storyId = initialHash.includes('_')
        ? initialHash.split('_').slice(1).join('_')
        : initialHash;
      setTimeout(() => scrollToStory(storyId), 200);
    }

    window.addEventListener('message', handleHashMessage);
    return () => window.removeEventListener('message', handleHashMessage);
  }, [onNavigate]);
}

/**
 * Sticky table of contents sidebar for a list of stories.
 */
export const StoryToc = ({
  stories,
  hashPrefix,
}: {
  stories: StoryItem[];
  hashPrefix?: string;
}) => (
  <nav style={{ position: 'sticky', top: cssVars.spacing[3] }}>
    <IressPanel px="none" py="sm">
      <IressMenuHeading element="h2">Jump to</IressMenuHeading>
      <IressMenu variant="side" width="12/12">
        {stories.map((story) => (
          <IressMenuItem
            key={story.id}
            href={`#${story.id}`}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              scrollToStory(story.id);
              setParentHash(
                hashPrefix ? `${hashPrefix}_${story.id}` : story.id,
              );
            }}
          >
            {story.name}
          </IressMenuItem>
        ))}
      </IressMenu>
    </IressPanel>
  </nav>
);

/**
 * Two-column layout: stories on the left, sticky TOC on the right.
 */
export const StoriesWithToc = ({
  stories,
  hashPrefix,
}: {
  stories: StoryItem[];
  hashPrefix?: string;
}) => (
  <IressRow gutter="lg">
    <IressCol>
      {stories.map((story) => (
        <div key={story.id}>
          <h3 id={story.id}>{story.name}</h3>
          <Description of={story.moduleExport as never} />
          <ComponentCanvas of={story.moduleExport as never} refresh />
        </div>
      ))}
    </IressCol>
    {stories.length > 1 && (
      <IressCol span={{ xs: 12, md: 4, lg: 3, xl: 2 }} pt="md">
        <StoryToc stories={stories} hashPrefix={hashPrefix} />
      </IressCol>
    )}
  </IressRow>
);
