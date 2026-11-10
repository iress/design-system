import { useState } from 'react';
import {
  IressButton,
  IressButtonGroup,
  IressInline,
  IressMenu,
  IressMenuItem,
  IressStack,
  IressText,
  IressToggle,
} from '@/main';

export function MenuRoles() {
  const [role, setRole] = useState<'list' | 'menu' | 'listbox'>('list');
  const [multiSelect, setMultiSelect] = useState(false);

  return (
    <IressStack gap="md">
      <IressInline gap="md" verticalAlign="middle">
        <IressButtonGroup label="Menu role">
          <IressButton
            mode={role === 'list' ? 'primary' : 'secondary'}
            onClick={() => setRole('list')}
          >
            list
          </IressButton>
          <IressButton
            mode={role === 'menu' ? 'primary' : 'secondary'}
            onClick={() => setRole('menu')}
          >
            menu
          </IressButton>
          <IressButton
            mode={role === 'listbox' ? 'primary' : 'secondary'}
            onClick={() => setRole('listbox')}
          >
            listbox
          </IressButton>
        </IressButtonGroup>

        {role === 'listbox' && (
          <IressToggle
            checked={multiSelect}
            onChange={(checked) => setMultiSelect(checked)}
          >
            Multi-select
          </IressToggle>
        )}
      </IressInline>

      <IressText element="p" color="colour.neutral.70">
        {role === 'list' &&
          'List role: items are related context, navigated with tab key.'}
        {role === 'menu' &&
          'Menu role: items perform actions, arrow keys wrap around.'}
        {role === 'listbox' &&
          'Listbox role: items are selectable, like a <select> element.'}
      </IressText>

      <IressMenu
        role={role}
        multiSelect={role === 'listbox' ? multiSelect : undefined}
        aria-label="Role example"
      >
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
      </IressMenu>
    </IressStack>
  );
}
