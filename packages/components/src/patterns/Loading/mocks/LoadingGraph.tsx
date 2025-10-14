import { IressButton, IressLoading, IressStack } from '@/main';
import { useCallback, useEffect, useState } from 'react';
import retirementGraph from './retirement-graph.png';

const API = {
  chart: async () =>
    new Promise<boolean>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(true);
      }, 2000);
    }),
  chartUpdate: async () =>
    new Promise<boolean>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(true);
      }, 2000);
    }),
};

const Graph = () => (
  <img
    src={retirementGraph}
    alt=""
    style={{ maxWidth: '100%', height: 'auto' }}
  />
);

export const LoadingGraph = () => {
  const [graph, setGraph] = useState(false);
  const [updating, setUpdating] = useState(false);
  const renderLoading = IressLoading.shouldRender(graph);

  const doUpdate = useCallback(() => {
    const update = async () => {
      await API.chartUpdate();
      setUpdating(false);
    };

    setUpdating(true);
    void update();
  }, []);

  useEffect(() => {
    const initialise = async () => {
      setGraph(await API.chart());
    };

    void initialise();
  }, []);

  return (
    <IressLoading
      pattern="component"
      template="chart"
      loaded={!renderLoading}
      update={updating}
    >
      <IressStack gap="md" style={{ display: 'inline-block' }}>
        <div>
          <Graph />
        </div>
        <IressButton onClick={doUpdate}>Update</IressButton>
      </IressStack>
    </IressLoading>
  );
};
