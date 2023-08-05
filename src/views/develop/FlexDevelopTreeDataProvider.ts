import { ThemeIcon, TreeDataProvider, TreeItem } from "vscode";

import { FlexDevelopTreeItem } from "./FlexDevelopTreeItem";

export class FlexDevelopTreeDataProvider implements TreeDataProvider<TreeItem> {
  links: FlexDevelopTreeItem[];

  constructor() {
    this.links = [];
  }

  getTreeItem(element: FlexDevelopTreeItem) {
    return element;
  }

  getChildren(element: FlexDevelopTreeItem) {
    if (element) {
      return [];
    }

    if (this.links.length === 0) {
      this.createLinks();
    }

    return this.links;
  }

  createLinks() {
    const linkAttributes: [string, string, ThemeIcon][] = [
      ["Create Plugin", "twilio-flex.plugins.create", new ThemeIcon("add")],
      ["Deploy Plugin", "twilio-flex.plugins.deploy", new ThemeIcon("package")],
      ["Run Plugin", "twilio-flex.plugins.run", new ThemeIcon("run")],
      [
        "Open Project Template",
        "twilio-flex.plugins.template",
        new ThemeIcon("files"),
      ],
    ];

    const links = linkAttributes.map((element) => {
      return new FlexDevelopTreeItem(...element);
    });

    this.links = links;
  }
}
