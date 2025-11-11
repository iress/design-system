import { disableArgTypes } from './disableArgTypes';

describe('disableArgTypes', () => {
  it('disables arg types in the storybook config', () => {
    // Arrange
    const props = ['hello', 'world'];

    // Act
    const result = disableArgTypes(props);

    // Assert
    expect(result).toEqual({
      hello: {
        control: {
          disable: true,
          type: {},
        },
      },
      world: {
        control: {
          disable: true,
          type: {},
        },
      },
    });
  });
});
