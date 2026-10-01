import { defineI18n } from 'sveltekit-i18n/kit';
import type ja from './translations/ja.json';

export const locales = ['ja', 'en'];

type Schema = {
	[Key in keyof typeof ja as `site.${Key}`]: Record<string, never>;
};

export const { handle, load, use, get } = defineI18n(
	{
		initLocale: 'ja',
		fallbackLocale: 'ja',
		schema: {} as Schema,
		loaders: [
			{
				locale: locales,
				namespace: 'site',
				loader: async ({ locale }) => (await import(`./translations/${locale}.json`)).default
			}
		]
	},
	{ preferredLocale: (event) => event.params.lang }
);
