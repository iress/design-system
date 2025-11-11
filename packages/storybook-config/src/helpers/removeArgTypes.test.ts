import { removeArgTypes } from './removeArgTypes';

describe('removeArgTypes', () => {
  it('creates an object with the args to disable in Storybook', () => {
    // Arrange
    const argsToDisable = ['data-testid', 'data-value'];

    // Act
    const result = removeArgTypes(argsToDisable);

    // Assert
    expect(result).toEqual({
      'data-testid': {
        table: {
          disable: true,
        },
      },
      'data-value': {
        table: {
          disable: true,
        },
      },
    });
  });
});
