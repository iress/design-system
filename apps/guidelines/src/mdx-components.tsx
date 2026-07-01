import { IressAlert, IressAlertProps, IressExpander, IressExpanderProps, IressButton, IressButtonProps } from '@iress-oss/ids-components';
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

function FigmaIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 346 512.36" aria-hidden="true" style={{ width: '1em', height: 'auto' }}><g fill-rule="nonzero"><path fill="#00B6FF" d="M172.53 246.9c0-42.04 34.09-76.11 76.12-76.11h11.01c.3.01.63-.01.94-.01 47.16 0 85.4 38.25 85.4 85.4 0 47.15-38.24 85.39-85.4 85.39-.31 0-.64-.01-.95-.01l-11 .01c-42.03 0-76.12-34.09-76.12-76.12V246.9z"/><path fill="#24CB71" d="M0 426.98c0-47.16 38.24-85.41 85.4-85.41l87.13.01v84.52c0 47.65-39.06 86.26-86.71 86.26C38.67 512.36 0 474.13 0 426.98z"/><path fill="#FF7237" d="M172.53.01v170.78h87.13c.3-.01.63.01.94.01 47.16 0 85.4-38.25 85.4-85.4C346 38.24 307.76 0 260.6 0c-.31 0-.64.01-.95.01h-87.12z"/><path fill="#FF3737" d="M0 85.39c0 47.16 38.24 85.4 85.4 85.4h87.13V.01H85.39C38.24.01 0 38.24 0 85.39z"/><path fill="#874FFF" d="M0 256.18c0 47.16 38.24 85.4 85.4 85.4h87.13V170.8H85.39C38.24 170.8 0 209.03 0 256.18z"/></g></svg>;
}

function FigmaLink(props: IressButtonProps) {
  return <IressButton {...props} mode="tertiary" prepend={<FigmaIcon />}>
    View in Figma
  </IressButton>;
}

export function useMDXComponents() {
  return { pre: Pre, a: MdxLink, Metadata, blockquote: Blockquote, StoryEmbed, Details, FigmaLink };
}
