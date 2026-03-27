export interface TestId {
  suffix: string;
  description: string;
}

export interface TestIdTableProps {
  testIds: TestId[];
  testIdPrefix?: string;
}

/**
 * Renders a table of `data-testid` suffixes for a component's propagated test IDs.
 * Used in Storybook docs pages to document available test IDs.
 */
export const TestIdTable = ({ testIds, testIdPrefix }: TestIdTableProps) => {
  if (!testIds.length) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Suffix</th>
          {testIdPrefix && <th>Example</th>}
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {testIds.map(({ suffix, description }) => (
          <tr key={suffix}>
            <td>
              <code>{suffix}</code>
            </td>
            {testIdPrefix && (
              <td>
                <code>{`${testIdPrefix}__${suffix}`}</code>
              </td>
            )}
            <td>{description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
