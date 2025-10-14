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
        activator="Top"
        open={openActivator === 'top'}
        onChange={(open) => handleChange('top', open)}
      >
        Expander content for the top activator goes here.
      </IressExpander>
      <IressExpander
        activator="Bottom"
        open={openActivator === 'bottom'}
        onChange={(open) => handleChange('bottom', open)}
      >
        Expander content for the bottom activator goes here.
      </IressExpander>
    </div>
  );
};
