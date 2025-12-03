import * as componentMapping from '@/main';
import { getPreview } from '@iress-oss/ids-storybook-config/preview';
import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.scss';
import './preview.scss';
import { type IressPanelProps } from '@/main';

interface NewPanelProps extends IressPanelProps {
  bg?: IressPanelProps['background'];
  layerStyle?: string;
  mt?: string;
  mb?: string;
}

const NewPanel = ({ bg, layerStyle, mt, mb, ...props }: NewPanelProps) => {
  const classNames: string[] = [];

  if (mt == '-lg') {
    classNames.push('iress-mt--n-lg');
  }

  if (mb == '-spacing.900') {
    classNames.push('iress-mb--n-lg');
  }

  const newBg = layerStyle === 'elevation.raised' ? 'default' : bg;
  const padding = layerStyle === 'elevation.raised' ? undefined : 'none';

  return (
    <componentMapping.IressPanel
      {...props}
      className={classNames.join(' ')}
      background={newBg ?? 'transparent'}
      padding={padding}
    />
  );
};

const basePreview = getPreview({
  docsProps: {
    componentMapping: {
      ...componentMapping,
      IressPanel: NewPanel,
    } as never,
    noStyles: true,
  },
});

const preview: Preview = {
  ...basePreview,
  parameters: {
    ...basePreview.parameters,
    options: {
      ...(basePreview.parameters?.options as Record<string, unknown>),
      selectedPanel: 'controls',
      storySort: {
        order: [
          'Introduction',
          'Get Started',
          'Foundations',
          'Patterns',
          'Components',
          'Resources',
        ],
      },
    },
  },
};

export default preview;
