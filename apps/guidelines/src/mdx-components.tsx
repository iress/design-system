import { IressAlert, IressAlertProps, IressExpander, IressExpanderProps } from '@iress-oss/ids-components';
import { Children, cloneElement, isValidElement, type AnchorHTMLAttributes, type ReactElement, type ReactNode } from 'react';
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

function Blockquote({ children, ...props }: Omit<IressAlertProps, 'status'>) {
  // MDX renders blockquotes as: <blockquote><p>content</p></blockquote>
  // Detect leading ⚠️ to use warning status and strip the emoji
  let status: IressAlertProps['status'] = 'info';
  let processedChildren = children;

  const stripped = stripLeadingEmoji(children);
  if (stripped) {
    status = 'warning';
    processedChildren = stripped;
  }

  return (
    <IressAlert status={status} {...props}>
      {processedChildren}
    </IressAlert>
  );
}

const WARNING_PREFIX = /^\s*⚠️\s*/;

/**
 * Walks into the first text node of the children tree (through <p>, <strong>, etc.)
 * and strips the ⚠️ prefix if found. Returns the new children tree, or null if no match.
 */
function stripLeadingEmoji(children: ReactNode): ReactNode | null {
  const childArray = Children.toArray(children);
  if (childArray.length === 0) return null;

  // Find the first non-whitespace child (MDX inserts "\n" around block elements)
  for (let i = 0; i < childArray.length; i++) {
    const child = childArray[i];

    // Skip whitespace-only text nodes
    if (typeof child === 'string' && child.trim() === '') continue;

    // Direct string child with the emoji
    if (typeof child === 'string' && WARNING_PREFIX.test(child)) {
      const updated = [...childArray];
      updated[i] = child.replace(WARNING_PREFIX, '');
      return updated;
    }

    // React element — recurse into its children
    if (isValidElement(child)) {
      const el = child as ReactElement<{ children?: ReactNode }>;
      const innerStripped = stripLeadingEmoji(el.props.children);
      if (innerStripped !== null) {
        const updated = [...childArray];
        updated[i] = cloneElement(el, {}, innerStripped);
        return updated;
      }
    }

    // First meaningful child didn't match — stop looking
    break;
  }

  return null;
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
  return { pre: Pre, a: MdxLink, Metadata, blockquote: Blockquote, StoryEmbed, Details };
}
