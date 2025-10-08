---
name: New component proposal
about: Suggest a new Design system component
title: ''
labels: ''
assignees: ''
---

This template is designed to help us define components before we start developing them. The proposal can start off with basic name and description, but through collaboration & cross-functional representation build up to be a full specification.

If you are proposing a component, you can simply fill in the **Proposal outline** section.

## Proposal outline

### Component name

> `<iress-field>`, `<iress-input>`, etc.

...

### Component description

> Please write a short description (try and keep to two sentences).
> {Component name} are used to {x}. It helps our users {x} by {x}.

...

### Examples of usage

> This gives us an idea of whether it is suitable for our Design System, or if it's specific to your product.
> Remeber the adage - once is unique, twice is a coincidence, thrice is a Design System component!
> Add images if it helps.

...

## Usability best practices

> An area to list any potential usability issues or links to research/documents.
> To primarily be filled in by designers with support from the cross-functional team.

...

## Accessibility considerations

> An area to list any potential accessibility issues or links to research/documents.
> To primarily be filled in by engineers with support from the cross-functional team.

...

---

## Technical specification

> To primarily be filled in by engineers with support from the cross-functional team.

### Dependencies

> Outline if this component is a dependency of or depends on another component. Include a link to the required component and a short explanation of how they interact.

...

### Props

> List props and type declarations. No need to list `id` and `class` as these will always be applied to any component that renders to the DOM.

| propName | required or optional | type               | default | description         |
| -------- | -------------------- | ------------------ | ------- | ------------------- |
| showFoo  | optional             | boolean            | false   | Show or hide foo    |
| items    | optional             | `ItemDescriptor[]` |         | Collection of items |
| xxx      |                      |                    |         |                     |

...

### Web component

> As web components can only accept strings as props (not objects, arrays or functions) the API can be different from the framework-specific wrapper component.

#### Props

> List props and type declarations. No need to list `id` and `class` as these will always be applied to any component that renders to the DOM.

| propName | required or optional | type               | default | description         |
| -------- | -------------------- | ------------------ | ------- | ------------------- |
| showFoo  | optional             | boolean            | false   | Show or hide foo    |
| items    | optional             | `ItemDescriptor[]` |         | Collection of items |
| xxx      |                      |                    |         |                     |

#### Custom Events

> List events required. Please refer to our [Coding Standards](https://archive.design.aws-wmcore-production-au.iress.online/?path=/story/contributing-coding-standards--page).

| eventName       | detail                                        | description                |
| --------------- | --------------------------------------------- | -------------------------- |
| iressTabChanged | new current tab ID, TabContainer component ID | Emitted when a tab changes |
| onXxx           |                                               |                            |
| onXxx           |                                               |                            |

#### Slots

> List slots required. Please refer to our [Coding Standards](https://archive.design.aws-wmcore-production-au.iress.online/?path=/story/contributing-coding-standards--page).

| slot name     | description                                     |
| ------------- | ----------------------------------------------- |
| default       |                                                 |
| form-controls | A space for buttons and any other form controls |
| xxx           |                                                 |

#### Migration differences

> If the component exists in the current architecture, outline any differences that may need to be taken into account during migration.

...
