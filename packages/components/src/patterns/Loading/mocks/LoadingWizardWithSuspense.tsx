import {
  IressButton,
  IressContainer,
  IressForm,
  IressFormField,
  IressInputCurrency,
  IressPanel,
  IressStack,
  IressText,
} from '@/main';
import { useDeferredValue, useEffect, useState } from 'react';
import retirementGraph from './retirement-graph.png';
import { IressLoadingSuspense } from '../LoadingSuspense';

interface PageProps {
  setPage: (page: number) => void;
}

interface ChartProps {
  money: number | null;
}

const API = {
  getHomePage: async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    return 1;
  },
  getRetirementIncomeProjection: async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    return true;
  },
  getChart: async () => {
    await new Promise((resolve) => {
      const chartImage = new Image();
      chartImage.src = retirementGraph;
      setTimeout(resolve, 1000);
    });

    return true;
  },
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
  const initialChart = IressLoadingSuspense.use(API.getChart);
  const [updatedChart, setUpdatedChart] = useState<boolean | undefined>();
  const [money, setMoney] = useState<number | null>(null);
  const [updating, setUpdating] = useState(false);
  const deferredMoney = useDeferredValue(money);

  const chart = updatedChart ?? initialChart;

  useEffect(() => {
    if (deferredMoney === null) {
      return;
    }

    const update = async () => {
      setUpdating(() => true);
      const newChart = await API.chartUpdate();
      setUpdatedChart(newChart);
      setUpdating(() => false);
    };

    void update();
  }, [deferredMoney]);

  return (
    <IressLoadingSuspense pattern="component" update={updating}>
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
    </IressLoadingSuspense>
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
  const promise = API.getRetirementIncomeProjection;
  IressLoadingSuspense.use(promise);
  IressLoadingSuspense.uncache(promise);

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

const HomePage = () => {
  const promise = API.getHomePage;
  const startPage = IressLoadingSuspense.use(promise);
  IressLoadingSuspense.uncache(promise);

  const [movedPage, setMovedPage] = useState<number | undefined>();

  const page = movedPage ?? startPage;

  return (
    <IressContainer style={{ maxWidth: '600px', paddingBlock: '3rem' }}>
      {page === 1 && (
        <IressLoadingSuspense pattern="page" template="form">
          {page === 1 && <StartPage setPage={setMovedPage} />}
        </IressLoadingSuspense>
      )}
      {page === 2 && (
        <IressLoadingSuspense pattern="page" template="form">
          <RetirementIncomeProjectionPage />
        </IressLoadingSuspense>
      )}
    </IressContainer>
  );
};

export const LoadingSuspenseWizard = () => (
  <IressLoadingSuspense pattern="start-up">
    <HomePage />
  </IressLoadingSuspense>
);
