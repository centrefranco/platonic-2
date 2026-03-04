// locales settings for this theme
// Set the languages you want to support on your site.

export const DEFAULT_LOCALE_SETTING: string = "fr";

interface LocaleSetting {
	[key: Lowercase<string>]: {
		label: string;
		lang?: string;
		dir?: "rtl" | "ltr";
		flag?: string;
	};
} // refer: https://starlight.astro.build/reference/configuration/#locales

export const LOCALES_SETTING: LocaleSetting = {
	fr: {
		label: "Francais",
		lang: "fr-CA",
		flag: "openmoji:flag-canada",
	},
};
