import { addToStorybookCategory } from './addToStorybookCategory';

describe('addToStorybookCategory', () => {
  it('adds multiple props to a storybook category', () => {
    // Arrange
    const props = ['hello', 'world'];

    // Act
    const result = addToStorybookCategory('storybook', props);

    // Assert
    expect(result).toEqual({
      hello: {
        table: {
          category: 'storybook',
        },
      },
      world: {
        table: {
          category: 'storybook',
        },
      },
    });
  });
});
