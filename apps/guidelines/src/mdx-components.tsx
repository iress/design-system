import { IressAlert, IressExpander, IressExpanderProps } from '@iress-oss/ids-components';
import { type AnchorHTMLAttributes, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { Metadata } from './components/Metadata';
import { Pre } from './components/Pre';
import { StoryEmbed } from './components/StoryEmbed';

function MdxLink({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  // Internal links (start with /) use the router
  if (href?.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  }
  // External links open in new tab
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

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
  return { pre: Pre, a: MdxLink, Metadata, blockquote: IressAlert, StoryEmbed, Details };
}
