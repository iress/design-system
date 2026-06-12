import { type ReactNode, use } from 'react';
import { IressStorybookContext } from './IressStorybookContext';

export interface TestComponentMeta {
  part: string;
  description: string;
  query?: ReactNode;
  testId: string;
}

export interface TestTableProps {
  items: TestComponentMeta[];
}

/**
 * Renders a table of test queries for a component's testable parts.
 * Used in Storybook docs pages to document available test selectors.
 */
export const TestTable = ({ items }: TestTableProps) => {
  const { IressText } = use(IressStorybookContext);

  if (!items.length) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Part</th>
          <th>Description</th>
          <th>Recommended Query</th>
          <th>Test ID</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ part, description, query, testId }) => (
          <tr key={part}>
            <td>{part}</td>
            <td>{description}</td>
            <td>
              {query ?? (
                <IressText color="colour.neutral.70">
                  Use test ID →
                </IressText>
              )}
            </td>
            <td>
              <code>{`getByTestId('${testId}')`}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
