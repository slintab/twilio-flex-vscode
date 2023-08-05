import * as vscode from "vscode";
import { FlexLinkTreeDataProvider } from "./views/links/FlexLinkTreeDataProvider";
import { FlexDevelopTreeDataProvider } from "./views/develop/FlexDevelopTreeDataProvider";
import { FlexPluginTreeDataProvider } from "./views/plugins/FlexPluginTreeDataProvider";
import FlexCommand from "./commands/FlexCommand";

export function activate(context: vscode.ExtensionContext) {
  const flexCommand = new FlexCommand();
  const flexLinkProvider = new FlexLinkTreeDataProvider();
  const flexDevelopProvider = new FlexDevelopTreeDataProvider();
  const flexPluginProvider = new FlexPluginTreeDataProvider();

  vscode.window.registerTreeDataProvider("links", flexLinkProvider);

  vscode.window.registerTreeDataProvider("develop", flexDevelopProvider);

  vscode.window.registerTreeDataProvider("plugins", flexPluginProvider);

  const openAdminDashboardCommand = vscode.commands.registerCommand(
    "twilio-flex.links.dashboard",
    flexCommand.openAdminDashboard
  );
  context.subscriptions.push(openAdminDashboardCommand);

  const openDocumentationCommand = vscode.commands.registerCommand(
    "twilio-flex.links.docs",
    flexCommand.openDocumentation
  );
  context.subscriptions.push(openDocumentationCommand);

  const openConsoleCommand = vscode.commands.registerCommand(
    "twilio-flex.links.console",
    flexCommand.openConsole
  );
  context.subscriptions.push(openConsoleCommand);

  const openApiReferenceCommand = vscode.commands.registerCommand(
    "twilio-flex.links.api",
    flexCommand.openApiReference
  );
  context.subscriptions.push(openApiReferenceCommand);

  const openPluginDashboardCommand = vscode.commands.registerCommand(
    "twilio-flex.links.plugins",
    flexCommand.openPluginDashboard
  );
  context.subscriptions.push(openPluginDashboardCommand);

  const createPluginCommand = vscode.commands.registerCommand(
    "twilio-flex.plugins.create",
    flexCommand.createPlugin
  );
  context.subscriptions.push(createPluginCommand);

  const openProjectTemplateCommand = vscode.commands.registerCommand(
    "twilio-flex.plugins.template",
    flexCommand.openProjectTemplate
  );
  context.subscriptions.push(openProjectTemplateCommand);

  const deployPluginCommand = vscode.commands.registerCommand(
    "twilio-flex.plugins.deploy",
    flexCommand.deployPlugin
  );
  context.subscriptions.push(deployPluginCommand);

  const runPluginCommand = vscode.commands.registerCommand(
    "twilio-flex.plugins.run",
    flexCommand.runPlugin
  );
  context.subscriptions.push(runPluginCommand);

  const enablePluginCommand = vscode.commands.registerCommand(
    "twilio-flex.plugins.enable",
    flexCommand.enablePlugin
  );
  context.subscriptions.push(enablePluginCommand);

  const disablePluginCommand = vscode.commands.registerCommand(
    "twilio-flex.plugins.disable",
    flexCommand.disablePlugin
  );
  context.subscriptions.push(disablePluginCommand);

  const refreshPluginsCommand = vscode.commands.registerCommand(
    "twilio-flex.plugins.refresh",
    flexPluginProvider.refresh.bind(flexPluginProvider)
  );

  context.subscriptions.push(refreshPluginsCommand);
}

export function deactivate() {}
