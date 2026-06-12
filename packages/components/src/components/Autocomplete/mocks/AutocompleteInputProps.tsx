import {
  IressAutocomplete,
  IressButton,
  IressIcon,
  IressPanel,
  IressPopover,
} from '@/main';

export function AutocompleteInputProps() {
  return (
    <IressAutocomplete
      options={[
        { label: 'Option 1' },
        { label: 'Option 2' },
        { label: 'Option 3' },
        { label: 'Option 4' },
        { label: 'Option 5' },
      ]}
      append={
        <IressPopover
          activator={
            <IressButton mode="muted" mr="-spacing.3">
              <IressIcon name="cog" />
            </IressButton>
          }
          align="bottom-end"
          container={document.body}
        >
          <IressPanel>Some settings in here</IressPanel>
        </IressPopover>
      }
      prepend={<IressIcon name="search" />}
      width="12"
    />
  );
}
