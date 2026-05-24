---
title: "AI Agent Skills"
description: "A practical introduction to AI Agent Skills, why they matter, how they work, and how to use them with tools like GitHub Copilot and VS Code."
category: "AI"
tags: ["AI", "AI Agents", "GitHub Copilot", "VS Code", "Agent Skills", "MCP", "LLM"]
date: 2026-05-24
cover_image: "./ai-image-skills.png"
---

<div style="text-align: center">
    <div class="relative overflow-hidden aspect-video">
        <iframe src="https://youtube.com/embed/uYXqWjOCh5E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" class="absolute inset-0 w-full h-full border-0" allowfullscreen></iframe>
    </div>
</div>

I recently gave a presentation to the JaxNode user group on AI Agent Skills. This post is based on that talk, cleaned up and reorganized into a blog format.

AI coding tools have changed a lot over the last couple of years. Early tools like GitHub Copilot were mostly used for code completion. Today, tools like GitHub Copilot, Claude Code, Cursor, Gemini CLI, Codex, and others can act more like agents. They can inspect your project, make changes across files, run commands, and help automate repeatable development workflows.

That is where Agent Skills become useful.

## Why AI Agent Skills Matter

Large language models are powerful, but they are limited by the context you give them. If you ask a model to generate code without giving it enough information about your project, your standards, or your workflow, it has to guess.

Sometimes those guesses are fine. Sometimes they are not.

One way to improve the output from an LLM is to give it better context. This is the same idea behind techniques like Retrieval Augmented Generation, or RAG. With RAG, you retrieve relevant information from a source like a vector database and provide it to the model as additional context.

Agent Skills solve a related problem. They let you package repeatable instructions, scripts, templates, and references into a reusable format that an AI coding agent can load when it needs them.

Instead of pasting the same prompt over and over again, you can turn that prompt into a skill.

## The Problem Skills Solve

There are a few common reasons you might want to use Agent Skills:

* You have domain-specific standards you want the agent to follow.
* You have repeatable workflows that you perform often.
* You want to reuse instructions across multiple projects.
* You want to reduce the number of back-and-forth iterations with the model.
* You want your AI coding assistant to behave more consistently.


This is especially helpful for software teams. If your team has a preferred way of writing tests, creating data access code, generating components, or scaffolding services, you can encode those preferences into a skill.

The goal is to make the model more useful by giving it the right instructions at the right time.

## Skills and Progressive Disclosure

Agent Skills use a concept called progressive disclosure.

The agent does not load every skill into the model context by default. That would waste tokens and could confuse the model. Instead, the agent first looks at the metadata for available skills. If the user asks for something that matches a skill description, the agent can then load the full skill instructions.

That usually works like this:

1. The agent starts a session.
2. It scans available skills and reads their metadata.
3. The user asks for a task.
4. If the task matches a skill description, the agent loads that skill.
5. The agent follows the skill instructions.
6. If needed, it runs bundled scripts or uses bundled resources.

This is useful because it keeps the default context smaller while still making specialized capabilities available when needed.

## What an Agent Skill Looks Like

At its core, an Agent Skill is just a folder.

Inside that folder is a `skill.md` file. That Markdown file contains front matter at the top, followed by instructions for the agent.

A minimal skill looks like this:

```markdown
---
name: roll-dice
description: Roll dice with a specified number of sides.
---

Use this skill when the user asks to roll dice.

To roll a six-sided die, run:

```bash
python scripts/roll_dice.py 6
```

To roll a twenty-sided die, run:

```bash
python scripts/roll_dice.py 20
```
```

The required fields are usually:

- `name`
- `description`

The rest of the file contains the instructions the agent should follow.

## A Typical Skill Folder Structure

A skill can include more than just the Markdown instructions. It can also include scripts, references, templates, and assets.

For example:

```text
my-skill/
├── skill.md
├── scripts/
│   └── generate_qr_code.py
├── references/
│   └── coding-standards.md
├── assets/
│   └── template.txt
└── README.md
```

The `skill.md` file should reference any supporting files directly so the agent knows where to find them.

## Installing Skills Globally

If you want a skill to be available across multiple projects, you can install it globally.

For example, with VS Code and GitHub Copilot, you can create a skills folder in your home directory:

```text
~/.agents/skills/
```

Each skill gets its own folder:

```text
~/.agents/skills/
├── roll-dice/
│   └── skill.md
└── generate-qr-code/
    └── skill.md
```

This makes those skills available outside of a single project.

## Installing Skills Locally in a Project

You can also install skills locally inside a project.

For GitHub Copilot in VS Code, you can create a `.github/skills` folder at the root of your project:

```text
.github/
└── skills/
    ├── roll-dice/
    │   └── skill.md
    └── generate-qr-code/
        └── skill.md
```

This is useful when the skill is specific to one repository.

For example, if you have a project-specific way of generating API clients, creating database migrations, or scaffolding UI components, that skill probably belongs in the project instead of your global skills folder.

## Example: A QR Code Skill

For the presentation, I created a simple skill that generates QR codes.

The skill had a `skill.md` file with front matter like this:

```markdown
---
name: generate-qr-code
description: Generate a QR code for a given text or URL and save it as an image file.
---
```

