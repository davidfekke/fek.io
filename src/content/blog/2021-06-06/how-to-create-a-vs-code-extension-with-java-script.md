---
title: "How to create a VSCode Extension with JavaScript"
description: ""
category: 
date: 2021-06-06
tags: ["VSCode", "JavaScript", "Extensions", "Node.js"]
cover_image: "./vscodeicons.png"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/xALMaiUR2vQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I recently wrote about creating your own tools using Node.js. There are a lot of applications now that are based on Node.js that you can extend using JavaScript. One of those applications is one that I am using right now as I write this post, Visual Studio Code.

## VS Code

If you are not familiar with Visual Studio Code, or VSCode for short, it is Microsoft's open source code editor. It is used for many different types of application development, everything from C++ to Salesforce. From the very beginning VSCode has been extensible, in other words you add functionality to it very easily with extensions. These extensions are written in JavaScript. 

VSCode code is built on top of Electron, a framework from GitHub that is based on Chromium and Node.js. Electron was created to make it easier for web developers to create desktop applications. Web developers can use their existing skillsets to create application based on web technologies like HTML, CSS and JavaScript. These electron apps can run cross platform on Windows, MacOS and Linux.

## Creating a plugin

I created a command line tool for generating new blog posts a couple of years ago called 'blogpostgenerator'. You can find it on NPM. This tool creates a folder named after the current date, and then creates a markdown file with some frontmatter for metadata. 

Microsoft has pretty good documentation on how to create an extension for VSCode, but I was looking at creating an extension that could take some user input for the name of the file I was trying to create. Here is how I created my extension.

