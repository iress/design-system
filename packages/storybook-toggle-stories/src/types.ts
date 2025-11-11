export interface AddonConfig {
  /**
   * Allows you to disable the toggle stories addon conditionally.
   */
  disable?: () => boolean;
}
