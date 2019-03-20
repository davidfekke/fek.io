---
layout: post
title: "Sharepoint Workflow and the System.ArgumentNullException when referenceing the WorkflowProperties"
category: "Blog"
date: 2011-01-17
---


I have been building Sharepoint Custom workflows this year and came across a nasty problem when I tried to reference the workflowProperties field in the onWorkflowActivated activity. I kept on getting a System.ArgumentNullException. The problem was actually a simple one to fix. I had not set the onWorkflowActivated property correctly to use the workflowProperties field. By the default when you replace this activity, it does not highlight that the workflowProperties need to be set to a field or property in your workflow.