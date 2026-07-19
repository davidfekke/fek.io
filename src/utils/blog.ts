export function getBlogSlug(id: string) {
	return id.split('/').pop() ?? id;
}

export function getBlogPath(id: string) {
	return `/blog/${getBlogSlug(id)}/`;
}