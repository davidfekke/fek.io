---
title: "Fixing the broken iOS simulator in React Native when using zscaler"
description: ""
tags: ["zscaler", "iOS", "Simulator"]
category: 
date: 2023-04-10
cover_image: "./NTC-React-Native-2466236507.png"
---

If you are using [zscaler](https://www.zscaler.com/) and are trying to run the iOS simulator with the React Native metro server, you may have run into the issue of not being able to pull in content from your metro server while zscaler is running. Turning off `Internet Security` might allow this to work, but the real reason the simulator cannot access the metro server is because the simulator does not have the zscaler certificate installed. Here is how you can fix this in your simulator.

## Zscaler certificate

Zscaler has a security certificate that it installs on your computer to let you access resources on your zscaler network. You can download this certificate from zscaler on mobile devices by using the following URL: [https://mobile.zscaler.net/downloads/zscaler2048_sha256.crt](https://mobile.zscaler.net/downloads/zscaler2048_sha256.crt).

You can download this using your terminal using the following command:

```bash
$ curl https://mobile.zscaler.net/downloads/zscaler2048_sha256.crt --output ~/zscalerrootca.der
```

## Selecting the correct iOS simulator

Xcode installs many simulators, but generally you only run one at a time. The following command will show all of your simulators that are installed. 

```bash
$ xcrun simctl list devices
```

You should see a list that looks something like this:

```bash
== Devices ==
-- iOS 16.2 --
    iPhone SE (3rd generation) (1B53E6A9-522B-42FD-96CA-FECD651698F5) (Shutdown)
    iPhone 14 (04D2D6E0-A89E-4401-8809-FCE0982A4397) (Shutdown)
    iPhone 14 Plus (7860E3BC-8D14-47B1-B64F-41B405BF3054) (Shutdown)
    iPhone 14 Pro (6A686E6D-2A0A-4D2B-9B77-8517D97CCD4F) (Shutdown)
    iPhone 14 Pro Max (205ACFE7-18C2-4283-BE93-AB21CA1894F5) (Shutdown)
    iPad Air (5th generation) (EE9C9096-D588-4DF7-82AA-938119080A14) (Shutdown)
    iPad (10th generation) (08F02635-A08F-403C-828E-19527CB4BCBD) (Shutdown)
    iPad mini (6th generation) (2CF3CE52-A1F5-42BE-8BA3-1E65B68553F0) (Shutdown)
    iPad Pro (11-inch) (4th generation) (E0B10CB8-057E-49BF-9268-B1D3EA106CB7) (Shutdown)
    iPad Pro (12.9-inch) (6th generation) (00673013-72C8-4BE2-ACD9-83AD75841A1D) (Shutdown)
-- Unavailable: com.apple.CoreSimulator.SimRuntime.iOS-16-4 --
    iPhone 14 Pro (92DB7E6A-E7FB-4FE2-9859-B040A163B393) (Booted)
    iPhone SE (3rd generation) (D3120EBC-E125-46AC-830E-FC9D44144173) (Shutdown) (unavailable, runtime profile not found using "System" match policy)
    iPhone 14 (41EB4C16-3856-439D-9465-665B259D0911) (Shutdown) (unavailable, runtime profile not found using "System" match policy)
    iPhone 14 Plus (A0917104-9CDA-4084-9EDA-ED8E912DB3B4) (Shutdown) (unavailable, runtime profile not found using "System" match policy)
    iPhone 14 Pro Max (E1B79203-9C7A-4742-959B-A5A7A5CCC58C) (Shutdown) (unavailable, runtime profile not found using "System" match policy)
    iPad Air (5th generation) (D3933745-68D5-41BD-AE91-E12860254C5B) (Shutdown) (unavailable, runtime profile not found using "System" match policy)
    iPad (10th generation) (B9FCB2D1-5C12-418F-A0BB-7BB6B62F2FC4) (Shutdown) (unavailable, runtime profile not found using "System" match policy)
    iPad mini (6th generation) (2793C759-F546-4369-8783-B05A2F0B591E) (Shutdown) (unavailable, runtime profile not found using "System" match policy)
    iPad Pro (11-inch) (4th generation) (8242F1A3-D7EA-45FB-AEED-1B0313709788) (Shutdown) (unavailable, runtime profile not found using "System" match policy)
    iPad Pro (12.9-inch) (6th generation) (EF792F79-387D-461D-B780-94891A0EC2A2) (Shutdown) (unavailable, runtime profile not found using "System" match policy)
```

Look for a simulator that has `(Booted)` at the end of the line. This is the simulator that is running. You can now install that certificate into that simulator using the following command where the <sim_uuid> is the placeholder for the actual UUID of your simulator. In my case the UUID was 92DB7E6A-E7FB-4FE2-9859-B040A163B393:

```bash
xcrun simctl keychain <sim_uuid> add-root-cert ~/zscalerrootca.der
```

## Putting it all together in a shell script

If you have the simulator that you want to install the certificate running, you can use the following script to install the certificate automatically. 

```sh
#!/bin/bash

echo "** Downloading CA cert **"
curl https://mobile.zscaler.net/downloads/zscaler2048_sha256.crt --output ~/zscalerrootca.der

# Get the list of simulators
sim_list=$(xcrun simctl list devices)

# Regex to match the booted simulator
regex="([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}).*\((Booted)\)"

# Find the UUID of the booted simulator
sim_uuid=""

while IFS= read -r line; do
  if [[ $line =~ $regex ]]; then
    sim_uuid="${BASH_REMATCH[1]}"
    break
  fi
done <<< "$sim_list"

if [[ ! -z "$sim_uuid" ]]; then
  echo "Booted Simulator UUID: $sim_uuid"
  
  xcrun simctl keychain $sim_uuid add-root-cert ~/zscalerrootca.der
else
  echo "No booted simulator found."
fi
```

## Conclusion

Zscaler is a great tool for improving corporate security. Understanding how to install certificates onto your iOS simulator can help you whenever this impacts your iOS development. 