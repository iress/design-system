import { IressAlert, IressExpander, IressExpanderProps } from '@iress-oss/ids-components';
import { type ReactNode } from 'react';
import { Metadata } from './components/Metadata';
import { Pre } from './components/Pre';
import { StoryEmbed } from './components/StoryEmbed';

function Details({
  children,
  ...props
}: Omit<IressExpanderProps, 'activator'>) {
  // Extract summary text from children (first <summary> element)
  let activator: ReactNode = 'Details';
  const content: ReactNode[] = [];

  const childArray = Array.isArray(children) ? children : [children];
  for (const child of childArray) {
    if (
      child &&
      typeof child === 'object' &&
      'type' in child &&
      child.type === 'summary'
    ) {
      activator = child.props.children;
    } else {
      content.push(child);
    }
  }

  return (
    <IressExpander activator={activator} mode="link" {...props}>
      {content}
    </IressExpander>
  );
}

export function useMDXComponents() {
  return { pre: Pre, Metadata, blockquote: IressAlert, StoryEmbed, Details };
}
