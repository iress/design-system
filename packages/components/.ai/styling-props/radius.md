# Radius

These are all styling props related to changing the radius of a component
affects the visual softness and perceived friendliness of the interface,
influencing the overall user experience.

## `borderRadius`

The `borderRadius` prop allows you to change the border radius of any component. It should be used sparingly, and often used when creating custom components that are not part of the design system, however you still want to retain the look and feel of the rest of the system.

```tsx
<IressInput
  borderRadius="radius.system.layout"
  px="spacing.4"
  py="spacing.2"
  placeholder="Search everything"
/>;
```

### Removing border radius

In some cases you may need to remove the border-radius to achieve design requirements. This can be done using `radius.000` or `none`.

```tsx
<IressPanel borderRadius="none" bg="alt">
  No radius here
</IressPanel>;
```

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_styling-props-radius--docs)