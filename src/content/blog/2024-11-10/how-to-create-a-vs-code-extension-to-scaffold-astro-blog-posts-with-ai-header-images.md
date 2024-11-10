---
title: "How to create a VSCode extension to scaffold Astro blog posts with AI header images"
tags: ["Node.js", "VSCode", "VSCode extension"]
description: "How to create a VSCode extension to scaffold Astro blog posts with AI header images"
category:
date: 2024-11-10
cover_image: "./how-to-create-a-vs-code-extension-to-scaffold-astro-blog-posts-with-ai-header-images.png"
---

I recently moved my blog to [Astro](astro.build) from Gatsby. Previously I created a VSCode extension for generating a stub or scaffold for a new blog post. 
I created a new one using [Langchain](https://www.langchain.com/) and Open AI to generate a header image.

When I create new blog posts in my blog, I start with a folder with the same name as the current date, and a markdown file with frontmatter with meta information about the post. 
I also have cover image that I create that shows up as a header.

```plaintext
---
title: "How to create a VSCode extension to scaffold Astro blog posts with AI header images"
tags: ["Node.js"]
description: "How to create a VSCode extension to scaffold Astro blog posts with AI header images"
category:
date: 2024-11-10
cover_image: "./how-to-create-a-vs-code-extension-to-scaffold-astro-blog-posts-with-ai-header-images.png"
---
```

So the extension creates a file structure that looks like the following:

```
2024-11-10
  ↳how-to-create-a-vs-code-extension-to-scaffold-astro-blog-posts-with-ai-header-images.md
  ↳how-to-create-a-vs-code-extension-to-scaffold-astro-blog-posts-with-ai-header-images.png
```

## Creating the VSCode extension

To create a VSCode extension, you can use an yeoman command to generate a VSCode extension project.

```sh
$ npx --package yo --package generator-code -- yo code
```

This will create a new extension project. The generator will prompt you whether you want to use TypeScript or JavaScript. I chose TypeScript, but either will work. 
Once the project is created, you can open it up in VSCode.

```sh
$ code .
```

You will see a number of files in your project, including an extension.ts, jsconfig.json and package.json files. Open up the extension.ts file.

```javascript
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "astroblogpost" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('astroblogpost.createMarkdownPost', () => {
		
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
```

The activate function is the main entry point for the extension. It registers a command with the vscode.commands.registerCommand function. 
The command corresponds with the commands that are listed in the package.json file in the “contributes” key.

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

We can run and test this in VSCode by pressing the F5 key, which will launch an extension host. We can then press ‘command-shift-P’ on the MacOS or ‘control-shift-P’ on Windows or Linux. This will prompt the user with the Command Palette. Here we can type in Hello World. This will show the information box with a message from our command.

Lets’ modify this to create a markdown file we can use to add to our blog.

Add the following requires to the beginning of our file underneath the line with const vscode = require('vscode'). It should look like this when you are done.

```javascript
import * as vscode from 'vscode';
import * as fs from 'fs';
import path from 'path';
import { toKebabCase } from '@std/text';
import { DallEAPIWrapper } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

let statusBarItem: vscode.StatusBarItem;
let blogfolder = 'src/content/blog';
```

The ‘path’ and ‘fs’ modules are included for free with VSCode, but we will need to install @std/text into our dependencies to get the Kebab Case function. 
We can do this in the command line in the same path as our project. This package is from the jsr repo, so we will have to use the following command to install:

```sh
npx jsr add @std/text
```

Adding this library will require that we change the package type to "module" in the package.json.

```json
"type": "module"
```

We will also need to modify the tsconfig.json file to allow the ESNext lib:

```json
{
	"compilerOptions": {
		"module": "Node16",
		"target": "ES2022",
		"lib": [
			"ESNext", 
      "DOM",
		],
		"sourceMap": true,
		"rootDir": "src",
		"strict": true   /* enable all strict type-checking options */
		/* Additional Checks */
		// "noImplicitReturns": true, /* Report error when not all code paths in function return a value. */
		// "noFallthroughCasesInSwitch": true, /* Report errors for fallthrough cases in switch statement. */
		// "noUnusedParameters": true,  /* Report errors on unused parameters. */
	}
}
```


## Adding the markdown creation code

Now lets’ add the following functions to the end of our extension.ts file.

```javascript
function createDate(): string {
  return new Date().toISOString().split('T')[0];
}

function createFrontMatter(title: string, image: string): string {
  return `---
title: "${title}"
tags: ["Node.js"]
description: "${title}"
category:
date: ${createDate()}
cover_image: "./${image}"
---

`;
}

function createMarkdownFile(mdp: string, frontmatter: string): void {
	if (!fs.existsSync(mdp)) {
		fs.writeFileSync(mdp, frontmatter);
	} else {
		vscode.window.showErrorMessage(`This file ${mdp} already exists.`);
	}
}

async function createImageFile(folderPath: string, coverImage: string, imageUrl: string) {
	const arrayBuf = await fetch(imageUrl).then(res => res.arrayBuffer());
	const imagePath = path.join(folderPath, coverImage);
	await fs.promises.writeFile(imagePath, Buffer.from(arrayBuf));
}

async function createMarkdownFolder(input: string) {
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	statusBarItem.text = "Generating Blog Post...";
	statusBarItem.show();
	let folderPaths = vscode.workspace.workspaceFolders;
	if (!folderPaths) {
		vscode.window.showErrorMessage('No workspace folder is open.');
		return;
	}
	const allWorkspaceolders = folderPaths.map(folder => {
		return folder.uri.path;
	});

	if (allWorkspaceolders.length > 0) {
		const myConfig = vscode.workspace.getConfiguration('astroblogpost');
		const subfolder = myConfig.blogSourcePath || blogfolder;
		const openAIAPIKey = myConfig.openAIAPIKey || process.env.OPENAI_API_KEY;
		const currDate = createDate();
		const title = input || 'Your Title Here';
		const folderPath = path.join(allWorkspaceolders[0], subfolder, currDate);
		console.log(folderPath);
		let markdownFilename = 'index.md';
		let coverImage = 'unnamed.png';
	
		const tool = new DallEAPIWrapper({
      n: 1, // Default
      modelName: "dall-e-3", // Default
      openAIApiKey: openAIAPIKey, 
      size: "1792x1024"
  	});

		const prompt = await imagePrompt.format({ headline: title });
		const imageURL = await tool.invoke(prompt);

		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath);
		}
		
		if (title !== 'Your Title Here') {
			markdownFilename = toKebabCase(title) + '.md';
		}
		coverImage = `${toKebabCase(title)}.png`;

		const frontmatter = createFrontMatter(title, coverImage);
		const markdownPath = path.join(folderPath, markdownFilename);
		createMarkdownFile(markdownPath, frontmatter);
		createImageFile(folderPath, coverImage, imageURL);
		statusBarItem.hide();
		vscode.window.showInformationMessage(`Created a COOL post astroblogpost at ${markdownFilename} in ${subfolder}`);
	} else {
		vscode.window.showErrorMessage('Must have a workspace folder selected');	
	}
}

function startInputProcess() {
	vscode.window.showInputBox({
		value: '',
		placeHolder: 'Enter Your Title Here'
	}).then((result: string | undefined) => { 
		try {
			createMarkdownFolder(result || 'Your Title Here');
		} catch (err) {
			console.log(err);
		}
	});
}
```

The main function here is ‘startInputProcess’ and will prompt the user for what title they want to assign to their post. 
Once the title has been captured, it calls the ‘createMarkdownFolder’ function, which will create the subdirectory for our content and markdown file. 
The folder name will be based after the current date. We use the `createDate` function to create a folder name. 
The last function ‘createMarkdownFile’ will actually create the markdown file in the folder we just created.

Now lets’ alter the `activate(context)’ function so that it uses the code we added to our ‘extension.ts’ file.

```javascript {17-17}
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "astroblogpost" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('astroblogpost.createMarkdownPost', () => {
		startInputProcess();
	});

	context.subscriptions.push(disposable);
}
```

This extension also uses a settings that we can assign to the extension, and can be modified by the end user. 
We will need to modify the package.json file to add these settings options. 
We can do this by adding a “configuration” key to the “contributes” section of our ‘package.json’.

```json
"contributes": {
  "configuration": {
    "title": "Astro Blog Post",
    "properties": {
      "astroblogpost.blogSourcePath": {
        "type": "string",
        "default": "src/content/blog",
        "description": "The path to the blog source directory"
      },
      "astroblogpost.OpenAIAPIKey": {
        "type": "string",
        "default": "",
        "description": "The Open API Key for the Dalle API image generation"
      }
    }
  },
  "commands": [
    {
      "command": "astroblogpost.createMarkdownPost",
      "title": "Create Markdown Post"
    }
  ]
},
```

This will add a setting that can be looked up in our code. Here we have defaulted it to ‘src’, but the user will be able to change this to any path underneath their project they desire.

## Generating the Header Image

For generating the header image I used Dalle and the Langchain framework to generate the header image. Using Dalle to create an image, you need to provide a prompt. 
The more context to give the prompt will make it easier for Dalle to generate the image. I used the following prompt for my header images.

```javascript
const imagePrompt = PromptTemplate.fromTemplate(`
  To generate a creative header image using Dall-E based on your blog post's headline and body text, we can design a flexible prompt that incorporates key elements of your blog. Here's how you can structure your prompt, making it adaptable to any blog post by substituting your specific headlines and text:
  
  ### Dall-E Prompt Template
  
  **Title of the Blog Post**: {headline}
  
  **Preferred Color Scheme and Art Style**: Bright and vibrant colors to emphasize growth and sustainability; a blend of digital art and watercolor styles for a modern yet organic feel
  
  **Mood or Atmosphere of the Image**: Inspiring and uplifting, showcasing harmony between urban life and nature
  
  Make sure to not include the Title of the Blog Post in the image. The image should be a visual representation of the blog post's content and theme.
`);
```

The prompt template uses a headline placeholder that the Dalle prompt will use to generate the image. In the `createMarkdownFolder` function we use the following code to generate the image on OpenAI's servers.

```javascript
const tool = new DallEAPIWrapper({
  n: 1, // Default
  modelName: "dall-e-3", // Default
  openAIApiKey: openAIAPIKey, 
  size: "1792x1024"
});

const prompt = await imagePrompt.format({ headline: title });
const imageURL = await tool.invoke(prompt);
```

## Bundling our extension

I chose to use `esbuild` for my bundler. Since I changed the package type to "module", I had to change the top of my esbuild file to use the ESNext syntax.

```javascript
import esbuild from "esbuild";
```

Now I used the `vsce` command to package the extension into a `.vsix` file.

```sh
$ npx vsce package
```

This will create the .vsix file. You can share this file and install it locally to VSCode by entering the following command.

```sh
$ code --install-extension <yourExtensionName>-0.0.1.vsix
```

## Conclusion

One of the wonderful things about VSCode is that we can extend it using JavaScript and TypeScript. This makes it very easy for creating our own developer tools as publishing extensions. Kudos to Microsoft for sponsoring such a wonderful tool for developers!

[https://code.visualstudio.com/api/get-started/your-first-extension](https://code.visualstudio.com/api/get-started/your-first-extension) 

[https://code.visualstudio.com/api/working-with-extensions/bundling-extension](https://code.visualstudio.com/api/working-with-extensions/bundling-extension) 

[https://code.visualstudio.com/api/working-with-extensions/publishing-extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
