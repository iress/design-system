/**
 * --skills subcommand
 * Translates skills from .agents/skills/ to package .ai/skills/ directories.
 */

import { translateSkillsImpl } from './helpers/translate-skills';

export async function translateSkills() {
  await translateSkillsImpl();
}