You can create a hello world extension using [Yoeman](https://yeoman.io/) and a VSCode generator called 'generator-code'.

```bash
npm install -g yo generator-code
yo code
```

When running this, I chose JavaScript over TypeScript. If you are adding modules you will need to add a bundler like esbuild or webpack. If you use the TypeScript option, it will give you an option to install it with webpack.

This will generate a new extension project. This newly scaffolded extension can be opened and debugged in Visual Studio Code.

```bash
code .
```

You will see a number of files in your project, including an extension.js, jsconfig.json and package.json files. Open up the extension.js file.

```javascript
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "myhelloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('myhelloworld.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from myhelloworld!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

```

The `activate` function is the main entry point for the extension. It registers a command with the vscode.commands.registerCommand function. The command corresponds with the commands that are listed in the package.json file in the "contributes" key.

```json
  "contributes": {
    "commands": [
      {
        "command": "myhelloworld.helloWorld",
        "title": "Hello World"
      }
    ]
  },
```

We can run and test this in VSCode by pressing the F5 key, which will launch an extension host. We can then press 'command-shift-P' on the MacOS or 'control-shift-P' on Windows or Linux. This will prompt the user with the Command Palette. Here we can type in `Hello World`. This will show the information box with a message from our command.

Lets' modify this to create a markdown file we can use to add to our blog.  

Add the following requires to the beginning of our file underneath the line with `const vscode = require('vscode')`. It should look like this when you are done.

```javascript
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

let blogfolder = 'src';
```

The 'path' and 'fs' modules are included for free with VSCode, but we will need to install 'lodash' into our dev dependencies. We can do this in the command line in the same path as our project.

```bash
npm install lodash --save-dev
```

This will add 'lodash' into our "devDependencies" section of our 'package.json' file and the actual module to our 'node_modules' folder. An important point to note here is that when it comes time to package and publish our actual extension, the 'node_modules' folder will be excluded. We will need to add a bundler to make sure that the functionality we need from lodash is included in our final extension. We will do into more detail on how to add and configure a bundler at the end of this post.

Now lets' add the following functions to the end of our extension.js file.

```javascript
function startInputProcess() {
	vscode.window.showInputBox({
		value: '',
		placeHolder: 'Enter Your Title Here'
	}).then(result => { 
		createMarkdownFolder(result);
	}).catch(err => console.log(err));
}

function createMarkdownFolder(input) {
	let folderPaths = vscode.workspace.workspaceFolders;
	const allWorkspaceolders = folderPaths.map(folder => {
		return folder.uri.path;
	});

	if (allWorkspaceolders.length > 0) {
		const myConfig = vscode.workspace.getConfiguration('myhelloworld');
		const subfolder = myConfig.blogSourcePath || blogfolder;
		const currDate = getDateString();
		const title = input || 'Your Title Here';
		const folderPath = path.join(allWorkspaceolders[0], subfolder, currDate);
		let markdownFilename = 'index.md';
	
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath);
		}
		
		if (title !== 'Your Title Here') {
			markdownFilename = _.kebabCase(title) + '.md';
		}
	
		const frontmatter = `---
title: "${title}"
description: ""
category: 
date: ${currDate}
cover_image: "./unnamed.jpg"
---
`;
	
		const markdownPath = path.join(folderPath, markdownFilename);
		createMarkdownFile(markdownPath, frontmatter);
		vscode.window.showInformationMessage(`Created a COOL post at ${markdownFilename} in ${subfolder}`);
	} else {
		vscode.window.showErrorMessage('Must have a workspace folder selected');	
	}
}

function getDateString() {
	const currDate = new Date();
	const month = currDate.getMonth() + 1;
	const date = currDate.getDate();
	const year = currDate.getFullYear(); 
	const formattedDate = `${year}-${addLeadingZeros(month)}-${addLeadingZeros(date)}`;
	return formattedDate;
}

function addLeadingZeros(n) {
	if (n <= 9) {
	  return "0" + n;
	}
	return n
}

function createMarkdownFile(mdp, frontmatter) {
	if (!fs.existsSync(mdp)) {
		fs.writeFileSync(mdp, frontmatter);
	} else {
		vscode.window.showErrorMessage(`This file ${mdp} already exists.`);
	}
}
```

The first function here, 'startInputProcess' actually will prompt the user for what title they want to assign to their post. Once the title has been captured, it calls the 'createMarkdownFolder' function, which will create the subdirectory for our content and markdown file. The folder name will be based after the current date, We use two functions 'getDateString' and 'addLeadingZeros' to create a folder name. The last function 'createMarkdownFile' will actually create the markdown file in the folder we just created.

Now lets' alter the `activate(context)' function so that it uses the code we added to our 'extension.js' file.

```javascript
async function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "myhelloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('myhelloworld.createMarkdownPost', function () {
		// The code you place here will be executed every time your command is executed

		// We start the process here
		startInputProcess();
	});

	context.subscriptions.push(disposable);
}
```

This extension also uses a settings that we can assign to the extension, and can be modified by the end user. We will need to modify the package.json file to add these settings options. We can do this by adding a "configuration" key to the "contributes" section of our 'package.json'.

```json
    "contributes": {
		"configuration": {
			"title": "Gatsby Blog Post",
			"properties": {
				"myhelloworld.blogSourcePath": {
					"type": "string",
					"default": "src",
					"description": "This is the path where you store your blog markdown"
				}
			}
		},
		"commands": [
			{
				"command": "myhelloworld.createMarkdownPost",
				"title": "Create Markdown Post"
			}
		]
	},
```

This will add a setting that can be looked up in our code. Here we have defaulted it to 'src', but the user will be able to change this to any path underneath their project they desire.

## Bundling our extension

I previously mentioned that since we are using the external module 'lodash' that we will need to bundle this extension. It is a good practice to bundle your extension no matter what. We will use 'esbuild' to bundle our extension. Lets go to the command line again for our project and add the following modules.

```bash
npm i --save-dev esbuild
```

We will need to add the following script properties to the "scripts" section of our 'package.json' file.

```json
    "vscode:prepublish": "npm run -S esbuild-base -- --minify",
    "esbuild-base": "esbuild ./extension.js --bundle --outfile=out/main.js --external:vscode --format=cjs --platform=node",
    "esbuild": "npm run -S esbuild-base -- --sourcemap",
    "esbuild-watch": "npm run -S esbuild-base -- --sourcemap --watch",
    "test-compile": "tsc -p ./"
```

We will also need to change the "main" property so that it points to our 'main.js' file in the 'out' subdirectory.

```json
"main": "./out/main.js"
```

Now we can bundle our extension using the following npm script in the command line.

```bash
npm run esbuild
```

## Packaging our extension

Packaging our extension for local use or publishing to their marketplace requires adding and using the 'vsce' command line tool and registering as an organization on Azure DevOps. Lets install 'vsce' first.

```bash
npm i -g vsce
```

If you do not have an organization on Azure DevOps, you can do this by following the [instructions here](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/create-organization?view=azure-devops). Once you have created an org, you will need to create a personal access token. This token will need to have the following details when you create it.

* Assign a Name
* Make sure the Organization is accessible to all organizations
* Set the Scopes to 'Custom defined', and make sure to assign Marketplace > Manage scope

Once the Personal Access Token has been created, make to copy it in a safe place because you will need it once you login with the 'vsce' command line tool.

Now that you have the public access token, we can login and package our extension using 'vsce'.

```bash
vsce login <YourOrgName>
```

It will prompt you for your personal access token. Once you have successfully logged into 'vsce', you can package your extension with the following command.

```bash
vsce package
```

This will create a .vsix file. You can share this file and install it locally to VSCode by
entering the following command.

```bash
code --install-extension <yourExtensionName>-0.0.1.vsix
```

# Conclusion

One of the wonderful things about VSCode is that we can extend it using JavaScript and TypeScript. This makes it very easy for creating our own developer tools as publishing extensions. Kudos to Microsoft for sponsoring such a wonderful tool for developers!

https://code.visualstudio.com/api/get-started/your-first-extension
https://code.visualstudio.com/api/working-with-extensions/bundling-extension
https://code.visualstudio.com/api/working-with-extensions/publishing-extension