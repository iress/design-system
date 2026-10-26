import { useState } from 'react';
import {
  IressCol,
  IressField,
  IressRow,
  IressSelect,
  IressStack,
  IressText,
  IressToggle,
} from '@/main';

const longTextItems = [
  {
    id: '1',
    title:
      'Strategic Enterprise Architecture Implementation and Digital Transformation Framework',
    category: 'Enterprise Solutions',
  },
  {
    id: '2',
    title:
      'Advanced Machine Learning Pipeline for Predictive Analytics in Financial Services',
    category: 'Artificial Intelligence',
  },
  {
    id: '3',
    title:
      'Cloud-Native Microservices Architecture with Containerized Deployment Strategy',
    category: 'Cloud Computing',
  },
  {
    id: '4',
    title:
      'Cybersecurity Framework for Multi-Tenant SaaS Applications with Zero-Trust Architecture',
    category: 'Security',
  },
  {
    id: '5',
    title:
      'Real-Time Data Processing and Analytics Platform for Internet of Things Devices',
    category: 'IoT & Analytics',
  },
];

const options = async (query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!query) return [];

  const filtered = longTextItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  );

  return filtered.map((item) => ({
    label: item.title,
    value: item.id,
    meta: item.category,
  }));
};

export function OptionsLongText() {
  const [matchActivatorWidth, setMatchActivatorWidth] = useState(true);

  return (
    <IressStack gap="md">
      <IressToggle
        checked={matchActivatorWidth}
        onChange={setMatchActivatorWidth}
      >
        <IressText>
          {matchActivatorWidth
            ? 'matchActivatorWidth: true (default)'
            : 'matchActivatorWidth: false (auto-size to content)'}
        </IressText>
      </IressToggle>

      <IressRow gutter="md">
        <IressCol span="6">
          <IressField
            label="Single select with long text"
            htmlFor="single-select-long"
          >
            <IressSelect
              container={document.body}
              options={options}
              id="single-select-long"
              placeholder="Type to search..."
              matchActivatorWidth={matchActivatorWidth}
            />
          </IressField>
        </IressCol>
        <IressCol span="6">
          <IressField
            label="Multi-select with long text"
            htmlFor="multi-select-long"
          >
            <IressSelect
              container={document.body}
              options={options}
              id="multi-select-long"
              multiSelect
              placeholder="Type to search..."
              matchActivatorWidth={matchActivatorWidth}
            />
          </IressField>
        </IressCol>
      </IressRow>
    </IressStack>
  );
}
