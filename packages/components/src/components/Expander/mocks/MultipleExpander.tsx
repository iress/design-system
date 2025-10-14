import { IressExpander } from '@/main';
import { useState } from 'react';

export const MultipleExpander = () => {
  const [openActivator, setOpenActivator] = useState('');

  const handleChange = (newOpenActivator: string, open?: boolean) => {
    setOpenActivator(open ? newOpenActivator : '');
  };

  return (
    <div>
      <IressExpander
        activator="top"
        open={openActivator === 'top'}
        onChange={({ open }) => handleChange('top', open)}
      >
        <h1>Top</h1>
      </IressExpander>
      <IressExpander
        activator="bottom"
        open={openActivator === 'bottom'}
        onChange={({ open }) => handleChange('bottom', open)}
      >
        <h2>Bottom</h2>
      </IressExpander>
    </div>
  );
};
