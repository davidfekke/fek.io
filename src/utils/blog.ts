import { url } from './url';

export function getBlogSlug(id: string) {
	return id.split('/').pop() ?? id;
}

export function getBlogPath(id: string) {
	return url(`/blog/${getBlogSlug(id)}/`);
}
