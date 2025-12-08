import * as componentMapping from '@/main';
import { getPreview } from '@iress-oss/ids-storybook-config/preview';
import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.scss';
import './preview.scss';
import {
  type IressDividerProps,
  type IressInlineProps,
  type IressPanelProps,
} from '@/main';

interface NewPanelProps extends IressPanelProps {
  bg?: IressPanelProps['background'];
  layerStyle?: string;
  p?: string;
  m?: string;
  mt?: string;
  mb?: string;
}

const NewPanel = ({
  bg,
  layerStyle,
  mt,
  mb,
  p,
  m,
  ...props
}: NewPanelProps) => {
  const classNames: string[] = [];

  if (mt == '-lg') {
    classNames.push('iress-mt--n-md');
  }

  if (mb == '-spacing.900') {
    classNames.push('iress-mb--n-lg');
  }

  if (mt == '-lg') {
    classNames.push('iress-mt--n-md');
  }

  if (p) {
    classNames.push(`iress-p--${p}`);
  }

  if (m) {
    classNames.push(`iress-m--${m}`);
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

interface NewInlineProps extends IressInlineProps {
  gap?: string;
}

const NewInline = ({ gap, ...props }: NewInlineProps) => {
  return (
    <componentMapping.IressInline
      {...props}
      gutter={(gap as never) ?? props.gutter}
    />
  );
};

const NewDivider = (props: IressDividerProps) => {
  return (
    <div>
      <componentMapping.IressDivider {...props} className="iress-my--md" />
    </div>
  );
};

const basePreview = getPreview({
  docsProps: {
    componentMapping: {
      ...componentMapping,
      IressDivider: NewDivider,
      IressInline: NewInline,
      IressPanel: NewPanel,
    } as never,
    noStyles: true,
  },
  sandboxConfig: {
    dependencies: {
      '@iress-oss/ids-components': 'latest',
    },
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
