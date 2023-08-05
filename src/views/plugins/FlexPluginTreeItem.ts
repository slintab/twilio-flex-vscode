import { ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";

export interface FlexPluginTreeItem {
  label: string;
  sid: string;
  status: string;
  contextValue: string;
}

export class FlexPluginTreeItem extends TreeItem {
  constructor(label: string, sid: string, status: string) {
    super(label, TreeItemCollapsibleState.None);
    this.label = label;
    this.sid = sid;
    this.iconPath =
      status === "active" ? new ThemeIcon("pass") : new ThemeIcon("stop");
    this.contextValue = status;
  }
}

export default FlexPluginTreeItem;
