import { locales } from '$lib/i18n';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	if (!locales.includes(params.lang)) error(404);
	return { locale: params.lang };
};
