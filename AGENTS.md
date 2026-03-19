# Agent Notes

## Troubleshooting

### Yarn 403 (Forbidden) errors from Artifactory

Artifactory enforces a 14-day age gate on new package versions. When Yarn resolves caret ranges (e.g. `^8.56.1`) to a version published within the last 14 days, Artifactory returns a `403 Forbidden` — even if you are authenticated.

**Fix:** Pin the affected packages to exact versions that are past the 14-day window:

```bash
yarn up <package>@<older-version>
```

For example:

```bash
yarn up @typescript-eslint/eslint-plugin@8.56.1 @typescript-eslint/parser@8.56.1 eslint-plugin-sonarjs@4.0.0 lint-staged@16.3.1
```

This removes the `^` caret from `package.json` and locks to a known-good version. You can restore caret ranges once the newer versions are past the 14-day window.
