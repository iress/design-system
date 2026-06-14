import { Metadata } from './components/Metadata';
import { Pre } from './components/Pre';
import { StoryEmbed } from './components/StoryEmbed';

export function useMDXComponents() {
  return { pre: Pre, Metadata, StoryEmbed };
}
