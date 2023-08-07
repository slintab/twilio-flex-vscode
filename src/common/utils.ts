import * as cp from "child_process";
import degit = require("degit");
import { window, Uri, workspace, env } from "vscode";

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

export async function openLink(link: string) {
  return env.openExternal(Uri.parse(link));
}

export async function selectPluginLanguage() {
  const language = await window.showQuickPick(
    [
      {
        label: "JavaScript",
        description: "Create new plugin using JavaScript",
      },
      {
        label: "TypeScript",
        description: "Create new plugin using TypeScript",
      },
    ],
    {
      placeHolder: "Choose the language for developing the plugin",
      canPickMany: false,
    }
  );

  return language;
}

export async function getPluginName() {
  const validationRegex = /^[a-zA-Z0-9_-]+$/;
  const inValidNameMsg =
    "The plugin name can only contain alphanumerical characters, underscores and hyphens.";
  const validationFunc = (name: string) =>
    validationRegex.test(name) ? null : inValidNameMsg;

  const name = await window.showInputBox({
    title: "Create plugin",
    placeHolder: "Enter the name of the plugin",
    validateInput: validationFunc,
  });

  return name;
}

export async function getDestinationFolder() {
  const destination = await window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: false,
    canSelectMany: false,
    defaultUri: workspace.workspaceFolders
      ? workspace.workspaceFolders[0].uri
      : undefined,
    openLabel: "Select folder",
  });

  return destination?.[0].path;
}

export async function getDeploymentDescription() {
  const description = await window.showInputBox({
    title: "Deploy plugin",
    placeHolder:
      "Enter a description for the deployment (e.g. features added/removed).",
  });

  return description;
}

export function getTerminal(command: string) {
  const terminals = window.terminals;

  const serverTerminals = terminals.filter((t) => {
    return t.name === "server";
  });
  const otherTerminals = terminals.filter((t) => {
    return t.name !== "server";
  });

  if (command === "start") {
    return serverTerminals.length
      ? serverTerminals[0]
      : window.createTerminal("server");
  }

  return otherTerminals.length ? otherTerminals[0] : window.createTerminal();
}
