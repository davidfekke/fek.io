---
title: "How to build OCLIF installers for MacOS, Windows and Linux with Github Actions"
description: ""
tags: ["OCLIF", "Github Actions", "Node.js"]
category: 
date: 2023-12-06
cover_image: "./githubactionsoclif.jpg"
---

<div style="text-align: center">
    <div class="responsive-iframe-container">
        <iframe src="https://youtube.com/embed/WFSeKQiW-pE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>

Whenever I need to build a CLI (command line interface) application, my goto framework is [OCLIF](https://oclif.io/). OCLIF is the CLI framework that was used by Heroku and Salesforce to build their CLI applications, which Salesforce has open sourced. It is a great framework, and I have used on a couple of different projects.

One of the issues I ran into recently had to do with getting the CLI installed on a user's OS of choice. With OCLIF, you can publish your app up to NPM, and anyone with [Node.js](https://nodejs.org/en/) installed can run the application. As an example, here is a CLI I built for getting aviation weather called `avweather-cli`. To install it from NPM, all you have to do is run the following npm command:

```shell
> npm install avweather-cli -g 
```

## What if the user does not have Node installed.

One of the other great things about OCLIF is it has the ability to create installers that do not require Node.js be installed on the user's computer. OCLIF has a pack command that you can use to create an installer for Linux, MacOS and Windows. If I want to create a build for Windows, all I have to do is run the following command:

```shell
> npx oclif pack win .
```

This will generate installers for all the different CPU architectures supported by Windows. 

* avwx-v0.5.15-a01e51d-x64.exe
* avwx-v0.5.15-a01e51d-x86.exe

The OCLIF framework also has good documentation on how to use the `pack` command to build for all three OSs. The one exception is the Mac. Apple requires a `3rd Party Installer` certificate to create an installer for MacOS. There is also a bug in the OCLIF with the current version of Node.js for generating the `pkg` installer where you can not use `NPM`. I was able to get around this by using `yarn` to run the pack command. The first thing you have to do is add a configuration in your package.json file for OCLIF. Mine looked like this:

```json
"oclif": {
    "bin": "avwx",
    "dirname": "avweather-cli",
    "commands": "./dist/commands",
    "plugins": [
      "@oclif/plugin-help",
      "@oclif/plugin-plugins"
    ],
    "macos": {
      "identifier": "com.fekke.avwx",
      "sign": "\"3rd Party Mac Developer Installer: David Fekke (<TEAM ID>)\""
    }
},
```

## Creating the 3rd Party Mac Developer certificate

The hardest part of this was creating and using the 3rd Party Mac Developer certificate. In order to do this you have to have an Apple Developer account, and create a certificate. To do this on a Mac, here are the steps to follow:

1) Open the `Keychain Access` on a Mac.
2) Click on the Keychain Access menu, and select `Certificate Assistant`. Then select the sub menu for `Request a Certificate from a Certificate Authority for <Username>`. This is the tool that lets request a certificate from Apple.
3) You will be presented with a dialog below. Make sure to select `save to disk`. This will prompt you to save a `CertificateSigningRequest`.
4) Now that you have the request, you go to Apple's developer portal at [https://developer.apple.com](https://developer.apple.com).
5) Select the `Account` tab, and then click on the Certificates [link](https://developer.apple.com/account/resources/certificates/list) under `Certificates, IDs & Profiles`.
6) Click on the `+` button next to the `Certificates` header. You will be presented with the option of `Creating a New Certificate`. Select the radio button next to where it says `Mac Installer Distribution`, and click `continue`.
7) You will be presented with a `Create a New Certificate` page, and a link called `Choose File`. Use that link to select the `CertificateSigningRequest` file you saved in step `3`, and then click on the `Continue` button.
8) Download the certificate from the `Download Your Certificate` page you are presented with after that last step. Once you have downloaded the certificate, you can double-click on the certificate, and it will install it into your Keychain.

I hope you were able to complete those steps. Once you have that certificate in your Keychain, you can use OCLIF's pack command on your Mac to create the Mac installers for Intel and M-Series ARM Macs.

## Automating this with Github Actions

