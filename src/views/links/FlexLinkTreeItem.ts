import { ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";

export interface FlexLinkTreeItem {
  label: string;
  command: Command;
}

interface Command {
  title: string;
  command: string;
}

export class FlexLinkTreeItem extends TreeItem {
  constructor(label: string, command: string) {
    super(label, TreeItemCollapsibleState.None);
    this.label = label;
    this.command = { title: command, command: command };
    this.iconPath = new ThemeIcon("link-external");
  }
}

export default FlexLinkTreeItem;
