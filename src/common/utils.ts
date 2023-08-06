import * as cp from "child_process";
import degit = require("degit");

export async function runCommand(cmd: string, path?: string) {
  const options = path ? { cwd: path } : undefined;

  try {
    const result = cp.execSync(cmd, options);
    return result.toString();
  } catch (e) {
    console.error(`Error executing command ${cmd}:`, e);
  }

  return false;
}

export function extractPlugins(text: string) {
  const result = [];
  const regex = /│ SID: (.+)\n│ Friendly Name: (.+)\n/g;
  const matches = text.match(regex);

  if (!matches) {
    return [];
  }

  for (const match of matches) {
    const pluginMatches = /│ SID: (.+)\n│ Friendly Name: (.+)\n/.exec(match);

    if (!pluginMatches) {
      return [];
    }

    result.push({ sid: pluginMatches[1], friendlyName: pluginMatches[2] });
  }
  return result;
}

export async function downloadRepository(slug: string, path: string) {
  try {
    const repository = degit(slug);
    await repository.clone(path);
    return true;
  } catch (e) {
    console.error(`Error downloading repository ${slug} to ${path}: `, e);
  }
  return false;
}
