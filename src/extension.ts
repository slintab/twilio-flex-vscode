// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { FlexLinkTreeDataProvider } from "./views/links/FlexLinkTreeDataProvider";
import {
  openAdminDashboardCommandHandler,
  openDocumentationCommandHandler,
  openConsoleCommandHandler,
} from "./commands/links";
import { FlexDevelopTreeDataProvider } from "./views/develop/FlexDevelopTreeDataProvider";
import {
  createPluginCommandHandler,
  createTemplateCommandHandler,
  deployPluginCommandHandler,
  disablePluginCommandHandler,
  enablePluginCommandHandler,
  runPluginCommandHandler,
} from "./commands/plugins";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const openAdminDashboardCommand = vscode.commands.registerCommand(
    "twilio-flex.links.dashboard",
    openAdminDashboardCommandHandler
  );
  context.subscriptions.push(openAdminDashboardCommand);

  const openDocumentationCommand = vscode.commands.registerCommand(
    "twilio-flex.links.docs",
    openDocumentationCommandHandler
  );
  context.subscriptions.push(openDocumentationCommand);

  const openConsoleCommand = vscode.commands.registerCommand(
    "twilio-flex.links.console",
    openConsoleCommandHandler
  );
  context.subscriptions.push(openConsoleCommand);

  const createPluginCommand = vscode.commands.registerCommand(
    "twilio-flex.plugins.create",
    createPluginCommandHandler
  );
  context.subscriptions.push(createPluginCommand);

  const createTemplateCommand = vscode.commands.registerCommand(
    "twilio-flex.plugins.template",
    createTemplateCommandHandler
  );
  context.subscriptions.push(createTemplateCommand);

  const deployPluginCommand = vscode.commands.registerCommand(
    "twilio-flex.plugins.deploy",
    deployPluginCommandHandler
  );
  context.subscriptions.push(deployPluginCommand);

  const runPluginCommand = vscode.commands.registerCommand(
    "twilio-flex.plugins.run",
    runPluginCommandHandler
  );
  context.subscriptions.push(runPluginCommand);

  const enablePluginCommand = vscode.commands.registerCommand(
    "twilio-flex.plugins.enable",
    enablePluginCommandHandler
  );
  context.subscriptions.push(enablePluginCommand);

  const disablePluginCommand = vscode.commands.registerCommand(
    "twilio-flex.plugins.disable",
    disablePluginCommandHandler
  );
  context.subscriptions.push(disablePluginCommand);

  vscode.window.registerTreeDataProvider(
    "links",
    new FlexLinkTreeDataProvider()
  );

  vscode.window.registerTreeDataProvider(
    "develop",
    new FlexDevelopTreeDataProvider()
  );
  vscode.window.registerTreeDataProvider(
    "develop",
    new FlexDevelopTreeDataProvider()
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
