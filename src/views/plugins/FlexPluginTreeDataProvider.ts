import { TreeDataProvider, TreeItem, EventEmitter, Event } from "vscode";
import { FlexPluginTreeItem } from "./FlexPluginTreeItem";
import { extractPlugins, runCommand } from "../../common/utils";

export class FlexPluginTreeDataProvider implements TreeDataProvider<TreeItem> {
  private _onDidChangeTreeData: EventEmitter<
    FlexPluginTreeItem | undefined | null | void
  > = new EventEmitter<FlexPluginTreeItem | undefined | null | void>();

  readonly onDidChangeTreeData: Event<
    FlexPluginTreeItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  getTreeItem(element: FlexPluginTreeItem) {
    return element;
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  async getChildren(element: FlexPluginTreeItem) {
    if (element) {
      return [];
    }

    const result = await runCommand("twilio flex:plugins:list:plugins");
    if (!result) {
      return [];
    }

    const pluginList: [string, string, string][] = [];
    const activeRegex = /Active Plugins:((?:[\s\S](?!\nInactive Plugins:))+)/;
    const inactiveRegex = /Inactive Plugins:((?:[\s\S])+)/;

    const activeMatches = result.match(activeRegex);
    const inactiveMatches = result.match(inactiveRegex);

    const activePlugins = activeMatches ? extractPlugins(activeMatches[1]) : [];
    const inactivePlugins = inactiveMatches
      ? extractPlugins(inactiveMatches[1])
      : [];

    activePlugins.forEach((plugin) =>
      pluginList.push([plugin.friendlyName, plugin.sid, "active"])
    );
    inactivePlugins.forEach((plugin) =>
      pluginList.push([plugin.friendlyName, plugin.sid, "inactive"])
    );

    const plugins = pluginList.map((element) => {
      return new FlexPluginTreeItem(...element);
    });

    return plugins;
  }
}
