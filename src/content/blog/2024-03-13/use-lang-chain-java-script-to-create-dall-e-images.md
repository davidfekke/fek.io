---
title: "LangChain for JavaScript part 3: Create Dall-E images"
description: ""
category: 
date: 2024-03-13
cover_image: "./426efd3d-4041-491d-8cff-ee298dceb114.png"
---

The [LangChain framework](https://www.langchain.com/) for [JavaScript and TypeScript](https://js.langchain.com/docs/get_started/introduction/) recently added tool support for the [Dall-E image generation](https://js.langchain.com/docs/integrations/tools/dalle). OpenAI's [Dall-E](https://openai.com/dall-e-3) tool was recently upgraded to version 3. Dall-E support has been in the Python version of LangChain, but was recently added to their JavaScript module. Both Python and TypeScript/JavaScript versions have a class called the `DallEAPIWrapper`. Once this class has been created in your code, you can use it to generate new images, or be part of a chain.

Here is a simple example below on how to use the `DallEAPIWrapper` in a Node.js app. This assumes that you have an OpenAI account and an environment variable with your `OPENAI_API_KEY`.

```javascript
import { promises as fsp } from 'fs';
import { DallEAPIWrapper } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { Buffer } from 'buffer';
import { v4 as generateUUID } from 'uuid';

function generateFilename() {
    return `${generateUUID()}.png`;
}

const headline = `LangChain for JavaScript part 1`;

const imagePrompt = PromptTemplate.fromTemplate(`
To generate a creative header image using Dall-E based on your blog post's headline and body text, we can design a flexible prompt that incorporates key elements of your blog. Here's how you can structure your prompt, making it adaptable to any blog post by substituting your specific headlines and text:

### Dall-E Prompt Template

**Title of the Blog Post**: {headline}

**Preferred Color Scheme and Art Style**: Bright and vibrant colors to emphasize growth and sustainability; a blend of digital art and watercolor styles for a modern yet organic feel

**Mood or Atmosphere of the Image**: Inspiring and uplifting, showcasing harmony between urban life and nature

Make sure to not include the Title of the Blog Post in the image. The image should be a visual representation of the blog post's content and theme.
`);

async function main() {
    const tool = new DallEAPIWrapper({
        n: 1, // Default
        modelName: "dall-e-3", // Default
        openAIApiKey: process.env.OPENAI_API_KEY, 
        size: "1792x1024"
    });
      
    const prompt = await imagePrompt.format({ headline }); 
    const imageURL = await tool.invoke(prompt);
    const filename = generateFilename();
    const arrayBuf = await fetch(imageURL).then(res => res.arrayBuffer());
    await fsp.writeFile(filename, Buffer.from(arrayBuf));
}

main().catch(console.error);
```

*The script in this example was used to create the image at the top of this post.*

## Creating the prompt

Let's take a deep dive on the image generation script. We are importing the `DallEAPIWrapper` from the `@langchain/openai` NPM module and we are importing the PromptTemplate from `@langchain/core/prompts` NPM module. We use the PromptTemplate to define a prompt for generating an image. The more information you give the prompt, the better the result will be from Dall-E. The prompt template allows us to pass variable values into our prompt. In the example above we pass a `{headline}`. The prompt template will delimit variable names with curly braces. When we format the prompt, we will pass any variables into the prompt at that time.

Something else we can observe from the prompt is that along with the title, we are also adding descriptions for the preferred color scheme, and suggesting a mood and atmosphere. I am also explicitly asking Dall-E not to include the headline in the image because I am overlaying the headline on top of my image with my blog engine's CSS styling.

## Creating the Dall-E API image tool

When creating the Dall-E wrapper tool in our application, it takes an object as the initialization parameter. The TypeScript type for this parameter can take the following values:

```TypeScript
/**
 * An interface for the Dall-E API Wrapper.
 */
export interface DallEAPIWrapperParams extends ToolParams {
    /**
     * The OpenAI API key
     */
    openAIApiKey?: string;
    /**
     * The model to use.
     * @params "dall-e-2" | "dall-e-3"
     * @default "dall-e-3"
     */
    modelName?: string;
    /**
     * The style of the generated images. Must be one of vivid or natural.
     * Vivid causes the model to lean towards generating hyper-real and dramatic images.
     * Natural causes the model to produce more natural, less hyper-real looking images.
     * @default "vivid"
     */
    style?: "natural" | "vivid";
    /**
     * The quality of the image that will be generated. ‘hd’ creates images with finer
     * details and greater consistency across the image.
     * @default "standard"
     */
    quality?: "standard" | "hd";
    /**
     * The number of images to generate.
     * Must be between 1 and 10.
     * For dall-e-3, only `n: 1` is supported.
     * @default 1
     */
    n?: number;
    /**
     * The size of the generated images.
     * Must be one of 256x256, 512x512, or 1024x1024 for DALL·E-2 models.
     * Must be one of 1024x1024, 1792x1024, or 1024x1792 for DALL·E-3 models.
     * @default "1024x1024"
     */
    size?: "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792";
    /**
     * The format in which the generated images are returned.
     * Must be one of "url" or "b64_json".
     * @default "url"
     */
    responseFormat?: "url" | "b64_json";
    /**
     * A unique identifier representing your end-user, which will help
     * OpenAI to monitor and detect abuse.
     */
    user?: string;
    /**
     * The organization to use
     */
    organization?: string;
}
```

As we can see from the interface above, the wrapper can take values for the `OPENAI_API_KEY`, the type of model, style, quality, (n) number of images, image size and response format. If you do not supply any of these parameters, it will default to the following:

```TypeScript
const tool = new DallEAPIWrapper({
    openAIApiKey: process.env.OPENAI_API_KEY
    modelName: "dall-e-3",
    style: "vivid",
    quality: "standard",
    n: 1,
    size: "1024x1024",
    responseFormat: "url"
});
```

## Generating the image

Once we have our wrapper configured, we can use the tool to generate the image be either calling the `invoke` functions or the `call` function. The function takes one parameter, which is the input from out prompt.

## Monitor your token usage

Generating images from Dall-E takes a lot of compute resources. OpenAI recently changed the way they charge for token usage. You can not prepay for tokens.

Generating the image that I used for this post cost me about $0.08 US.

## Conclusion

One of the powerful things about LangChain is the ability to chain these different components and tools together to create AI powered software. As we can see from the example above I was able to create image for my blog post very easily using some of the built in tools available in LangChain.

