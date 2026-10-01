import { redirect } from '@sveltejs/kit';
import { matchLocale } from 'sveltekit-i18n/utils';
import { locales } from '$lib/i18n';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ request }) => {
	const locale = matchLocale(request.headers.get('accept-language'), locales) ?? 'ja';
	redirect(307, `/${locale}`);
};
