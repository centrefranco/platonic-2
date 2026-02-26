/**
 * Translation Manager for Sveltia CMS Admin UI
 * Loads French translations with English fallback
 */

import { enTranslations } from "./en.js";
import { frTranslations } from "./fr.js";

class TranslationManager {
	constructor() {
		this.translations = {};
		this.primaryLocale = "fr";
		this.fallbackLocale = "en";
	}

	async loadTranslations() {
		try {
			// Try to load French first
			this.translations = { ...frTranslations };
			console.log(
				`✅ Loaded French translations (${Object.keys(this.translations).length} keys)`,
			);
			return this.translations;
		} catch (frError) {
			console.warn("❌ Failed to load French translations:", frError);

			try {
				// Fallback to English
				this.translations = { ...enTranslations };
				console.log(
					`⚠️ Using English fallback translations (${Object.keys(this.translations).length} keys)`,
				);
				return this.translations;
			} catch (enError) {
				console.error("❌ Failed to load any translations:", enError);
				return {};
			}
		}
	}

	getTranslations() {
		return this.translations;
	}

	// Utility method to check if translations loaded
	hasTranslations() {
		return Object.keys(this.translations).length > 0;
	}

	// Get translation with fallback
	get(key, fallback = key) {
		return this.translations[key] || fallback;
	}
}

// Export singleton instance
export const translationManager = new TranslationManager();