One of the wonderful features that Github added was Github Actions. With Github Actions you can automate your testing, deployment and create executables on certain Github actions. For this CLI I created a single Github action for creating installers for Linux, MacOS and Windows on the release creation event. To create this action, I borrowed some knowledge  from this [post](https://viglucci.io/articles/how-to-build-oclif-for-windows-with-github-actions) by Kevin Viglucci. In his post he shows how you can create a release for Windows. I modified his action to create installers for all three OSs.

```yaml
on:
  release:
    types: [published]

jobs:
  release:
    name: release ${{ matrix.target }}
    strategy:
      fail-fast: false
      matrix:
        include:
          - target: win
            artifact_glob: "./dist/win32/*"
            runs-on: windows-latest
          - target: macos
            artifact_glob: "./dist/macos/*"
            runs-on: macos-latest
          - target: deb
            artifact_glob: "./dist/deb/*"
            runs-on: ubuntu-latest

    runs-on: ${{ matrix.runs-on }}

    steps:
    - run: sudo apt update
      if: runner.os == 'Linux'
    - run: sudo apt install nsis p7zip-full p7zip-rar -y
      if: runner.os == 'Linux'
    - name: Install the Apple certificate
      if: matrix.target == 'macos'
      env:
        BUILD_CERTIFICATE_BASE64: ${{ secrets.BUILD_CERTIFICATE_BASE64 }}
        P12_PASSWORD: ${{ secrets.P12_PASSWORD }}
        KEYCHAIN_PASSWORD: ${{ secrets.KEYCHAIN_PASSWORD }}
      run: |
        # Create variables
        CERTIFICATE_PATH=$RUNNER_TEMP/3rdpartyCertificates.p12
        KEYCHAIN_PATH=$RUNNER_TEMP/app-signing.keychain-db

        # import certificate
        echo "$BUILD_CERTIFICATE_BASE64" | base64 --decode > $CERTIFICATE_PATH
        
        # create temporary keychain
        security create-keychain -p "$P12_PASSWORD" $KEYCHAIN_PATH
        security set-keychain-settings -lut 21600 $KEYCHAIN_PATH
        security unlock-keychain -p "$P12_PASSWORD" $KEYCHAIN_PATH

        # import certificate to keychain
        security import $CERTIFICATE_PATH -P "$P12_PASSWORD" -A -t cert -f pkcs12 -k $KEYCHAIN_PATH
        security list-keychain -d user -s $KEYCHAIN_PATH

    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '20.10.0'
    - run: npm install -g yarn
    - run: yarn
    - run: yarn global add oclif
    - name: Install oclif
      run: npm i oclif -g
      if: matrix.target == 'win'
    - run: oclif pack ${{ matrix.target }} -r .
    - name: Attach artifacts to release
      uses: svenstaro/upload-release-action@v2
      with:
        repo_token: ${{ secrets.GITHUB_TOKEN }}
        file: ${{ matrix.artifact_glob }}
        file_glob: true
        overwrite: true
        tag: ${{ github.ref }}

```

While this works, there is some set up that goes along with using this action.

## Creating the Github Action.

To create the action you will need to create a `.github` folder in the root of your project if it does not already exist, and then create a folder underneath that called `workflows`. Save the Github Action from above into a file called `installers.yaml`.

Inside the action there is a section called `strategy`. Underneath the strategy is where the `matrix` is defined. The matrix tells Github that this action has to be performed separately for each of the matrices.

```yaml
strategy:
  fail-fast: false
  matrix:
    include:
      - target: win
      artifact_glob: "./dist/win32/*"
      runs-on: windows-latest
      - target: macos
      artifact_glob: "./dist/macos/*"
      runs-on: macos-latest
      - target: deb
      artifact_glob: "./dist/deb/*"
      runs-on: ubuntu-latest
```

This matrix will run three times concurrently for each OS.

If you look at the individual steps in the action you will see where some of the steps have a condition set where the script is only run for a particular runner or matric target, like the following example.

```shell
- run: sudo apt install nsis p7zip-full p7zip-rar -y
  if: runner.os == 'Linux'
```

In the previous example, this action will only run if the actions is being run on a runner using Linux.

## Allowing Github actions to use your 3rd Party Installer certificate

Since Apple requires a certificate to create the installer for the Mac, we have have a way for the Github runner to access that certificate. This can be done by adding the certificate to your Github secrets. You do not want to store any certificate in your repo, especially if it is a public repo. Here are the steps you can take to make sure the certificate is used by the runner.

1) Open `Keychain Access` on your mac and select `My Certificates` under the `login` keychain. Expand the Certificate so you can select both the certificate and the private key. Once you have both selected, you can export them as a `.p12` Personal Information Exchange file. Save it to your `Documents` or `Desktop` folder.
2) Open up a terminal, and cd into the folder you saved the `.p12` file. Then run the following command in your terminal:

```shell
> base64 -i nameofyourp12file.p12 | pbcopy
```

3) This command copies the contents of you `.p12` file into your clipboard with a base64 encoding. Now that it is in your clipboard, this can be copied to a Github secret in your repo called `BUILD_CERTIFICATE_BASE64`. If you used a password for exporting the `.p12`, you can create a secret for that called `P12_PASSWORD`.

One of the steps in the action above will use these secrets to install your certificate on the github runner.

```yaml
    - name: Install the Apple certificate
      if: matrix.target == 'macos'
      env:
        BUILD_CERTIFICATE_BASE64: ${{ secrets.BUILD_CERTIFICATE_BASE64 }}
        P12_PASSWORD: ${{ secrets.P12_PASSWORD }}
        KEYCHAIN_PASSWORD: ${{ secrets.KEYCHAIN_PASSWORD }}
      run: |
        # Create variables
        CERTIFICATE_PATH=$RUNNER_TEMP/3rdpartyCertificates.p12
        KEYCHAIN_PATH=$RUNNER_TEMP/app-signing.keychain-db

        # import certificate
        echo "$BUILD_CERTIFICATE_BASE64" | base64 --decode > $CERTIFICATE_PATH
        
        # create temporary keychain
        security create-keychain -p "$P12_PASSWORD" $KEYCHAIN_PATH
        security set-keychain-settings -lut 21600 $KEYCHAIN_PATH
        security unlock-keychain -p "$P12_PASSWORD" $KEYCHAIN_PATH

        # import certificate to keychain
        security import $CERTIFICATE_PATH -P "$P12_PASSWORD" -A -t cert -f pkcs12 -k $KEYCHAIN_PATH
        security list-keychain -d user -s $KEYCHAIN_PATH
```

What this script does is copy the secrets into a physical key that can then be installed and used on the runner's keychain. This step is also set up to only run on the MacOS portion of the action.

## Conclusion

When using OCLIF with Github Actions, you can automagically produce all of your installers so that your users do not need to have Node.js installed to use your tool. For extra credit, you can tie your workflow releases into a S3 bucket so that your users can upgrade to the latest version of your tool without having to install it again.  