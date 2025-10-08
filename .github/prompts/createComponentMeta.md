## mode: agent

# Component Meta Prompt

You are an expert in the Iress Design System. You will be provided with a SVG file. Your task is to generate a meta description for the component or pattern based on the name of the SVG file.

- The SVG files are located in either:
  - `.github/prompts/component-thumbnails` directory for components
  - `.github/prompts/pattern-thumbnails` directory for patterns
- You should map the SVG file name to the component/pattern name in the Iress Design System.
- For components: The meta should be located in the `packages/components/src/components/${componentName}/meta/index.tsx` file.
- For patterns: The meta should be located in the `packages/components/src/patterns/${patternName}/meta/index.tsx` file.
- The meta should be in the format of a JavaScript object with the following properties:
  - `heading`: The name of the component or pattern.
  - `href`: The storybook URL for the component/pattern, formatted as:
    - For components: `/?path=/docs/components-${componentName.toLowerCase()}--docs`
    - For patterns: `/?path=/docs/patterns-${patternName.toLowerCase()}--docs`
- The component/pattern name is derived from the SVG file name by removing the `.svg` extension and converting the name to PascalCase.
- Inside the meta folder, you will copy the SVG contents to a file named `Thumbnail.tsx` and convert it to a React component.
  - The component should be exported as the default export from the `Thumbnail.tsx` file.
  - The component should be a functional component that returns the SVG content wrapped in a `<svg>` tag.
  - For components: The component should be named `Thumbnail` and should be placed in the `packages/components/src/components/${componentName}/meta/Thumbnail.tsx` file.
  - For patterns: The component should be named `Thumbnail` and should be placed in the `packages/components/src/patterns/${patternName}/meta/Thumbnail.tsx` file.
  - The component should be imported in the `index.ts` file using the lazy import syntax, and defined as `Thumbnail` in the meta object
  - In the Thumbnail component you should replace the following strings:
    - Remove the width and height attributes from the `<svg>` tag.
    - Add `className={image()}` to the `<svg>` tag, imported from `@/components/Image`
    - `fill="white"` should be replaced with `style={{ fill: cssVars.colour.neutral[10] }}` in the entire file
    - `stroke="white"` should be replaced with `style={{ stroke: cssVars.colour.neutral[10] }}` in the entire file
    - `fill="#F9F9F9"` should be replaced with `style={{ fill: cssVars.colour.neutral[20] }}` in the entire file
    - `stroke="#F9F9F9"` should be replaced with `style={{ stroke: cssVars.colour.neutral[20] }}` in the entire file
    - `fill="#D9D9D9"` should be replaced with `style={{ fill: cssVars.colour.neutral[50] }}` in the entire file
    - `stroke="#D9D9D9"` should be replaced with `style={{ stroke: cssVars.colour.neutral[50] }}` in the entire file
    - `fill="#6D7278"` should be replaced with `style={{ fill: cssVars.colour.neutral[70] }}` in the entire file
    - `stroke="#6D7278"` should be replaced with `style={{ stroke: cssVars.colour.neutral[70] }}` in the entire file
    - `fill="#393F46"` should be replaced with `style={{ fill: cssVars.colour.neutral[80] }}` in the entire file
    - `stroke="#393F46"` should be replaced with `style={{ stroke: cssVars.colour.neutral[80] }}` in the entire file
    - `fill="#E4E5E7"` should be replaced with `style={{ fill: cssVars.colour.neutral[30] }}` in the entire file
    - `stroke="#E4E5E7"` should be replaced with `style={{ stroke: cssVars.colour.neutral[30] }}` in the entire file
    - `fill="#D7D8DA"` should be replaced with `style={{ fill: cssVars.colour.neutral[40] }}` in the entire file
    - `stroke="#D7D8DA"` should be replaced with `style={{ stroke: cssVars.colour.neutral[40] }}` in the entire file
    - `fill="#ECF2FF"` should be replaced with `style={{ fill: cssVars.colour.primary.surface }}` in the entire file
    - `stroke="#ECF2FF"` should be replaced with `style={{ stroke: cssVars.colour.primary.surface }}` in the entire file
    - `fill="#13213F"` should be replaced with `style={{ fill: cssVars.colour.primary.text }}` in the entire file
    - `stroke="#13213F"` should be replaced with `style={{ stroke: cssVars.colour.primary.text }}` in the entire file
- An example of the `meta/` folder can be found in the `packages/components/src/components/Alert/meta`.
- Fix all linting errors in the `Thumbnail.tsx` file.
- For components: Import the `meta/index.tsx` file in the `packages/components/src/components/010-Introduction.tsx` file and add the component to the `components` array.
- For patterns: Import the `meta/index.tsx` file in the `packages/components/src/patterns/010-Introduction.tsx` file and add the pattern to the `patterns` array.
