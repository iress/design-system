export interface AddonConfig {
  /**
   * The environment to display with the badge.
   * If a function is provided, it will be called to get the environment string (you can use this to fetch the environment dynamically).
   */
  environment?: string | (() => Promise<string> | string);

  /**
   * The version to display in the badge.
   * If a function is provided, it will be called to get the version string (you can use this to fetch the version dynamically).
   */
  version?: string | (() => Promise<string> | string);
}
