import { ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";

export interface FlexDevelopTreeItem {
  label: string;
  command: Command;
  iconPath: ThemeIcon;
}

interface Command {
  title: string;
  command: string;
}

export class FlexDevelopTreeItem extends TreeItem {
  constructor(label: string, command: string, iconPath: ThemeIcon) {
    super(label, TreeItemCollapsibleState.None);
    this.label = label;
    this.command = { title: command, command: command };
    this.iconPath = iconPath;
  }
}

export default FlexDevelopTreeItem;
