import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({
		base: './src/content/blog',
		pattern: '**/*.{md,markdown}',
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			tags: z.array(z.string()).optional(),
			date: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
				cover_image: image().optional(),
		}),
});

export const collections = { blog };