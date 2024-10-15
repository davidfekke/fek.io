import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({image}) => z.object({
		//layout: z.literal('BlogPost'),
		title: z.string(),
		description: z.string().optional(),
		// category: z.string().optional(),
		tags: z.array(z.string()).optional(),
		// Transform string to Date object
		date: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		cover_image: image().refine((img) => img.width >= 1080, {
      message: "Cover image must be at least 1080 pixels wide!",
    }),
	}),
});

export const collections = { blog };
