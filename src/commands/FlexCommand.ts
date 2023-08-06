import {
  window,
  ProgressLocation,
  commands,
  Uri,
  workspace,
  env,
} from "vscode";
import { resolve } from "path";
import { downloadRepository, runCommand } from "../common/utils";

const FLEX_PROJECT_TEMPLATE_SLUG =
  "twilio-professional-services/flex-project-template";

class FlexCommand {
  async openDocumentation() {
    await openLink("https://www.twilio.com/docs/flex/");
  }

  async openApiReference() {
    await openLink(
      "https://assets.flex.twilio.com/docs/releases/flex-ui/2.3.3/"
    );
  }

  async openConsole() {
    await openLink("https://console.twilio.com");
  }

  async openAdminDashboard() {
    await openLink("https://flex.twilio.com/admin/");
  }

  async openPluginDashboard() {
    await openLink("https://flex.twilio.com/admin/plugins/");
  }

  async createPlugin() {
    const pluginLanguage = await selectPluginLanguage();
    if (!pluginLanguage) {
      return;
    }

    const pluginName = await getPluginName();
    if (!pluginName) {
      return;
    }

    const destinationFolder = await getDestinationFolder();
    if (!destinationFolder) {
      return;
    }

    const destination = resolve(destinationFolder, pluginName);
    const createPluginCmd = `twilio flex:plugins:create ${pluginName} --flexui2 ${
      pluginLanguage.label === "TypeScript" ? "--typescript" : ""
    }`;

    const result = await window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Creating new plugin...",
        cancellable: false,
      },
      () => {
        return runCommand(createPluginCmd, destinationFolder);
      }
    );

    if (!result) {
      window.showErrorMessage(`Error creating plugin ${pluginName}.`);
      return;
    }

    await commands.executeCommand("vscode.openFolder", Uri.file(destination), {
      forceNewWindow: false,
    });
  }

  async openProjectTemplate() {
    const name = "flex-project-template";

    const destinationFolder = await getDestinationFolder();
    if (!destinationFolder) {
      return;
    }

    const destination = resolve(destinationFolder, name);

    const result = await window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Downloading project template...",
        cancellable: false,
      },
      (progress, token) => {
        return downloadRepository(FLEX_PROJECT_TEMPLATE_SLUG, destination);
      }
    );

    if (!result) {
      window.showErrorMessage(`Error downloading project template.`);
      return;
    }

    await commands.executeCommand("vscode.openFolder", Uri.file(destination), {
      forceNewWindow: false,
    });
  }

  async deployPlugin() {
    const description = await getDeploymentDescription();
    const deployPluginCmd = `twilio flex:plugins:deploy --changelog "${description}"`;
    const installDepsCmd = "npm install";
    const terminal = getTerminal("deploy");

    terminal.show();
    terminal.sendText(installDepsCmd);
    terminal.sendText(deployPluginCmd);

    window.showInformationMessage(
      "Deployment started. Check terminal for progress."
    );
  }

  async runPlugin() {
    const terminal = getTerminal("start");
    const runPluginCmd = "twilio flex:plugins:start";
    const installDepsCmd = "npm install";

    terminal.show();
    terminal.sendText(installDepsCmd);
    terminal.sendText(runPluginCmd);

    window.showInformationMessage(
      "Plugin started. Check terminal for details."
    );
  }

  async enablePlugin(payload: { label: string }) {
    const { label } = payload;
    const enablePluginCmd = `twilio flex:plugins:release --plugin ${label}@latest --description "${label} enabled from VSCode"`;

    const result = await window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Enabling plugin...",
        cancellable: false,
      },
      (progress, token) => {
        return runCommand(enablePluginCmd);
      }
    );

    if (!result) {
      window.showErrorMessage(`Error enabling plugin ${label}.`);
      return;
    }

    window.showInformationMessage(`Plugin ${label} has been enabled.`);
    await commands.executeCommand("twilio-flex.plugins.refresh");
  }

  async disablePlugin(payload: { label: string }) {
    const { label } = payload;
    const disablePluginCmd = `twilio flex:plugins:release --disable-plugin ${label} --description "${label} disabled from VSCode"`;

    const result = await window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Disabling plugin...",
        cancellable: false,
      },
      (progress, token) => {
        return runCommand(disablePluginCmd);
      }
    );

    if (!result) {
      window.showErrorMessage(`Error disabling plugin ${label}.`);
      return;
    }

    window.showInformationMessage(`Plugin ${label} has been disabled.`);
    await commands.executeCommand("twilio-flex.plugins.refresh");
  }
}

async function openLink(link: string) {
  return env.openExternal(Uri.parse(link));
}

async function selectPluginLanguage() {
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

async function getPluginName() {
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

async function getDestinationFolder() {
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

async function getDeploymentDescription() {
  const description = await window.showInputBox({
    title: "Deploy plugin",
    placeHolder:
      "Enter a description for the deployment (e.g. features added/removed).",
  });

  return description;
}

function getTerminal(command: string) {
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

export default FlexCommand;
