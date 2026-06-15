import { IressAlert } from '@iress-oss/ids-components';
import { Metadata } from './components/Metadata';
import { Pre } from './components/Pre';
import { StoryEmbed } from './components/StoryEmbed';

export function useMDXComponents() {
  return { pre: Pre, Metadata, blockquote: IressAlert, StoryEmbed };
}
