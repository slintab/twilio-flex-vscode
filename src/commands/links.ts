import * as vscode from "vscode";

export function openAdminDashboardCommandHandler() {
  vscode.env.openExternal(vscode.Uri.parse("https://flex.twilio.com/admin/"));
}

export function openDocumentationCommandHandler() {
  vscode.env.openExternal(vscode.Uri.parse("https://www.twilio.com/docs/flex"));
}

export function openConsoleCommandHandler() {
  vscode.env.openExternal(vscode.Uri.parse("https://console.twilio.com"));
}
