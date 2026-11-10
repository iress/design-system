# Z-index (stacking)

The z-index determines the stacking order of elements. Elements with a higher z-index always sit in front of elements with a lower z-index. Each index has been mapped to the appropriate elevation(s).

| Name | Usage | Value |
|------|-------|-------|
| `DEFAULT` | The default z-index used for most elements. Can be combined with raised and floating elevations. | 0 |
| `NAVBAR` | Used for navbars. Can be combined with overflow elevation. | 100 |
| `POPOVER` | Used for IressPopover. Can be combined with floating elevation. | 200 |
| `SLIDEOUT` | Used for IressSlideout. Can be combined with floating elevation. | 300 |
| `MODAL` | Used for IressModal. Can be combined with floating elevation. | 400 |
| `TOAST` | Used for IressToast. Can be combined with floating elevation. | 500 |
| `TOOLTIP` | Used for IressTooltip. Can be combined with floating elevation. | 600 |

---

## For developers

If you are using the IDS components, the z-indexes have already been mapped out to their respective components based on the usage above. They are hardcoded into the components, so you don't need to worry about them.

The mapping is exported as `Z_INDEX` from the `@iress-oss/ids-components` package, in case you need to reference it in your own code.