---
title: "Build your own Developer tools in Node.js"
description: ""
category: 
date: 2021-05-12
cover_image: "./cesar-carlevarino-aragon.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/cKVgbKFRV8U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I did a presentation a couple of years ago to JaxNode User Group about building your own tools. As a user it is very common to find yourself repeating the same series of commands over and over again. In software development you often hear about the [SOLID principles](https://www.baeldung.com/solid-principles). One of those principles is DRY principle, which stands for Don't Repeat Yourself.

If you don't want to repeat yourself as a developer, why would you want to do it as a user? This is one of the reasons why I build my own tools. Here are some examples of tasks I ran across where I built my own tools.

* I created a command line tool for generating thumbnails for iOS and Android apps
* I also created a tool for generating a markdown folder for new blog posts
* I then created a tool for generating a new Node.js project

# Command Line Tools

I have used a couple of different frameworks for creating command line tools with Node.js. You don't have to use Node.js. Python and Shell scripts are also popular for creating command line tools. You can even use C.

When using Node.js for command line tools, there are a couple of popular frameworks. The first one that became popular was [Commander](https://github.com/tj/commander.js) by TJ Holowaychuk. Commander is still a very popular framework.

## Oclif

Lately I have been using [Oclif](https://oclif.io). This was developed out of [Heroku](https://heroku.com) for their command line tool. Their parent company Salesforce then used it to build SFDX.

Oclif is feature rich with the ability to create multiple commands, add plugins and use either TypeScript or JavaScript for developing your utilities. I will use Oclif for my examples in this post.

## Creating a New App in Node.js

When I am testing out a new NPM package that I might want to use or testing a new JavaScript feature in Node.js, I usually do a number of things to setup a new project. The tasks I go through are usually as follows;

1) Create a directory and change into that directory
2) Init a new project using NPM
3) Create a README file
4) Create a .gitignore file
4) Create an index.js file for that start of my application
5) Initialize a git repo, and commit all of the files

If I was to do all of these commands from the command line in the shell, it would look like the following;

```bash
root> mkdir mytestapp && cd mytestapp
mytestapp> curl https://www.toptal.com/developers/gitignore/api/node > .gitignore
mytestapp> npm init -y
mytestapp> echo "# mytestapp" > README.md
mytestapp> touch index.js
mytestapp> git init
mytestapp> git add .
mytestapp> git commit -m "Initial Commit"
```

After doing this enough times, I decided to create a command line tool to generate a new project.

# Creating a New Command Line tool with oclif

You can generate a new oclif application using `npx`. Oclif gives you options for either a single command or a multi command tool. For our example application, we are just going to use the single command.

```bash
> npx oclif single mytestconsole
```

This will generate a new project that with the following directory structure;

```bash
MYTESTCONSOLE
--bin
  --run
  --run.cmd
--node_modules
--src
  --index.js
.editorconfig
.gitignore
package-lock.json
package.json
```

The `index.js` file will contain the settings and the main entry point to your command line app. 

```javascript
const {Command, flags} = require('@oclif/command')

class MytestconsoleCommand extends Command {
  async run() {
    const {flags} = this.parse(MytestconsoleCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from ./src/index.js`)
  }
}

MytestconsoleCommand.description = `Describe the command here
...
Extra documentation goes here
`

MytestconsoleCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = MytestconsoleCommand

```

As you can see from the file generated above, it contains a class that extends the command class with an async `run` function. It also contains a description and flags configuration. The `run` function is the main function and the starting point for our console app.

The `description` property is part of the self documentation part of oclif. Whatever text you put in this property will display in the help for the application.

The `flags` object property is where you configure the different flags for controlling the logic from your command line.

# SetupNodeProject (snp)

For my `Setupnodeproject` app, I added a flag for creating a new folder when generating a new application. The final object definition will look like the following;

```javascript
SetupnodeprojectCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
  folder: flags.boolean({char: 'f', description: 'create Folder for project', default: false })
}
```

As you can see from the example above the `folder` flag is defined as a boolean. If the user does not use the flag, it will default to false.

Now we need to define the function for creating the folder.

```javascript
async createFolder(name) {
    await fsPromises.mkdir(name);
}
```

To create the folder I am using the Node.js fs/promises module, and requiring it at the beginning of my 'index.js' file.

```javascript
const fsPromises = require('fs/promises');
```

To create the `.gitignore` file, I am going to copy it from a template from the root level of my project.

```javascript
  async createGitIgnoreFile() {
    this.log(`Creating git ignore file.`);
    const contentFile = path.join(__dirname, '../gitignoretemplate.txt');
    const workingdir  = process.cwd();
    const gitIgnorePath = path.join(workingdir, '.gitignore');
  
    return await fsPromises.copyFile(contentFile, gitIgnorePath);
  }
```

For the rest of my commands I will need to use the `exec` module in Node.js to execute command line tools against the system. To do this I am going to create a async function that can execute my commands as a Promise.

```javascript
const execPromise = async command => {
  return new Promise(async (resolve, reject) => {
      exec(command, { shell: '/bin/zsh' }, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          reject(`error: ${error.message}`);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          reject(`stderr: ${stderr}`);
        }
        resolve(`stdout: ${stdout}`);
      });
  });
};
```

The `execPromise` function is a arrow function that returns a Promise. Promises and async/await functions are interchangeable in JavaScript. Now I can use this function in my `createGitIgnore` function.

```javascript
async npmInitProject() {
    this.log(`NPM Initing project.`);
    return await execPromise("npm init -y");
}
```

As we can see from the function above, we execute the `npm init -y` command. This will generate the package.json file. I want to make one small modification that allows me to use the import/export syntax available in Node.js. I need to add a 'type' key with the value of 'module'. To do this I will use the following function;

```javascript
async modifyPackageJson() {
    const packageFile = await fsPromises.readFile('./package.json');
    const jsonObj = JSON.parse(packageFile);
    jsonObj['type'] = 'module';
    await fsPromises.writeFile('./package.json', JSON.stringify(jsonObj, null, 4), 'utf8');
}
```

The last three things I need to do is to create a blank 'index.js' file, a 'README.md' file and initialize the git repository for saving my project into git source control.

```javascript
async createIndexFile() {
    this.log(`Creating blank index file.`);
    return await execPromise("touch index.js");
}

async createReadme(name) {
    this.log(`Creating README file.`);
    return await execPromise(`echo "# ${name}" > README.md`);
}

async gitInit() {
    await execPromise("git init");
    await execPromise("git add .");
    await execPromise(`git commit -m "Initial Commit"`);
}
```

Now we can call all of these functions from the `run` function to create our app.

```javascript
async run() {
    const {flags} = this.parse(SetupnodeprojectCommand);
    const name = flags.name || 'node_project';
    if (flags.folder) {
      await this.createFolder(name);
      process.chdir(`./${name}`);
    }
    await this.createGitIgnoreFile();
    await this.npmInitProject();
    await this.modifyPackageJson();
    await this.createIndexFile();
    await this.createReadme(name);
    await this.gitInit();
}
```

If you look at the logic for where we create the folder, I have a command to change the working directory to the directory we just created. If we are not creating a directory for our new application, we can leave the working directory alone so that it uses the same directory as we are running the command line.

We can even test this and run it locally by NPM installing it globally.

```bash
> npm i -g
```

I have this current project available to view on [Github](https://github.com/davidfekke/setupnodeproject).

# Conclusion

There are already a lot of different projects for generating out a node project. One popular project is called Yeoman, or 'YO'. But as you can see it is very easy to create our own tools for automating workflows using Node.js.