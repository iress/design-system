import { focusableElements } from './focusableElements';

describe('focusableElements', () => {
  it('returns an empty array if element has no children', () => {
    const div = document.createElement('div');

    const elements = focusableElements(div);

    expect(elements).toHaveLength(0);
  });

  it('returns an array with only focusable elements', () => {
    const div = document.createElement('div');
    div.innerHTML = [
      '<button>Button</button>',
      '<a href="#">Link</a>',
      '<input type="text" value="Input" />',
      '<select><option>Select</option></select>',
      '<textarea>Textarea</textarea>',
      '<div tabindex="0">Tabindex</div>',
    ].join('\n');

    const elements = focusableElements(div);

    expect(elements).toHaveLength(6);
  });

  it('returns an empty array if no focusable elements found', () => {
    const div = document.createElement('div');
    div.innerHTML = [
      '<div>Div</div>',
      '<section>Section</section>',
      '<nav>Nav</nav>',
    ].join('\n');

    const elements = focusableElements(div);

    expect(elements).toHaveLength(0);
  });

  it('returns only focusable elements for mixed children', () => {
    const div = document.createElement('div');
    div.innerHTML = [
      '<a href="#">Link</a>',
      '<div>Div</div>',
      '<select><option>Select</option></select>',
      '<section>Section</section>',
      '<nav>Nav</nav>',
      '<div><div><div tabindex="0">Nested Tabindex</div><div tabindex="0">Nested Tabindex</div></div></div>',
    ].join('\n');

    const elements = focusableElements(div);

    expect(elements).toHaveLength(4);
  });
});
