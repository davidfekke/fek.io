---
layout: post
title: "Sharepoint 2007 Custom Workflow Initiation form Gotcha"
category: "Blog"
date: 2011-01-17
---


I recently came across a nasty bug in Sharepoint 2007\. When a custom workflow uses an intiation form to collect data for the start of a workflow, it will only collect this form when the workflow is run manually.

Workflow intiation forms can be created using InfoPath or aspx pages to collect data that can be used in the workflowProperties.InitiationData property. This form is only presented to the user when the workflow is run manualy in Sharepoint 2007\. If you set the workflow to start automatically when an item is created or changed, Sharepoint will not present this form to collect the InitiationData.

There are a couple of work arounds you can use to get around this bug. One is you can set the InitiationData using an Association form when the workflow is first added to the Sharepoint list. You can also just make sure not to select the 'Start this workflow when a new item is created' or the 'Start this workflow when a new item is changed' check boxes.