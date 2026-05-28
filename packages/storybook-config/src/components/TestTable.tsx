import { type ReactNode, use } from 'react';
import { IressStorybookContext } from './IressStorybookContext';

export interface TestComponentMeta {
  part: string;
  description: string;
  role?: ReactNode;
  testId: string;
}

export interface TestTableProps {
  items: TestComponentMeta[];
}

/**
 * Renders a table of `data-testid` suffixes for a component's propagated test IDs.
 * Used in Storybook docs pages to document available test IDs.
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
          <th>By Role</th>
          <th>By Test ID</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ part, description, role, testId }) => (
          <tr key={part}>
            <td>{part}</td>
            <td>{description}</td>
            <td>
              {role ?? <IressText color="colour.neutral.70">N/A</IressText>}
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
