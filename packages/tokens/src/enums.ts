export enum Type {
  /** string (usually a HEX code) */
  Color = 'color',

  /** number (usually a REM value) */
  Dimension = 'dimension',

  /** string (font family name, multiple separate by comma for priority) */
  FontFamily = 'fontFamily',

  /** string (usually a REM value) */
  FontSize = 'fontSize',

  /** Composite token: CompositeValue['background'] */
  Background = 'background',

  /** Composite token: CompositeValue['border'] */
  Border = 'border',

  /** Composite token: CompositeValue['radius'] */
  Radius = 'radius',

  /** Composite token: CompositeValue['shadow'] */
  Shadow = 'shadow',

  /** Composite token: CompositeValue['typography'] */
  Typography = 'typography',
}
