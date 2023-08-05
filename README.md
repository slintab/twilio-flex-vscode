# Twilio Flex VSCode

This repository contains the code for a VSCode extension for Twilio Flex.

## Disclamer
Please note that **THIS PROJECT IS UNDER ACTIVE DEVELOPMENT**. Some features may not work or may not work correctly! :warning: 

## Features

Currently, the extension can be used to:

* [Create plugins](###feature-create)
* [Deploy plugins](###feature-deploy)
* [Run plugins](###feature-run)
* [Manage plugins](###feature-manage)
* [Develop with the Flex Project Template](###feature-template)
* [Access documentation and relevant links](###feature-links)
* [Access code snippets for common tasks](###feature-snippets)



directly from VSCode!:cowboy_hat_face:	


## Setup

1. Ensure that you have the following dependencies installed:
    - **VSCode** version 1.80 or greater ([link](https://code.visualstudio.com/))
    - **Node** ([link](https://nodejs.org/en))
    - **Twilio CLI** ([link](https://www.twilio.com/docs/twilio-cli/quickstart))
    - **Flex Plugins CLI**  ([link](https://www.twilio.com/docs/flex/developer/plugins/cli/install))

2. Install [Yeoman](https://yeoman.io/), via: `npm install -g yo`
3. Install the [VSCode Extension Manager](https://github.com/microsoft/vscode-vsce), via: `npm install -g @vscode/vsce`
4. From the repository's root directory, generate an extension file with the command  `vsce package`. This will create a `.vsix` file.
5. Import the `.vsix` file from the previous step with `code --install-extension <EXTENSION_FILE>.vsix`


## Maintainer

Thanks for reading this far! If you have any questions, do not hesitate to reach out at hello@slintab.dev

