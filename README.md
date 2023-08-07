# Twilio Flex VSCode

This repository contains the code for a VSCode extension for Twilio Flex.


## Disclamer
Please note that **THIS PROJECT IS UNDER ACTIVE DEVELOPMENT**. Some features may not work or may not work correctly! :warning: 


## Features

Currently, the extension can be used to:

* Create, run and deploy plugins
* List, enable and disable deployed plugins
* Develop with the [Flex Project Template](https://github.com/twilio-professional-services/flex-project-template)
* Access documentation and useful links
* Generate code snippets for common tasks

directly from VSCode!:cowboy_hat_face:	


## Demo

![Demo](demo.jpg?raw=true)


## Setup


#### Dependencies

Ensure that you have the following dependencies installed:
- **Node** ([link](https://nodejs.org/en))
- **VSCode** version 1.80 or later ([link](https://code.visualstudio.com/))
- **VSCode Extension Manager** (`npm install -g @vscode/vsce`)
- **Twilio CLI** ([link](https://www.twilio.com/docs/twilio-cli/quickstart))
- **Flex Plugins CLI**  ([link](https://www.twilio.com/docs/flex/developer/plugins/cli/install))


#### Installing the extension

The extension can be installed using the included compiled extension file from the `.build` directory. To add and enable the extension in VSCode, run:
```bash
code --install-extension build/<EXTENSION_NAME>.vsix
```


#### Building the extension

It is also possible to compile and build the extension from source, by following these steps:
1. Compile the extension via `npm run compile`. This will result in an `out` directory being created.
2. Copy the `assets` and `snippets` directories to the `out` directory.
3. From the repository's root directory, generate an extension file with the command  `vsce package`. This will create a `.vsix` file.
4. Install the `.vsix` file from the previous step with the `code --install-extension <EXTENSION_FILE>.vsix` command.


## Maintainer

Thanks for reading this far! If you have any questions, do not hesitate to reach out at hello@slintab.dev