The skill also referenced a script that handled the actual QR code generation.

The idea was simple: instead of going to a website every time I wanted to create a QR code for a slide deck, I could ask the coding agent to generate one for me.

The skill could take a URL like this:

```text
https://www.apple.com
```

And generate an image file containing the QR code.

This is a good example of where skills shine. It is a small, repeatable task that can be automated and reused.

## Scripts Make Skills More Deterministic

One of the challenges with large language models is that they are non-deterministic. You can ask the same question multiple times and get different answers.

That can be useful for brainstorming, but it is not ideal for repeatable engineering tasks.

Skills can help by moving repeatable logic into scripts.

Instead of asking the model to generate a QR code script every time, you can write the script once and bundle it with the skill. The model then only needs to decide when and how to run the script.

That makes the workflow more predictable.

Scripts can be written in whatever language makes sense for your environment:

- Bash
- PowerShell
- Node.js
- Python
- Ruby
- Any executable script your environment supports

## Templates and Assets

Skills can also include templates.

Templates are useful when you want the agent to generate files in a consistent format. For example, a team could create templates for:

- React components
- API controllers
- SQL stored procedures
- Unit tests
- Data access objects
- Markdown documentation
- T4 templates
- Configuration files

If your team has a standard shape for a file, put that shape into a template and reference it from the skill.

This is another way to reduce ambiguity for the model.

## Best Practices for Writing Skills

Here are some best practices I covered in the talk.

### Keep Skills Focused

A skill should do one thing well.

If a skill tries to cover too many workflows, it becomes harder for the agent to know when to use it.

### Keep `skill.md` Concise

The recommendation I have seen is to keep the `skill.md` file under about 500 lines or under roughly 5,000 tokens.

The goal is to provide enough instruction to be useful without overwhelming the model.

### Prefer Defaults Over Menus

Do not make the agent ask the user to choose from a long list of options unless it really needs to.

Provide sensible defaults.

If your team always uses a certain test framework, folder structure, or naming convention, encode that default into the skill.

### Add a Gotchas Section

If you discover common mistakes, add a `Gotchas` section to the skill.

For example:

```markdown
## Gotchas

- Do not overwrite existing files unless the user explicitly asks.
- Always run the test suite after generating code.
- Use the existing project naming conventions.
- Prefer TypeScript over JavaScript in this repository.
```

This helps the skill improve over time.

### Improve Skills Through Real Use

Skills should evolve.

When an agent makes a mistake, do not just fix the generated code. Consider whether the skill should be updated so the mistake is less likely to happen again.

This is similar to improving documentation or refining a test suite. The skill becomes part of the project’s engineering process.

## Skills vs. MCP

Agent Skills and MCP solve different problems.

MCP, or Model Context Protocol, is a way to connect models to tools and external systems. It is useful when you want an agent to interact with APIs, databases, file systems, issue trackers, or other services.

Skills are more like packaged instructions and resources. They tell the agent how to perform a task, and they can include scripts or templates that the agent can use.

You can use both together.

For example:

- MCP can give the agent access to GitHub issues.
- A skill can tell the agent how your team wants issue summaries written.

## Where Skills Are Supported

Agent Skills are showing up across many AI coding tools and platforms. Some of the tools I mentioned in the talk include:

- GitHub Copilot
- Claude Code
- Cursor
- Gemini CLI
- Databricks
- Snowflake
- Other coding-agent environments

The important point is that skills are becoming a common pattern for extending coding agents.

## A Mental Model for Skills

A useful way to think about skills is this:

> A skill is reusable context plus optional executable resources.

The `description` tells the agent when to use the skill.

The `skill.md` file tells the agent how to perform the task.

The scripts, references, and assets help the agent complete the task consistently.

This makes skills a good fit for tasks that are:

- repeatable
- project-specific
- team-specific
- easy to describe
- improved by examples or templates
- better handled by deterministic scripts

## Why This Matters for AI Coding Costs

AI coding tools are becoming more powerful, but they are also becoming more expensive to run.

Many tools are moving toward usage-based pricing because agentic coding workflows can consume a lot of tokens. Every extra iteration costs time and compute.

Better context can reduce those iterations.

If a skill gives the agent the information it needs up front, the agent is less likely to wander through the codebase, make bad assumptions, or ask unnecessary follow-up questions.

That can save both time and money.

## Conclusion

Agent Skills are a practical way to make AI coding agents more useful.

They are not magic. They do not replace good engineering judgment. But they do provide a simple structure for capturing repeatable knowledge and making it available to your AI tools.

If you find yourself writing the same prompt over and over again, that might be a good candidate for a skill.

If your team has coding standards that agents frequently miss, that might be a good candidate for a skill.

If you have a workflow that combines instructions, scripts, and templates, that is probably a great candidate for a skill.

The best skills will likely start small and improve over time.

## Resources

- [Video recording](https://www.youtube.com/watch?v=uYXqWjOCh5E)
- [Agent Skills specification](https://agentskills.io/)
- [GitHub Copilot](https://github.com/features/copilot)
- [Model Context Protocol](https://modelcontextprotocol.io/)
