import type { ReactNode } from 'react';

export interface AddonState {
  /**
   * The code to display in the sandbox. It will be displayed in the editor and preview.
   */
  code: string;

  /**
   * The scopes to use in the sandbox.
   * Scopes are used to allow the code to access global variables and modules.
   * The default scope is `default`, it is always available.
   */
  scopes?: string[];
}

export interface AddonConfig extends AddonState {
  /**
   * Whether the sandbox editor is disabled.
   * If set to true, it will disable the sandbox editor panel for this story.
   * @default true
   */
  disable?: boolean;

  /**
   * Transformers are used to modify the code before it is displayed in the editor.
   * By default, it will use the EDITOR_TRANSFORMERS constant defined in the addon.
   */
  editorTransformers?: SandboxTransformerMap;

  /**
   * The story ID of the sandbox.
   * If set, it will add a button to open the sandbox in the Storybook UI where applicable.
   * This is usually in the format: `/story/sandbox--sandbox`.
   */
  openInStoryId?: string;

  /**
   * The templates to display in the sandbox.
   * Templates are used to provide predefined states for the sandbox.
   * When a template is selected, the state will be applied to the sandbox.
   */
  templates?: SandboxTemplate[];
}

export interface SandboxTemplate {
  /**
   * The description of the template.
   * @todo This does not work as a ReactNode if you are using React 19. Should work in Storybook 10. Please pass a string to add a description.
   */
  description?: ReactNode;

  /**
   * When the template is selected, the state will be applied to the sandbox.
   */
  state: AddonState;

  /**
   * The thumbnail to display for the template.
   * @todo This does not work if you are using React 19. Should work in Storybook 10.
   */
  thumbnail?: ReactNode;

  /**
   * The title of the template.
   */
  title: string;
}

export type SandboxScope = Record<string, unknown>;
export type SandboxStyle = () => ReactNode;
export type SandboxTransformer = (code: string) => string;
export type SandboxTransformerMap = Record<string, SandboxTransformer>;

export interface SandboxParentLocation {
  href: string;
  search: string;
}
