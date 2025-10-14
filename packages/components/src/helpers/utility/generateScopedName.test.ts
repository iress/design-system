import { CSS_IDS_VERSION } from '../../constants';
import { generateScopedName } from './generateScopedName';

describe('generateScopedName', () => {
  it(`converts a class and filename to a IDS scoped class name`, () => {
    expect(
      generateScopedName(
        'myComponent',
        'some/random/folder/MyComponent.module.scss',
      ),
    ).toEqual(`ids-my-component-${CSS_IDS_VERSION}`);
    expect(
      generateScopedName(
        'className',
        'some/random/folder/MyComponent.module.scss',
      ),
    ).toEqual(`ids-my-component--class-name-${CSS_IDS_VERSION}`);
  });

  it(`removes the component if styling a nested component (eg. host-context)`, () => {
    expect(
      generateScopedName(
        'ids-nested-component',
        'some/random/folder/MyComponent.module.scss',
      ),
    ).toEqual(`ids-nested-component-${CSS_IDS_VERSION}`);
    expect(
      generateScopedName(
        'ids-nested-component--className',
        'some/random/folder/MyComponent.module.scss',
      ),
    ).toEqual(`ids-nested-component--class-name-${CSS_IDS_VERSION}`);
  });
});
