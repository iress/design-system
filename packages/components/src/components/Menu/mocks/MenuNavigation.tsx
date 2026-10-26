import { IressMenu, IressMenuItem } from '@/main';

export function MenuNavigation() {
  return (
    <nav aria-label="Secondary">
      <IressMenu>
        <IressMenuItem href="https://www.iress.com/software/financial-advice/">
          Financial advice
        </IressMenuItem>
        <IressMenuItem
          selected
          href="https://www.iress.com/software/trading-and-market-data/"
        >
          Trading and market data
        </IressMenuItem>
        <IressMenuItem href="https://www.iress.com/software/investment-management/">
          Investment management
        </IressMenuItem>
        <IressMenuItem href="https://www.iress.com/software/mortgages/">
          Mortgages
        </IressMenuItem>
      </IressMenu>
    </nav>
  );
}
