import {
  IressButton,
  IressContainer,
  IressForm,
  IressFormField,
  IressInputCurrency,
  IressLoading,
  IressPanel,
  IressStack,
  IressText,
} from '@/main';
import { useDeferredValue, useEffect, useState } from 'react';
import retirementGraph from './retirement-graph.png';

interface PageProps {
  setPage: (page: number) => void;
}

interface ChartProps {
  money: number | null;
}

const API = {
  initialise: async () =>
    new Promise<boolean>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(true);
      }, 3000);
    }),
  data: async () =>
    new Promise<boolean>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(true);
      }, 2000);
    }),
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

const Chart = () => {
  const [chart, setChart] = useState(false);
  const [money, setMoney] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [updating, setUpdating] = useState(false);
  const safeLoaded = IressLoading.shouldRender(loaded);
  const deferredMoney = useDeferredValue(money);

  useEffect(() => {
    const initialise = async () => {
      const newChart = await API.chart();
      setChart(newChart);
      setLoaded(() => true);
    };

    void initialise();
  }, []);

  useEffect(() => {
    if (deferredMoney === null) {
      return;
    }

    setUpdating(() => true);

    const update = async () => {
      const newChart = await API.chartUpdate();
      setChart(newChart);
      setUpdating(() => false);
    };

    void update();
  }, [deferredMoney]);

  return (
    <IressLoading pattern="component" loaded={!safeLoaded} update={updating}>
      {chart && <Graph />}
      <IressPanel>
        <IressForm<ChartProps>
          onSubmit={(projectionData) => setMoney(projectionData.money)}
        >
          <IressStack gap="md">
            <h3>Update projection</h3>
            <IressFormField
              name="money"
              label="My money"
              render={(controlledProps) => (
                <IressInputCurrency {...controlledProps} />
              )}
            />
            <IressButton type="submit">Update projection</IressButton>
          </IressStack>
        </IressForm>
      </IressPanel>
    </IressLoading>
  );
};

const StartPage = ({ setPage }: PageProps) => (
  <IressText>
    <h2>Maximise your retirement</h2>
    <p>
      Maximize your retirement in Australia by contributing to your super early
      and making voluntary top-ups to benefit from compounding. Take advantage
      of employer contributions, government co-contributions, and tax benefits.
      Diversify your investments and review your strategy regularly to stay on
      track. Consider additional income streams and seek professional advice for
      a secure future.
    </p>
    <hr />
    <IressButton onClick={() => setPage(2)}>Next</IressButton>
  </IressText>
);

const RetirementIncomeProjectionPage = () => {
  const [data, setData] = useState(false);
  const loaded = data !== false;
  const renderLoading = IressLoading.shouldRender(loaded);

  useEffect(() => {
    const initialise = async () => {
      const newData = await API.data();
      setData(newData);
    };

    void initialise();
  }, []);

  if (renderLoading) {
    return <IressLoading pattern="page" template="form" loaded={loaded} />;
  }

  return (
    <IressText>
      <h2>Retirement Income Projection</h2>
      <p>
        We've got enough information to provide you with a retirement income
        projection. This will help you understand how much you can expect to
        receive in retirement based on your current super balance, your
        contributions, and your investment strategy.
      </p>
      <Chart />
    </IressText>
  );
};

export const LoadingWizard = () => {
  const [page, setPage] = useState(0);
  const loaded = page > 0;
  const renderLoading = IressLoading.shouldRender(loaded);

  useEffect(() => {
    const initialise = async () => {
      await API.initialise();
      setPage(1);
    };

    void initialise();
  }, []);

  if (renderLoading) {
    return <IressLoading pattern="start-up" loaded={loaded} />;
  }

  return (
    <IressContainer style={{ maxWidth: '600px', paddingBlock: '3rem' }}>
      {page === 1 && <StartPage setPage={setPage} />}
      {page === 2 && <RetirementIncomeProjectionPage />}
    </IressContainer>
  );
};
