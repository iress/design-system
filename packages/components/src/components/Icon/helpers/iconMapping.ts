import type { MaterialSymbol } from 'material-symbols';
import type { IconName } from '@fortawesome/fontawesome-common-types';

/**
 * Maps Font Awesome icon names to Material Symbols names
 *
 * This mapping is based on actual consumer usage patterns and provides
 * semantic equivalents for common icons used in the design system.
 *
 * Naming convention differences:
 * - Font Awesome: kebab-case (e.g., 'arrow-left', 'smile-wink')
 * - Material Symbols: snake_case (e.g., 'arrow_back', 'sentiment_satisfied')
 */
export const FA_TO_MATERIAL_MAP = {
  // Status & Feedback
  check: 'check',
  times: 'close',
  'times-circle': 'cancel',
  spinner: 'progress_activity',
  'lock-alt': 'lock',
  lock: 'lock',

  // Navigation & Arrows
  'chevron-down': 'keyboard_arrow_down',
  'chevron-up': 'keyboard_arrow_up',
  'chevron-left': 'keyboard_arrow_left',
  'chevron-right': 'keyboard_arrow_right',
  'chevron-double-down': 'keyboard_double_arrow_down',
  'chevron-double-up': 'keyboard_double_arrow_up',
  'chevron-circle-down': 'expand_circle_down',
  'arrow-left': 'arrow_back',
  'arrow-right': 'arrow_forward',
  'arrow-up': 'arrow_upward',
  'arrow-down': 'arrow_downward',

  // UI Controls & Actions
  'user-circle': 'account_circle',
  'power-off': 'power_settings_new',
  'ellipsis-v': 'more_vert',
  'ellipsis-h': 'more_horiz',
  bars: 'menu',
  search: 'search',
  cog: 'settings',

  // File Types
  'file-image': 'image',
  'file-pdf': 'picture_as_pdf',
  'file-spreadsheet': 'table_chart',
  'file-word': 'description',
  file: 'drive_folder_upload',
  folder: 'folder',
  'folder-open': 'folder_open',

  // Common Icons
  home: 'home',
  trash: 'delete',
  edit: 'edit',
  pencil: 'edit',
  plus: 'add',
  minus: 'remove',
  info: 'info',
  'info-circle': 'info',
  question: 'help',
  'question-circle': 'help',
  'exclamation-triangle': 'warning',
  star: 'star',
  heart: 'favorite',
  calendar: 'calendar_today',
  clock: 'schedule',
  bell: 'notifications',
  envelope: 'mail',
  download: 'download',
  upload: 'upload',
  print: 'print',
  share: 'share',
  link: 'link',
  'external-link': 'open_in_new',

  ban: 'block',
  'info-square': 'info',
  'align-left': 'format_align_left',
  'align-center': 'format_align_center',
  'align-right': 'format_align_right',
  'align-justify': 'format_align_justify',
  eye: 'visibility',
  'spinner-third': 'progress_activity',
  'file-alt': 'draft',
  user: 'account_circle',
  'plus-circle': 'add_circle',
} satisfies Partial<Record<IconName, MaterialSymbol>>;

export type FontAwesomeIconWithMaterialEquivalent =
  keyof typeof FA_TO_MATERIAL_MAP;
