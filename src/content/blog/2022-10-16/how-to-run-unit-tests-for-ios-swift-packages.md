---
title: "How to run unit tests for iOS based Swift Package Libraries"
tags: ["iOS", "Swift Packages", "Fastlane", "CI/CD"]
description: ""
category: 
date: 2022-10-16
cover_image: "./fastlanepackage.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/uK5s--MuaaI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I recently ran into a problem trying to set up automated unit testing for a iOS based Swift Package. 
There are a couple of different ways of creating packages or libraries of code for an iOS project. The Swift Package Manager has become one of the more popular methods of creating reusable modules.

The Swift Package Manager, or SPM for short, provides an excellent way of authoring and distributing these modules. SPM also is designed to be cross platform in the since that swift packages can be share between the macOS, tvOS, watchOS and iOS. The Swift command line tool has a built in test runner that you can use to execute your unit tests. But what happens if you are using dependencies that are iOS only. In other words, they can not run on the Mac using the built in test runner.

## Incorporating Fastlane

[Fastlane](https://docs.fastlane.tools/) is a automation tool for Android and iOS developers looking to streamline builds, testing, automated screenshots and builds for your project. In this post I will use Fastlane in combination with SPM to create a way for running unit tests on iOS only packages.

### Installing Fastlane

Fastlane requires that you use a Mac with Ruby 2.5 or newer. Once you have validated that you have a new enough version of Ruby, you can install Fastlane. 

* Install Bundler by running `gem install bundler`.
* Create a ./Gemfile in the root directory of your project with the content.

```
source "https://rubygems.org"

gem "fastlane"
```
You can also install Fastlane using Homebrew by running the following brew command:

```shell
$ brew install fastlane
```

## Adding fastlane to your Swift Package

From your terminal, navigate to the root folder for your package and type the following command:

```shell
$ fastlane init
```

Select manual setup, which should be option number four. This will create a `fastlane` folder in your package folder. In this folder you should see an `Appfile` and a `Fastfile`.

## Swift Packages and Xcode

Xcode no longer requires an `xcodeproj` project folder in order to open packages. You can open your project by either typing `xed .` in the terminal at the root of your project or by opening your folder directly in Xcode. In order to run tests in Fastlane, we will need a `xcodeproj` folder. Here is the SPM command that you can use to generate a the `xcodeproj` folder. 

```shell
swift package generate-xcodeproj
```

You should see a message in your terminal that says something like: 

```shell
warning: Xcode can open and build Swift Packages directly. 'generate-xcodeproj' is no longer needed and will be deprecated soon.
generated: ./YourPackageName.xcodeproj
```

## Configure fastlane

Edit the `Fastfile` for your testing. We will create a lane called `tests`. By default the `Fastfile` will look like the following example.

```ruby
# This file contains the fastlane.tools configuration
# You can find the documentation at https://docs.fastlane.tools
#
# For a list of all available actions, check out
#
#     https://docs.fastlane.tools/actions
#
# For a list of all available plugins, check out
#
#     https://docs.fastlane.tools/plugins/available-plugins
#

# Uncomment the line if you want fastlane to automatically update itself
# update_fastlane

default_platform(:ios)

platform :ios do
  desc "Description of what the lane does"
  lane :custom_lane do
    # add actions here: https://docs.fastlane.tools/actions
  end
end
```

Change the file so it looks like the following example:

```ruby
default_platform(:ios)

platform :ios do
  desc "This lane is used for running unit tests"
  lane :tests do
    puts "running our tests!"
  end
end
```

If you want to run a Fastlane `lane` for tests, this can be done by typing `fastlane ios tests`. Our current Fastfile only outputs the text `running our tests!`. We are going to change the `Fastfile` so that it does the following three actions. We will be telling fastlane to create a new `xcodeproj` folder for our swift package, then to run our unit tests and finally remove the `xcodeproj` folder we just created.

Edit your `Fastfile` so it looks like the following example:

```ruby
default_platform(:ios)

platform :ios do
  desc "This lane is used for running unit tests"
  lane :tests do
    puts "running a our tests"
    spm(
      command: "generate-xcodeproj"
    )
    
    run_tests(
      project: "./<NameOfYourPackage>.xcodeproj",
      devices: ["iPhone 14 Pro Max"]
    )
    
    sh("rm", "-rf", "<NameOfYourPackage>.xcodeproj")
  end
end
```

The first part of this tests lane uses the `spm` action to generate the `xcodeproj` folder needed to run the tests. The next action is the `run_tests` action which will compile our package and run the any tests. The last part uses the `sh` action we are using for running the shell script command to delete our `xcodeproj` folder since it is not needed other than o run the Fastlane unit tests.

Now when you run the `tests` lane, you should get output that looks like the following:

```shell
[✔] 🚀
[15:29:17]: fastlane detected a Gemfile in the current directory
[15:29:17]: However, it seems like you didn't use `bundle exec`
[15:29:17]: To launch fastlane faster, please use
[15:29:17]:
[15:29:17]: $ bundle exec fastlane tests
[15:29:17]:
[15:29:17]: Get started using a Gemfile for fastlane https://docs.fastlane.tools/getting-started/ios/setup/#use-a-gemfile
[15:29:18]: ------------------------------
[15:29:18]: --- Step: default_platform ---
[15:29:18]: ------------------------------
[15:29:18]: Driving the lane 'ios tests' 🚀
[15:29:18]: running a our tests
[15:29:18]: -----------------
[15:29:18]: --- Step: spm ---
[15:29:18]: -----------------
[15:29:18]: $ swift package generate-xcodeproj
[15:29:18]: ▸ warning: Xcode can open and build Swift Packages directly. 'generate-xcodeproj' is no longer needed and will be deprecated soon.
[15:29:20]: ▸ generated: ./AnimalYears.xcodeproj
[15:29:20]: -----------------------
[15:29:20]: --- Step: run_tests ---
[15:29:20]: -----------------------
[15:29:20]: Resolving Swift Package Manager dependencies...
[15:29:20]: $ xcodebuild -resolvePackageDependencies -scheme AnimalYears-Package -project ./AnimalYears.xcodeproj
[15:29:20]: ▸ Command line invocation:
[15:29:20]: ▸     /Applications/Xcode.app/Contents/Developer/usr/bin/xcodebuild -resolvePackageDependencies -scheme AnimalYears-Package -project ./AnimalYears.xcodeproj
[15:29:20]: ▸ User defaults from command line:
[15:29:20]: ▸     IDEPackageSupportUseBuiltinSCM = YES
[15:29:20]: ▸ --- xcodebuild: WARNING: Using the first of multiple matching destinations:
[15:29:20]: ▸ { platform:macOS, arch:arm64, id:00006001-001049DC2109801E }
[15:29:20]: ▸ { platform:macOS, arch:x86_64, id:00006001-001049DC2109801E }
[15:29:20]: ▸ { platform:macOS, arch:arm64, variant:Mac Catalyst, id:00006001-001049DC2109801E }
[15:29:20]: ▸ { platform:macOS, arch:x86_64, variant:Mac Catalyst, id:00006001-001049DC2109801E }
[15:29:20]: ▸ { platform:macOS, arch:arm64, variant:DriverKit, id:00006001-001049DC2109801E }
[15:29:20]: ▸ { platform:DriverKit, name:Any DriverKit Host }
[15:29:20]: ▸ { platform:iOS, id:dvtdevice-DVTiPhonePlaceholder-iphoneos:placeholder, name:Any iOS Device }
[15:29:20]: ▸ { platform:iOS Simulator, id:dvtdevice-DVTiOSDeviceSimulatorPlaceholder-iphonesimulator:placeholder, name:Any iOS Simulator Device }
[15:29:20]: ▸ { platform:macOS, name:Any Mac }
[15:29:20]: ▸ { platform:macOS, variant:Mac Catalyst, name:Any Mac }
[15:29:20]: ▸ { platform:tvOS, id:dvtdevice-DVTiOSDevicePlaceholder-appletvos:placeholder, name:Any tvOS Device, error:tvOS 16.0 is not installed. To use with Xcode, first download and install the platform }
[15:29:20]: ▸ { platform:watchOS, id:dvtdevice-DVTiOSDevicePlaceholder-watchos:placeholder, name:Any watchOS Device, error:watchOS 9.0 is not installed. To use with Xcode, first download and install the platform }
[15:29:20]: ▸ { platform:iOS Simulator, id:4E2D035C-381D-49FA-9840-166C7DE95A8B, OS:16.0, name:iPad (9th generation) }
[15:29:20]: ▸ { platform:iOS Simulator, id:45ECB41A-3087-446E-A3F1-FC69100E3A43, OS:16.0, name:iPad Air (5th generation) }
[15:29:20]: ▸ { platform:iOS Simulator, id:B8235904-B566-452B-9965-F039070A623A, OS:16.0, name:iPad Pro (9.7-inch) }
[15:29:20]: ▸ { platform:iOS Simulator, id:F5C95D29-BAEE-4E34-880D-F3A30370E5F6, OS:16.0, name:iPad Pro (11-inch) (3rd generation) }
[15:29:20]: ▸ { platform:iOS Simulator, id:703B802B-C40A-4E93-B01B-E89DA684896D, OS:16.0, name:iPad Pro (12.9-inch) (5th generation) }
[15:29:20]: ▸ { platform:iOS Simulator, id:0AD1335D-C7CB-4774-9092-D5790040529B, OS:16.0, name:iPad mini (6th generation) }
[15:29:20]: ▸ { platform:iOS Simulator, id:C76866CF-2CEB-41E2-A10C-1317ACF3676A, OS:16.0, name:iPhone 8 }
[15:29:20]: ▸ { platform:iOS Simulator, id:C2CB38A7-78D6-4FBA-9200-C793CF23FE02, OS:16.0, name:iPhone 8 Plus }
[15:29:20]: ▸ { platform:iOS Simulator, id:7F96AF11-D8C7-452F-88E0-D19413558343, OS:16.0, name:iPhone 11 }
[15:29:20]: ▸ { platform:iOS Simulator, id:CD9698BE-177A-43C6-97B5-B2F2A5EBC989, OS:16.0, name:iPhone 11 Pro }
[15:29:20]: ▸ { platform:iOS Simulator, id:28B69918-6683-4261-A24A-457EEED330DF, OS:16.0, name:iPhone 11 Pro Max }
[15:29:20]: ▸ { platform:iOS Simulator, id:0F8241EF-1EE4-49A7-8912-2B42DC90CD40, OS:16.0, name:iPhone 12 }
[15:29:20]: ▸ { platform:iOS Simulator, id:FA363849-543D-44CA-AC7A-4711BB4C6724, OS:16.0, name:iPhone 12 Pro }
[15:29:20]: ▸ { platform:iOS Simulator, id:2A8E51FA-CE89-449E-A182-BAB98AE77697, OS:16.0, name:iPhone 12 Pro Max }
[15:29:20]: ▸ { platform:iOS Simulator, id:3C349F63-CADD-4E73-832D-318AE15F75DF, OS:16.0, name:iPhone 12 mini }
[15:29:20]: ▸ { platform:iOS Simulator, id:4E635B8C-7D66-4D25-9CE4-456834FE65A9, OS:16.0, name:iPhone 13 }
[15:29:20]: ▸ { platform:iOS Simulator, id:FEDAB4B2-519F-4594-BC6D-17FAD116DA51, OS:16.0, name:iPhone 13 Pro }
[15:29:20]: ▸ { platform:iOS Simulator, id:6A86FD6A-77AC-49C9-B943-C00DCEA96D2B, OS:16.0, name:iPhone 13 Pro Max }
[15:29:20]: ▸ { platform:iOS Simulator, id:A00944B0-81BC-4791-8AE1-79209CF4A9DB, OS:16.0, name:iPhone 13 mini }
[15:29:20]: ▸ { platform:iOS Simulator, id:14224567-AD97-4E3C-ACD6-DF01E814C11E, OS:16.0, name:iPhone 14 }
[15:29:20]: ▸ { platform:iOS Simulator, id:4F88BC99-AC85-4B0D-843B-6DA286CA3C35, OS:16.0, name:iPhone 14 Plus }
[15:29:20]: ▸ { platform:iOS Simulator, id:D7BB845C-76B4-490F-A851-15901861D2C8, OS:16.0, name:iPhone 14 Pro }
[15:29:20]: ▸ { platform:iOS Simulator, id:7ADD6B5D-B1F0-4C21-8DC9-C9CC7D1B5507, OS:16.0, name:iPhone 14 Pro Max }
[15:29:20]: ▸ { platform:iOS Simulator, id:51297DAF-F8D0-4CC1-9A69-8C07DA49849F, OS:16.0, name:iPhone SE (3rd generation) }
[15:29:20]: ▸ resolved source packages:
[15:29:20]: $ xcodebuild -showBuildSettings -scheme AnimalYears-Package -project ./AnimalYears.xcodeproj
--- xcodebuild: WARNING: Using the first of multiple matching destinations:
{ platform:macOS, arch:arm64, id:00006001-001049DC2109801E }
{ platform:macOS, arch:x86_64, id:00006001-001049DC2109801E }
{ platform:macOS, arch:arm64, variant:Mac Catalyst, id:00006001-001049DC2109801E }
{ platform:macOS, arch:x86_64, variant:Mac Catalyst, id:00006001-001049DC2109801E }
{ platform:macOS, arch:arm64, variant:DriverKit, id:00006001-001049DC2109801E }
{ platform:DriverKit, name:Any DriverKit Host }
{ platform:iOS, id:dvtdevice-DVTiPhonePlaceholder-iphoneos:placeholder, name:Any iOS Device }
{ platform:iOS Simulator, id:dvtdevice-DVTiOSDeviceSimulatorPlaceholder-iphonesimulator:placeholder, name:Any iOS Simulator Device }
{ platform:macOS, name:Any Mac }
{ platform:macOS, variant:Mac Catalyst, name:Any Mac }
{ platform:tvOS, id:dvtdevice-DVTiOSDevicePlaceholder-appletvos:placeholder, name:Any tvOS Device, error:tvOS 16.0 is not installed. To use with Xcode, first download and install the platform }
{ platform:watchOS, id:dvtdevice-DVTiOSDevicePlaceholder-watchos:placeholder, name:Any watchOS Device, error:watchOS 9.0 is not installed. To use with Xcode, first download and install the platform }
{ platform:iOS Simulator, id:4E2D035C-381D-49FA-9840-166C7DE95A8B, OS:16.0, name:iPad (9th generation) }
{ platform:iOS Simulator, id:45ECB41A-3087-446E-A3F1-FC69100E3A43, OS:16.0, name:iPad Air (5th generation) }
{ platform:iOS Simulator, id:B8235904-B566-452B-9965-F039070A623A, OS:16.0, name:iPad Pro (9.7-inch) }
{ platform:iOS Simulator, id:F5C95D29-BAEE-4E34-880D-F3A30370E5F6, OS:16.0, name:iPad Pro (11-inch) (3rd generation) }
{ platform:iOS Simulator, id:703B802B-C40A-4E93-B01B-E89DA684896D, OS:16.0, name:iPad Pro (12.9-inch) (5th generation) }
{ platform:iOS Simulator, id:0AD1335D-C7CB-4774-9092-D5790040529B, OS:16.0, name:iPad mini (6th generation) }
{ platform:iOS Simulator, id:C76866CF-2CEB-41E2-A10C-1317ACF3676A, OS:16.0, name:iPhone 8 }
{ platform:iOS Simulator, id:C2CB38A7-78D6-4FBA-9200-C793CF23FE02, OS:16.0, name:iPhone 8 Plus }
{ platform:iOS Simulator, id:7F96AF11-D8C7-452F-88E0-D19413558343, OS:16.0, name:iPhone 11 }
{ platform:iOS Simulator, id:CD9698BE-177A-43C6-97B5-B2F2A5EBC989, OS:16.0, name:iPhone 11 Pro }
{ platform:iOS Simulator, id:28B69918-6683-4261-A24A-457EEED330DF, OS:16.0, name:iPhone 11 Pro Max }
{ platform:iOS Simulator, id:0F8241EF-1EE4-49A7-8912-2B42DC90CD40, OS:16.0, name:iPhone 12 }
{ platform:iOS Simulator, id:FA363849-543D-44CA-AC7A-4711BB4C6724, OS:16.0, name:iPhone 12 Pro }
{ platform:iOS Simulator, id:2A8E51FA-CE89-449E-A182-BAB98AE77697, OS:16.0, name:iPhone 12 Pro Max }
{ platform:iOS Simulator, id:3C349F63-CADD-4E73-832D-318AE15F75DF, OS:16.0, name:iPhone 12 mini }
{ platform:iOS Simulator, id:4E635B8C-7D66-4D25-9CE4-456834FE65A9, OS:16.0, name:iPhone 13 }
{ platform:iOS Simulator, id:FEDAB4B2-519F-4594-BC6D-17FAD116DA51, OS:16.0, name:iPhone 13 Pro }
{ platform:iOS Simulator, id:6A86FD6A-77AC-49C9-B943-C00DCEA96D2B, OS:16.0, name:iPhone 13 Pro Max }
{ platform:iOS Simulator, id:A00944B0-81BC-4791-8AE1-79209CF4A9DB, OS:16.0, name:iPhone 13 mini }
{ platform:iOS Simulator, id:14224567-AD97-4E3C-ACD6-DF01E814C11E, OS:16.0, name:iPhone 14 }
{ platform:iOS Simulator, id:4F88BC99-AC85-4B0D-843B-6DA286CA3C35, OS:16.0, name:iPhone 14 Plus }
{ platform:iOS Simulator, id:D7BB845C-76B4-490F-A851-15901861D2C8, OS:16.0, name:iPhone 14 Pro }
{ platform:iOS Simulator, id:7ADD6B5D-B1F0-4C21-8DC9-C9CC7D1B5507, OS:16.0, name:iPhone 14 Pro Max }
{ platform:iOS Simulator, id:51297DAF-F8D0-4CC1-9A69-8C07DA49849F, OS:16.0, name:iPhone SE (3rd generation) }

+------------------------------------------------+-------------------------------------------------------------------+
|                                              Summary for scan 2.210.1                                              |
+------------------------------------------------+-------------------------------------------------------------------+
| project                                        | ./AnimalYears.xcodeproj                                           |
| devices                                        | ["iPhone 14 Pro Max"]                                             |
| scheme                                         | AnimalYears-Package                                               |
| skip_detect_devices                            | false                                                             |
| ensure_devices_found                           | false                                                             |
| force_quit_simulator                           | false                                                             |
| reset_simulator                                | false                                                             |
| disable_slide_to_type                          | true                                                              |
| reinstall_app                                  | false                                                             |
| clean                                          | false                                                             |
| open_report                                    | false                                                             |
| output_directory                               | ./fastlane/test_output                                            |
| output_types                                   | html,junit                                                        |
| buildlog_path                                  | ~/Library/Logs/scan                                               |
| include_simulator_logs                         | false                                                             |
| xcodebuild_formatter                           | xcpretty                                                          |
| output_remove_retry_attempts                   | false                                                             |
| derived_data_path                              | /Users/davidfekke/Library/Developer/Xcode/DerivedData/AnimalYear  |
|                                                | s-dayuikxpsxpsdzetpvevoekrqzec                                    |
| should_zip_build_products                      | false                                                             |
| output_xctestrun                               | false                                                             |
| result_bundle                                  | false                                                             |
| use_clang_report_name                          | false                                                             |
| disable_concurrent_testing                     | false                                                             |
| skip_build                                     | false                                                             |
| slack_use_webhook_configured_username_and_icon | false                                                             |
| slack_username                                 | fastlane                                                          |
| slack_icon_url                                 | https://fastlane.tools/assets/img/fastlane_icon.png               |
| skip_slack                                     | false                                                             |
| slack_only_on_failure                          | false                                                             |
| xcodebuild_command                             | env NSUnbufferedIO=YES xcodebuild                                 |
| skip_package_dependencies_resolution           | false                                                             |
| disable_package_automatic_updates              | false                                                             |
| use_system_scm                                 | false                                                             |
| number_of_retries                              | 0                                                                 |
| fail_build                                     | true                                                              |
| xcode_path                                     | /Applications/Xcode.app                                           |
+------------------------------------------------+-------------------------------------------------------------------+

[15:29:21]: Disabling 'Slide to Type' iPhone 14 Pro Max
[15:29:21]: $ /usr/libexec/PlistBuddy -c "Add :KeyboardContinuousPathEnabled bool false" /Users/davidfekke/Library/Developer/CoreSimulator/Devices/7ADD6B5D-B1F0-4C21-8DC9-C9CC7D1B5507/data/Library/Preferences/com.apple.keyboard.ContinuousPath.plist >/dev/null 2>&1
[15:29:21]: $ set -o pipefail && env NSUnbufferedIO=YES xcodebuild -scheme AnimalYears-Package -project ./AnimalYears.xcodeproj -derivedDataPath /Users/davidfekke/Library/Developer/Xcode/DerivedData/AnimalYears-dayuikxpsxpsdzetpvevoekrqzec -destination 'platform=iOS Simulator,id=7ADD6B5D-B1F0-4C21-8DC9-C9CC7D1B5507' build test | tee '/Users/davidfekke/Library/Logs/scan/AnimalYears-AnimalYears-Package.log' | xcpretty  --report html --output '/Users/davidfekke/Documents/xcode/AnimalYears/fastlane/test_output/report.html' --report junit --output '/Users/davidfekke/Documents/xcode/AnimalYears/fastlane/test_output/report.junit' --report junit --output '/var/folders/1g/xfq3km511r9gjpgh1qk6ldvm0000gn/T/junit_report20221016-84929-prcaby'
[15:29:21]: ▸ Loading...
[15:29:22]: ▸ Processing ApolloAPI_Info.plist
[15:29:24]: ▸ Compiling Interface.swift
[15:29:24]: ▸ Compiling Object.swift
[15:29:24]: ▸ Compiling Union.swift
[15:29:24]: ▸ Compiling Selection+Conditions.swift
[15:29:24]: ▸ Compiling DataDict.swift
[15:29:24]: ▸ Compiling FragmentProtocols.swift
[15:29:24]: ▸ Compiling GraphQLEnum.swift
[15:29:24]: ▸ Compiling EnumType.swift
[15:29:24]: ▸ Compiling InputObject.swift
[15:29:24]: ▸ Compiling Selection.swift
[15:29:24]: ▸ Compiling SelectionSet.swift
[15:29:24]: ▸ Compiling JSON.swift
[15:29:24]: ▸ Compiling JSONDecodingError.swift
[15:29:24]: ▸ Compiling JSONStandardTypeConversions.swift
[15:29:24]: ▸ Compiling LocalCacheMutation.swift
[15:29:24]: ▸ Compiling OutputTypeConvertible.swift
[15:29:24]: ▸ Compiling ParentType.swift
[15:29:24]: ▸ Compiling ScalarTypes.swift
[15:29:24]: ▸ Compiling SchemaConfiguration.swift
[15:29:24]: ▸ Compiling SchemaMetadata.swift
[15:29:24]: ▸ Compiling GraphQLNullable.swift
[15:29:24]: ▸ Compiling GraphQLOperation.swift
[15:29:24]: ▸ Compiling InputValue.swift
[15:29:24]: ▸ Compiling AnyHashableConvertible.swift
[15:29:24]: ▸ Compiling CacheKeyInfo.swift
[15:29:24]: ▸ Compiling CacheReference.swift
[15:29:24]: ▸ Linking ApolloAPI
[15:29:24]: ▸ Compiling Record.swift
[15:29:24]: ▸ Compiling RecordSet.swift
[15:29:24]: ▸ Compiling RequestBodyCreator.swift
[15:29:24]: ▸ Compiling RequestChain.swift
[15:29:24]: ▸ Compiling RequestChainNetworkTransport.swift
[15:29:24]: ▸ Compiling GraphQLResponse.swift
[15:29:24]: ▸ Compiling GraphQLResponseGenerator.swift
[15:29:24]: ▸ Compiling GraphQLResult.swift
[15:29:24]: ▸ Compiling GraphQLResultAccumulator.swift
[15:29:24]: ▸ Compiling GraphQLResultNormalizer.swift
[15:29:24]: ▸ Compiling GraphQLSelectionSetMapper.swift
[15:29:24]: ▸ Compiling AutomaticPersistedQueryInterceptor.swift
[15:29:24]: ▸ Compiling Bundle+Helpers.swift
[15:29:24]: ▸ Compiling CacheReadInterceptor.swift
[15:29:24]: ▸ Compiling CacheWriteInterceptor.swift
[15:29:24]: ▸ Compiling Cancellable.swift
[15:29:24]: ▸ Compiling Collection+Helpers.swift
[15:29:24]: ▸ Compiling ResponseCodeInterceptor.swift
[15:29:24]: ▸ Compiling ResponsePath.swift
[15:29:24]: ▸ Compiling TaskData.swift
[15:29:24]: ▸ Compiling URLSessionClient.swift
[15:29:24]: ▸ Compiling UploadRequest.swift
[15:29:24]: ▸ Compiling DataLoader.swift
[15:29:24]: ▸ Compiling DefaultInterceptorProvider.swift
[15:29:24]: ▸ Compiling Dictionary+Helpers.swift
[15:29:24]: ▸ Compiling DispatchQueue+Optional.swift
[15:29:24]: ▸ Compiling GraphQLDependencyTracker.swift
[15:29:24]: ▸ Compiling GraphQLError.swift
[15:29:24]: ▸ Compiling JSONRequest.swift
[15:29:24]: ▸ Compiling JSONResponseParsingInterceptor.swift
[15:29:24]: ▸ Compiling JSONSerialization+Sorting.swift
[15:29:24]: ▸ Compiling JSONSerializationFormat.swift
[15:29:24]: ▸ Compiling MaxRetryInterceptor.swift
[15:29:24]: ▸ Compiling HTTPRequest.swift
[15:29:24]: ▸ Compiling HTTPResponse.swift
[15:29:24]: ▸ Compiling HTTPURLResponse+Helpers.swift
[15:29:24]: ▸ Compiling InMemoryNormalizedCache.swift
[15:29:24]: ▸ Compiling InputValue+Evaluation.swift
[15:29:24]: ▸ Compiling InterceptorProvider.swift
[15:29:24]: ▸ Compiling ApolloClient.swift
[15:29:24]: ▸ Compiling ApolloClientProtocol.swift
[15:29:24]: ▸ Compiling ApolloErrorInterceptor.swift
[15:29:24]: ▸ Compiling ApolloInterceptor.swift
[15:29:24]: ▸ Compiling ApolloStore.swift
[15:29:24]: ▸ Compiling Atomic.swift
[15:29:24]: ▸ Compiling MultipartFormData.swift
[15:29:24]: ▸ Compiling NetworkFetchInterceptor.swift
[15:29:24]: ▸ Compiling NetworkTransport.swift
[15:29:24]: ▸ Compiling NormalizedCache.swift
[15:29:24]: ▸ Compiling PossiblyDeferred.swift
[15:29:24]: ▸ Compiling GraphQLExecutor.swift
[15:29:24]: ▸ Compiling GraphQLFile.swift
[15:29:24]: ▸ Compiling GraphQLGETTransformer.swift
[15:29:24]: ▸ Compiling GraphQLHTTPMethod.swift
[15:29:24]: ▸ Compiling GraphQLHTTPRequestError.swift
[15:29:24]: ▸ Compiling GraphQLQueryWatcher.swift
[15:29:24]: Running Tests: ▸ Touching ApolloAPI.framework (in target 'ApolloAPI' from project 'AnimalYears')
[15:29:24]: ▸ Processing Apollo_Info.plist
[15:29:24]: ▸ Linking Apollo
[15:29:25]: Running Tests: ▸ Touching Apollo.framework (in target 'Apollo' from project 'AnimalYears')
[15:29:25]: ▸ Processing AnimalYears_Info.plist
[15:29:25]: ▸ Linking AnimalYears
[15:29:25]: ▸ Build Succeeded
[15:29:25]: ▸ Linking AnimalYearsTests
[15:29:25]: ▸ Processing AnimalYearsTests_Info.plist
[15:30:07]: ▸ All tests
[15:30:07]: ▸ Test Suite AnimalYearsTests.xctest started
[15:30:07]: ▸ AnimalYearsTests
[15:30:07]: ▸     ✓ testCalculateDogYearstohumanyears (0.002 seconds)
[15:30:07]: ▸     ✓ testCalculateDogYearstohumanyearsfor1and78lbs (0.001 seconds)
[15:30:07]: ▸     ✓ testCaluclateCatYears (0.001 seconds)
[15:30:07]: ▸ 	 Executed 3 tests, with 0 failures (0 unexpected) in 0.003 (0.004) seconds
[15:30:07]: ▸
[15:30:07]: ▸ 2022-10-16 15:30:07.809 xcodebuild[85053:3665062] [MT] IDETestOperationsObserverDebug: 42.348 elapsed -- Testing started completed.
[15:30:07]: ▸ 2022-10-16 15:30:07.809 xcodebuild[85053:3665062] [MT] IDETestOperationsObserverDebug: 0.000 sec, +0.000 sec -- start
[15:30:07]: ▸ 2022-10-16 15:30:07.809 xcodebuild[85053:3665062] [MT] IDETestOperationsObserverDebug: 42.348 sec, +42.348 sec -- end
[15:30:07]: ▸ Test Succeeded
+--------------------+---+
|      Test Results      |
+--------------------+---+
| Number of tests    | 3 |
| Number of failures | 0 |
+--------------------+---+

[15:30:11]: ------------------------------------------
[15:30:11]: --- Step: rm -rf AnimalYears.xcodeproj ---
[15:30:11]: ------------------------------------------
[15:30:11]: $ rm -rf AnimalYears.xcodeproj

+------+------------------------------+-------------+
|                 fastlane summary                  |
+------+------------------------------+-------------+
| Step | Action                       | Time (in s) |
+------+------------------------------+-------------+
| 1    | default_platform             | 0           |
| 2    | spm                          | 1           |
| 3    | run_tests                    | 50          |
| 4    | rm -rf AnimalYears.xcodeproj | 0           |
+------+------------------------------+-------------+

[15:30:11]: fastlane.tools finished successfully 🎉
```

Fastlane will also generate three report files under the following paths:

```
/fastlane/report.xml
/fastlane/test_output/report.html
/fastlane/test_output/report.junit
```
## Conclusion

I am not sure how I managed to build mobile apps for the last couple of years without using Fastlane. Fastlane incorporates many essential tools for building, testing and deploying your applications. It can also be extended to write your own plugins.

Fastlane is build on top of [Ruby](https://www.ruby-lang.org/en/), so it helps to have some experience with Ruby when working with Fastlane, but it is not necessary. If you want to write Fastlane plugins, it might come in handy to know a little Ruby.

