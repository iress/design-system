import { type PropsWithChildren } from 'react';
import { styled } from 'storybook/theming';

const CenteredDiv = styled.div(({ theme }) => {
  return {
    position: 'fixed',
    background: theme.background?.app ?? 'white',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    fontFamily:
      theme.typography?.fonts.base ?? 'Inter, Helevetica, Arial, sans-serif',
    color: theme.color?.light ?? '#6D7278',
  };
});

export const LoginSplash = ({
  children = 'Logging in...',
}: PropsWithChildren) => <CenteredDiv>{children}</CenteredDiv>;
