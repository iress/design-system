/**
 * ESLint rule: require-story-meta
 *
 * Enforces that primary component/pattern story files include:
 * - idsConfig.testMeta in parameters (for test selector tables)
 * - docs.description.component in parameters (for autodocs and AI docs)
 * - stylingProps in argTypes (for Storybook controls)
 *
 * These can be provided via componentStoryMeta() or manually.
 */

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require testMeta, description, and stylingProps in primary story meta',
    },
    messages: {
      missingTestMeta:
        'Primary story meta must include `parameters.idsConfig.testMeta` (via componentStoryMeta() or manual). This enables the AI docs pipeline to generate test selector tables.',
      missingDescription:
        'Primary story meta must include `parameters.docs.description.component` (via componentStoryMeta() or manual). This provides the component description for autodocs and AI docs.',
      missingStylingProps:
        'Primary story meta must include `stylingProps` in argTypes (via componentStoryMeta() or spread). This documents available styling props in Storybook controls.',
    },
    schema: [],
  },
  create(context) {
    return {
      ExportDefaultDeclaration(node) {
        const declaration = node.declaration;

        // Handle both `export default { ... }` and `export default { ... } satisfies Meta`
        let metaObject = declaration;
        if (declaration.type === 'TSSatisfiesExpression') {
          metaObject = declaration.expression;
        }
        if (declaration.type === 'TSAsExpression') {
          metaObject = declaration.expression;
        }

        if (metaObject.type !== 'ObjectExpression') return;

        const properties = metaObject.properties;

        // Check if componentStoryMeta() is spread — if so, all three are satisfied
        const hasComponentStoryMeta = properties.some(
          (p) =>
            p.type === 'SpreadElement' &&
            p.argument.type === 'CallExpression' &&
            p.argument.callee.type === 'Identifier' &&
            p.argument.callee.name === 'componentStoryMeta',
        );

        if (hasComponentStoryMeta) return; // All requirements are met

        // Check testMeta
        const parametersProperty = properties.find(
          (p) =>
            p.type === 'Property' &&
            p.key.type === 'Identifier' &&
            p.key.name === 'parameters',
        );

        let hasTestMeta = false;
        let hasDescription = false;

        if (
          parametersProperty &&
          parametersProperty.value.type === 'ObjectExpression'
        ) {
          const params = parametersProperty.value.properties;

          // Check for idsConfig.testMeta
          const idsConfigProp = params.find(
            (p) =>
              p.type === 'Property' &&
              p.key.type === 'Identifier' &&
              p.key.name === 'idsConfig',
          );
          if (
            idsConfigProp &&
            idsConfigProp.value.type === 'ObjectExpression'
          ) {
            hasTestMeta = idsConfigProp.value.properties.some(
              (p) =>
                p.type === 'Property' &&
                p.key.type === 'Identifier' &&
                p.key.name === 'testMeta',
            );
          }

          // Check for docs.description.component
          const docsProp = params.find(
            (p) =>
              p.type === 'Property' &&
              p.key.type === 'Identifier' &&
              p.key.name === 'docs',
          );
          if (docsProp && docsProp.value.type === 'ObjectExpression') {
            const descProp = docsProp.value.properties.find(
              (p) =>
                p.type === 'Property' &&
                p.key.type === 'Identifier' &&
                p.key.name === 'description',
            );
            if (descProp && descProp.value.type === 'ObjectExpression') {
              hasDescription = descProp.value.properties.some(
                (p) =>
                  p.type === 'Property' &&
                  p.key.type === 'Identifier' &&
                  p.key.name === 'component',
              );
            }
          }
        }

        // Check stylingProps in argTypes
        let hasStylingProps = false;
        const argTypesProperty = properties.find(
          (p) =>
            p.type === 'Property' &&
            p.key.type === 'Identifier' &&
            p.key.name === 'argTypes',
        );

        if (
          argTypesProperty &&
          argTypesProperty.value.type === 'ObjectExpression'
        ) {
          hasStylingProps = argTypesProperty.value.properties.some(
            (p) =>
              p.type === 'SpreadElement' &&
              ((p.argument.type === 'Identifier' &&
                p.argument.name === 'stylingProps') ||
                (p.argument.type === 'CallExpression' &&
                  p.argument.callee.type === 'Identifier' &&
                  p.argument.callee.name === 'stylingProps')),
          );
        }

        if (!hasTestMeta) {
          context.report({ node, messageId: 'missingTestMeta' });
        }
        if (!hasDescription) {
          context.report({ node, messageId: 'missingDescription' });
        }
        if (!hasStylingProps) {
          context.report({ node, messageId: 'missingStylingProps' });
        }
      },
    };
  },
};
