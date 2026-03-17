import { describe, it, expect } from 'vitest';
import { staticCssStripHook } from './staticCssStripHook';

describe('staticCssStripHook', () => {
  it('ignores non-styles.css artifacts', () => {
    const result = staticCssStripHook(
      'tokens',
      '.gap_spacing\\.2{gap:var(--spacing-spacing\\.2)}',
    );
    expect(result).toBeUndefined();
  });

  describe('spacing utility classes', () => {
    it('strips canonical spacing classes', () => {
      const css =
        '.gap_spacing\\.2{gap:var(--spacing-spacing\\.2)}' +
        '.p_spacing\\.3{padding:var(--spacing-spacing\\.3)}' +
        '.m_spacing\\.0{margin:var(--spacing-spacing\\.0)}' +
        '.cursor_pointer{cursor:pointer}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.gap_spacing');
      expect(result).not.toContain('.p_spacing');
      expect(result).not.toContain('.m_spacing');
      expect(result).toContain('.cursor_pointer{cursor:pointer}');
    });

    it('strips breakpoint-prefixed responsive spacing classes', () => {
      const css =
        '.xs\\:gap_spacing\\.0{gap:var(--spacing-spacing\\.0)}' +
        '.md\\:mt_spacing\\.2{margin-top:var(--spacing-spacing\\.2)}' +
        '.unrelated_class{color:red}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.xs\\:gap_spacing');
      expect(result).not.toContain('.md\\:mt_spacing');
      expect(result).toContain('.unrelated_class{color:red}');
    });

    it('strips negative margin spacing classes', () => {
      const css =
        '.my_-spacing\\.2{margin-block:calc(var(--spacing-spacing\\.2) * -1)}' +
        '.mt_-spacing\\.1{margin-top:calc(var(--spacing-spacing\\.1) * -1)}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.my_-spacing');
      expect(result).not.toContain('.mt_-spacing');
    });

    it('strips spacing classes for all common shorthand properties', () => {
      const prefixes = [
        'gap',
        'cg',
        'rg',
        'm',
        'mt',
        'mb',
        'ml',
        'mr',
        'mx',
        'my',
        'p',
        'pt',
        'pb',
        'pl',
        'pr',
        'px',
        'py',
      ];
      const css = prefixes
        .map((p) => `.${p}_spacing\\.2{${p}:var(--spacing-spacing\\.2)}`)
        .join('');

      const result = staticCssStripHook('styles.css', css);
      for (const prefix of prefixes) {
        expect(result).not.toContain(`.${prefix}_spacing`);
      }
    });
  });

  describe('textStyle utility classes', () => {
    it('strips basic textStyle classes', () => {
      const css =
        '.textStyle_typography\\.body\\.md{font:var(--iress-typography-body-md)}' +
        '.other_class{color:red}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.textStyle_typography');
      expect(result).toContain('.other_class{color:red}');
    });

    it('strips multi-selector textStyle rules with descendant combinators', () => {
      const css =
        '.textStyle_typography\\.body\\.md strong:not([class]),.textStyle_typography\\.body\\.md:is(strong){font:var(--x)}' +
        '.cursor_pointer{cursor:pointer}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.textStyle_typography');
      expect(result).toContain('.cursor_pointer{cursor:pointer}');
    });
  });

  describe('custom IDS utility classes', () => {
    it('strips focusable utility classes including pseudo-selectors', () => {
      const css =
        '.focusable_true:focus-visible{outline:none;box-shadow:0 0 0 2px blue}' +
        '.focusable_label-after:focus-visible+label{box-shadow:0 0 0 2px blue}' +
        '.other_class{color:red}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.focusable_true');
      expect(result).not.toContain('.focusable_label-after');
      expect(result).toContain('.other_class{color:red}');
    });

    it('strips span utility classes', () => {
      const css =
        '.span_auto{flex-grow:1;flex-shrink:0;flex-basis:0}' +
        '.span_6{flex-basis:50%}' +
        '.not_a_span_class{color:red}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.span_auto');
      expect(result).not.toContain('.span_6');
      expect(result).toContain('.not_a_span_class{color:red}');
    });

    it('strips breakpoint-prefixed span utility classes', () => {
      const css =
        '.xs\\:span_6{flex-basis:50%}' +
        '.md\\:span_auto{flex-grow:1;flex-shrink:0;flex-basis:0}' +
        '.unrelated{color:red}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.xs\\:span_6');
      expect(result).not.toContain('.md\\:span_auto');
      expect(result).toContain('.unrelated{color:red}');
    });

    it('strips offset utility classes', () => {
      const css =
        '.offset_3{margin-left:calc(3 / 12 * 100%)}' +
        '.offset_6{margin-left:50%}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.offset_3');
      expect(result).not.toContain('.offset_6');
    });

    it('strips breakpoint-prefixed offset utility classes', () => {
      const css =
        '.md\\:offset_3{margin-left:calc(3 / 12 * 100%)}' +
        '.lg\\:offset_6{margin-left:50%}' +
        '.unrelated{color:red}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.md\\:offset_3');
      expect(result).not.toContain('.lg\\:offset_6');
      expect(result).toContain('.unrelated{color:red}');
    });

    it('strips gutter utility classes', () => {
      const css =
        '.gutter_spacing\\.4{--col-gap:var(--iress-spacing-4);margin-inline:calc(-1 * var(--col-gap) / 2)}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.gutter_spacing');
    });

    it('strips noGutter utility classes including child combinator selectors', () => {
      const css =
        '.noGutter_true>:last-child{margin-block-end:0px}' +
        '.other{display:block}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.noGutter_true');
      expect(result).toContain('.other{display:block}');
    });

    it('strips scrollable utility classes including webkit scrollbar pseudo-elements', () => {
      const css =
        '.scrollable_y{overflow-y:auto}' +
        '.scrollable_y::-webkit-scrollbar{width:1rem}' +
        '.scrollable_x{overflow-x:auto}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.scrollable_y');
      expect(result).not.toContain('.scrollable_x');
    });

    it('strips stretch utility classes', () => {
      const css = '.stretch_true{align-self:stretch;flex:1;height:100%}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.stretch_true');
    });

    it('strips flexHorizontalAlign (fha) utility classes', () => {
      const css =
        '.fha_around:where([data-flex-dir=row],:not([data-flex-dir])){justify-content:space-around}' +
        '.fha_center:where([data-flex-dir=column]){align-items:center}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.fha_around');
      expect(result).not.toContain('.fha_center');
    });

    it('strips flexVerticalAlign (fva) utility classes', () => {
      const css =
        '.fva_top:where([data-flex-dir=row],:not([data-flex-dir])){align-items:flex-start}' +
        '.fva_middle:where([data-flex-dir=column]){justify-content:center}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.fva_top');
      expect(result).not.toContain('.fva_middle');
    });
  });

  describe('srOnly (sr) utility classes', () => {
    it('strips sr utility classes', () => {
      const css =
        '.sr_true{position:absolute;width:1px;height:1px}' +
        '.sr_false{position:static;width:auto}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.sr_true{');
      expect(result).not.toContain('.sr_false{');
    });

    it('strips breakpoint-prefixed sr utility classes', () => {
      const css =
        '.xs\\:sr_true{position:absolute;width:1px;height:1px}' +
        '.md\\:sr_false{position:static;width:auto}' +
        '.unrelated{color:red}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.xs\\:sr_true');
      expect(result).not.toContain('.md\\:sr_false');
      expect(result).toContain('.unrelated{color:red}');
    });

    it('preserves rules that reference .sr_true inside :not() pseudo-class', () => {
      // The nestedFormLabels condition in IDS uses :not(.sr_true) to target
      // visible form labels. Stripping this rule would break form label styling.
      const css =
        '.nestedFormLabels\\:c_colour\\.neutral\\.70 .iress-form-label:not(.sr_true){color:red}' +
        '.sr_true{position:absolute;width:1px}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).toContain(':not(.sr_true)');
      expect(result).not.toContain('.sr_true{');
    });
  });

  describe('responsive visibility (hideBelow / hideFrom) utility classes', () => {
    it('strips hide_* breakpoint classes', () => {
      const css =
        '.hide_xs{display:none}' +
        '.hide_sm{display:none}' +
        '.hide_md{display:none}' +
        '.hide_lg{display:none}' +
        '.hide_xl{display:none}' +
        '.hide_xxl{display:none}' +
        '.other{color:red}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.hide_xs');
      expect(result).not.toContain('.hide_sm');
      expect(result).not.toContain('.hide_md');
      expect(result).not.toContain('.hide_lg');
      expect(result).not.toContain('.hide_xl');
      expect(result).not.toContain('.hide_xxl');
      expect(result).toContain('.other{color:red}');
    });

    it('does not strip hide_ classes with non-breakpoint values', () => {
      const css = '.hide_custom-value{display:none}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).toContain('.hide_custom-value{display:none}');
    });
  });

  describe('IDS colour token utility classes', () => {
    it('strips bg_colour.* utility classes', () => {
      const css =
        '.bg_colour\\.system\\.danger\\.fill{background:var(--colors-colour\\.system\\.danger\\.fill)}' +
        '.bg_colour\\.neutral\\.10{background:var(--colors-colour\\.neutral\\.10)}' +
        '.bg_custom-color{background:hotpink}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.bg_colour');
      expect(result).toContain('.bg_custom-color{background:hotpink}');
    });

    it('strips c_colour.* utility classes', () => {
      const css =
        '.c_colour\\.neutral\\.80{color:var(--colors-colour\\.neutral\\.80)}' +
        '.c_red{color:red}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.c_colour');
      expect(result).toContain('.c_red{color:red}');
    });

    it('strips rounded_radius.* utility classes', () => {
      const css =
        '.rounded_radius\\.system\\.form{border-radius:var(--iress-radius-system-form)}' +
        '.rounded_lg{border-radius:1rem}';

      const result = staticCssStripHook('styles.css', css);
      expect(result).not.toContain('.rounded_radius');
      expect(result).toContain('.rounded_lg{border-radius:1rem}');
    });
  });

  it('handles an empty CSS string', () => {
    const result = staticCssStripHook('styles.css', '');
    expect(result).toBe('');
  });

  it('preserves unrelated utility classes', () => {
    const css =
      '.cursor_pointer{cursor:pointer}' +
      '.d_flex{display:flex}' +
      '.text_red{color:red}' +
      '.some-component_active{background:blue}';

    const result = staticCssStripHook('styles.css', css);
    expect(result).toBe(css);
  });
});
