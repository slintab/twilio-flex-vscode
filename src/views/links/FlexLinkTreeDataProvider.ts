import { TreeDataProvider, TreeItem } from "vscode";

import { FlexLinkTreeItem } from "./FlexLinkTreeItem";

export class FlexLinkTreeDataProvider implements TreeDataProvider<TreeItem> {
  links: FlexLinkTreeItem[];

  constructor() {
    this.links = [];
  }

  getTreeItem(element: FlexLinkTreeItem) {
    return element;
  }

  getChildren(element: FlexLinkTreeItem) {
    if (element) {
      return [];
    }

    if (this.links.length === 0) {
      this.createLinks();
    }

    return this.links;
  }

  createLinks() {
    const linkAttributes: [string, string][] = [
      ["Admin Dashboard", "twilio-flex.links.dashboard"],
      ["Twilio Console", "twilio-flex.links.console"],
      ["Documentation", "twilio-flex.links.docs"],
    ];

    const links = linkAttributes.map((element) => {
      return new FlexLinkTreeItem(...element);
    });

    this.links = links;
  }
}
