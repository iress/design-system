import {
  IressField,
  IressRichSelect,
  IressToggle,
  IressText,
  IressStack,
} from '@/main';
import { useState } from 'react';

interface LongTextItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

// Mock data with long text content
const longTextItems: LongTextItem[] = [
  {
    id: '1',
    title:
      'Strategic Enterprise Architecture Implementation and Digital Transformation Framework',
    description:
      'A comprehensive approach to modernizing legacy systems while maintaining operational continuity across multiple business units and geographical locations with complex regulatory requirements',
    category: 'Enterprise Solutions',
  },
  {
    id: '2',
    title:
      'Advanced Machine Learning Pipeline for Predictive Analytics in Financial Services',
    description:
      'Implementation of sophisticated algorithms for risk assessment, fraud detection, and customer behavior analysis using neural networks and deep learning methodologies',
    category: 'Artificial Intelligence',
  },
  {
    id: '3',
    title:
      'Cloud-Native Microservices Architecture with Containerized Deployment Strategy',
    description:
      'Scalable distributed system design utilizing Kubernetes orchestration, service mesh technology, and automated CI/CD pipelines for high-availability applications',
    category: 'Cloud Computing',
  },
  {
    id: '4',
    title:
      'Cybersecurity Framework for Multi-Tenant SaaS Applications with Zero-Trust Architecture',
    description:
      'Comprehensive security implementation including identity management, threat detection, vulnerability assessment, and compliance monitoring for enterprise-grade applications',
    category: 'Security',
  },
  {
    id: '5',
    title:
      'Real-Time Data Processing and Analytics Platform for Internet of Things Devices',
    description:
      'High-throughput data ingestion and processing system capable of handling millions of sensor readings per second with edge computing capabilities',
    category: 'IoT & Analytics',
  },
  {
    id: '6',
    title:
      'Blockchain-Based Supply Chain Management System with Smart Contract Integration',
    description:
      'Decentralized tracking and verification system ensuring transparency, authenticity, and compliance throughout the entire supply chain lifecycle',
    category: 'Blockchain',
  },
  {
    id: '7',
    title:
      'Advanced Natural Language Processing Engine for Document Analysis and Information Extraction',
    description:
      'AI-powered system for parsing complex documents, extracting key information, and generating automated summaries with multi-language support',
    category: 'Natural Language Processing',
  },
  {
    id: '8',
    title:
      'Augmented Reality Mobile Application Development for Industrial Training and Maintenance',
    description:
      'Immersive training platform utilizing AR technology to provide hands-on learning experiences for complex machinery operation and maintenance procedures',
    category: 'Augmented Reality',
  },
  {
    id: '9',
    title:
      'High-Performance Computing Cluster for Scientific Research and Mathematical Modeling',
    description:
      'Parallel processing infrastructure designed for complex simulations, weather modeling, genome sequencing, and other computationally intensive research applications',
    category: 'High Performance Computing',
  },
  {
    id: '10',
    title:
      'Automated DevSecOps Pipeline with Continuous Security Testing and Compliance Monitoring',
    description:
      'Integrated development and operations workflow incorporating security scanning, vulnerability assessment, and regulatory compliance checks at every stage',
    category: 'DevSecOps',
  },
];

const options = async (query: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!query) return [];

  if (query === 'error') {
    throw new Error('Simulated search error');
  }

  // Filter items based on search query (case-insensitive)
  const filteredItems = longTextItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  );

  return filteredItems.map((item) => ({
    label: item.title,
    value: item.id,
    meta: item.category,
    // Include description in a data attribute for potential tooltip use
    description: item.description,
  }));
};

export const SelectOptionLongText = () => {
  const [matchActivatorWidth, setMatchActivatorWidth] = useState(true);

  return (
    <IressStack gutter="md">
      <IressField
        label={`matchActivatorWidth: ${matchActivatorWidth ? 'True' : 'False'}`}
      >
        <IressToggle
          checked={matchActivatorWidth}
          onChange={setMatchActivatorWidth}
        >
          <IressText>
            {matchActivatorWidth
              ? 'Match input width (default)'
              : 'Auto-size to content'}
          </IressText>
        </IressToggle>
      </IressField>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ width: '400px' }}>
          <IressField
            label="Single select with long text"
            htmlFor="single-select-long"
          >
            <IressRichSelect
              container={document.body}
              options={options}
              id="single-select-long"
              placeholder="Type anything to start search"
              matchActivatorWidth={matchActivatorWidth}
            />
          </IressField>
        </div>
        <div style={{ width: '400px' }}>
          <IressField
            label="Multi-select with long text"
            htmlFor="multi-select-long"
          >
            <IressRichSelect
              container={document.body}
              options={options}
              id="multi-select-long"
              multiSelect
              placeholder="Type anything to start search"
              matchActivatorWidth={matchActivatorWidth}
            />
          </IressField>
        </div>
      </div>
    </IressStack>
  );
};
