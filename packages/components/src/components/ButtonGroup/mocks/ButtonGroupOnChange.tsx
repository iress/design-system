import {
  IressButton,
  IressButtonGroup,
  IressToasterProvider,
  useToaster,
} from '@/main';

function ButtonGroupWithToaster() {
  const { success } = useToaster();

  return (
    <IressButtonGroup
      label="Trigger toasts by selecting an option below"
      onChange={(selected) => {
        success({
          content: `Selected: ${selected ? String(selected) : 'none'}`,
        });
      }}
    >
      <IressButton>Option 1</IressButton>
      <IressButton>Option 2</IressButton>
      <IressButton>Option 3</IressButton>
      <IressButton>Option 4</IressButton>
    </IressButtonGroup>
  );
}

export function ButtonGroupOnChange() {
  return (
    <IressToasterProvider container={document.body}>
      <ButtonGroupWithToaster />
    </IressToasterProvider>
  );
}
