import {
  IressButton,
  IressContainer,
  IressForm,
  IressFormField,
  IressInputCurrency,
  IressPanel,
  IressText,
} from '@/main';
import { use, useDeferredValue, useEffect, useState } from 'react';
import retirementGraph from './retirement-graph.png';
import { IressLoadingSuspense } from '../LoadingSuspense';

interface PageProps {
  setPage: (page: number) => void;
}

interface ChartProps {
  money: number | null;
}

const API = {
  getHomePage: () =>
    new Promise<number>((resolve) => {
      setTimeout(() => resolve(1), 300);
    }),
  getRetirementIncomeProjection: () =>
    new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 200);
    }),
  getChart: () =>
    new Promise<boolean>((resolve, reject) => {
      const chartImage = new Image();
      chartImage.onload = () => resolve(true);
      chartImage.onerror = reject;
      chartImage.src = retirementGraph;
    }),
  chartUpdate: () =>
    new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 200);
    }),
};

// Create promises once at module level so they are stable references for React 19's `use` hook.
const homePagePromise = API.getHomePage();
const retirementPromise = API.getRetirementIncomeProjection();
const chartPromise = API.getChart();

const Graph = () => (
  <img
    src={retirementGraph}
    alt=""
    style={{ maxWidth: '100%', height: 'auto' }}
  />
);

const Chart = () => {
  const initialChart = use(chartPromise);
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
      <IressPanel mt="spacing.4">
        <IressForm<ChartProps>
          heading="Update projection"
          onSubmit={(projectionData) => setMoney(projectionData.money)}
        >
            <IressFormField
              name="money"
              label="My money"
              render={(controlledProps) => (
                <IressInputCurrency {...controlledProps} />
              )}
            />
            <IressButton type="submit">Update projection</IressButton>
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
  use(retirementPromise);

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
  const startPage = use(homePagePromise);
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

export const LoadingSuspenseWizardFast = () => (
  <IressLoadingSuspense pattern="start-up">
    <HomePage />
  </IressLoadingSuspense>
);
