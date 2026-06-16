import type { ComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  IressInline,
  IressIcon,
  IressText,
  IressStack,
  IressButton,
} from '@iress-oss/ids-components';

interface MetadataProps {
  meta: ComponentMeta;
}

export function Metadata({ meta }: MetadataProps) {
  const hasDocs = meta.storybook || meta.guidelines || meta.github?.guidelines || meta.github?.storybook || meta.figma;
  const hasDocsEdit = meta.github?.guidelines || meta.github?.storybook;

  return (
    <IressStack mb="md">
      {meta.import && (
        <IressInline gap="sm" verticalAlign="middle" pb="spacing.1">
            <IressText element="strong" color="muted" width="input.4">Import</IressText>
            <IressText element="code">
                {meta.import}
            </IressText>
        </IressInline>
      )}
      {meta.github && (
        <IressInline verticalAlign="middle">
            <IressText element="strong" color="muted" width="input.4">Github</IressText>
            {meta.github?.source && (
                <IressButton mode="muted" href={meta.github.source} prepend={<IressIcon name="code" />} target="_blank" rel="noopener noreferrer">
                    Source
                </IressButton>
            )}
            {meta.github?.reportIssue && (
                <IressButton mode="muted" href={meta.github.reportIssue} prepend={<IressIcon name="bug_report" />} target="_blank" rel="noopener noreferrer">
                    Report issue
                </IressButton>
            )}
            {meta.github?.requestFeature && (
                <IressButton mode="muted" href={meta.github.requestFeature} prepend={<IressIcon name="lightbulb" />} target="_blank" rel="noopener noreferrer">
                    Request feature
                </IressButton>
            )}
        </IressInline>
      )}
      {hasDocs && (
        <IressInline verticalAlign="middle">
            <IressText element="strong" color="muted" width="input.4">Docs</IressText>
            {meta.guidelines && (
                <IressButton mode="muted" href={meta.guidelines} prepend={<IressIcon name="developer_guide" />} target="_blank" rel="noopener noreferrer">
                    Guidelines
                </IressButton>
            )}
            {meta.storybook && (
                <IressButton mode="muted" href={meta.storybook} prepend={<IressIcon name="menu_book" />} target="_blank" rel="noopener noreferrer">
                    Storybook
                </IressButton>
            )}
            {meta.figma && (
                <IressButton mode="muted" href={meta.figma} prepend={<IressIcon name="design_services" />} target="_blank" rel="noopener noreferrer">
                    Figma
                </IressButton>
            )}
            {hasDocsEdit && (
                <>
                    {meta.github?.guidelines && (
                        <IressButton mode="muted" href={meta.github.guidelines} prepend={<IressIcon name="edit" />} target="_blank" rel="noopener noreferrer">
                            Edit guidelines
                        </IressButton>
                    )}
                    {meta.github?.storybook && (
                        <IressButton mode="muted" href={meta.github.storybook} prepend={<IressIcon name="edit_document" />} target="_blank" rel="noopener noreferrer">
                            Edit stories
                        </IressButton>
                    )}
                </>
            )}
        </IressInline>
      )}
    </IressStack>
  );
}
