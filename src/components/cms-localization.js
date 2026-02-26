/**
 * Sveltia CMS UI Localizer - Production Version
 * Complete French localization using proven text-based approach
 */

// Immediate debug log
console.log("🚀 Sveltia CMS Localizer: Production version loaded");

// Complete French translation dictionary
const translations = {
	// Global toolbar elements
	"Visit Live Site": "Visiter le Site Web",
	Contents: "Contenu",
	Content: "Contenu", // Alternative
	Assets: "Ressources",
	"Search for entries...": "Rechercher des entrées...",
	"Create Entry or Assets": "Créer une Entrée ou des Ressources",
	"Show Account Menu": "Afficher le Menu Compte",

	// Collections section
	Collections: "Collections",
	entries: "entrées",
	entry: "entrée",

	// Collection toolbar
	"Delete Selected Entries": "Supprimer les Entrées Sélectionnées",
	Delete: "Supprimer", // Abbreviated version
	"Create New Entry": "Créer une Nouvelle Entrée",
	New: "Nouveau", // Abbreviated version
	"Select All": "Tout Sélectionner",
	Sort: "Trier",
	"Show Assets": "Afficher les Ressources",

	// View controls
	"List View": "Vue Liste",
	"Grid View": "Vue Grille",

	// Status message templates
	"You're now viewing the": "Vous consultez maintenant la",
	"collection, which has": "collection, qui contient",

	// Modal dialog titles
	"Upload New Assets": "Téléverser de Nouvelles Ressources",
	"Translate Field": "Traduire le Champ",
	"Delete Entries": "Supprimer les Entrées",
	"Edit Slug": "Modifier le Slug",
	"Delete Entry": "Supprimer l'Entrée",
	Error: "Erreur",
	"Restore Draft": "Restaurer le Brouillon",
	"Keyboard Shortcuts": "Raccourcis Clavier",
	Settings: "Paramètres",

	// Asset management
	Upload: "Téléverser",
	"Choose file": "Choisir un fichier",
	"Drag and drop files here": "Glissez et déposez les fichiers ici",
	"Select all": "Tout sélectionner",
};

console.log(
	"📚 Loaded complete French translations:",
	Object.keys(translations).length,
);

// Translation statistics
const translationStats = {
	totalElements: 0,
	translatedElements: 0,
	translationsApplied: {},
};

// Safe translation function
function safeTranslateElement(element, translation) {
	if (!element || !translation) return false;

	// Safety checks
	if (
		element.hasAttribute("data-no-translate") ||
		element.closest("[data-user-content]") ||
		element.closest("script, style")
	) {
		return false;
	}

	// Avoid translating form inputs that contain user data
	if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
		if (element.value && element.value !== element.defaultValue) {
			return false; // Don't translate user-entered data
		}
	}

	try {
		element.textContent = translation;
		return true;
	} catch (error) {
		console.warn("❌ Translation failed for element:", error);
		return false;
	}
}

// Find and translate elements by their text content
function translateByText(targetText) {
	if (!translations[targetText]) return 0;

	const allElements = document.querySelectorAll("*");
	let translated = 0;

	for (const element of allElements) {
		const text = element.textContent?.trim();
		if (text === targetText) {
			if (safeTranslateElement(element, translations[targetText])) {
				translated++;
				translationStats.translationsApplied[targetText] =
					(translationStats.translationsApplied[targetText] || 0) + 1;
			}
		}
	}

	if (translated > 0) {
		console.log(
			`✅ "${targetText}" → "${translations[targetText]}" (${translated} elements)`,
		);
	}

	return translated;
}

// Translate all elements
function applyAllTranslations() {
	console.log("🔄 Applying complete French translations...");

	translationStats.totalElements = Object.keys(translations).length;
	translationStats.translatedElements = 0;

	// Apply translations in logical order
	const translationOrder = [
		// Core navigation first
		"Collections",
		"Assets",
		"Contents",

		// Toolbar actions
		"Delete Selected Entries",
		"Delete",
		"Create New Entry",
		"New",
		"Select All",
		"Sort",
		"Show Assets",

		// View controls
		"List View",
		"Grid View",

		// Global toolbar
		"Visit Live Site",
		"Search for entries...",
		"Create Entry or Assets",
		"Show Account Menu",

		// Collection counts
		"entries",
		"entry",

		// Modal titles
		"Upload New Assets",
		"Translate Field",
		"Delete Entries",
		"Edit Slug",
		"Delete Entry",
		"Error",
		"Restore Draft",
		"Keyboard Shortcuts",
		"Settings",

		// Asset actions
		"Upload",
		"Choose file",
		"Drag and drop files here",
		"Select all",

		// Status templates
		"You're now viewing the",
		"collection, which has",
	];

	for (const key of translationOrder) {
		const count = translateByText(key);
		if (count > 0) {
			translationStats.translatedElements++;
		}
	}

	// Report results
	console.log("🎉 Translation complete!");
	console.log(
		`📊 Results: ${translationStats.translatedElements}/${translationStats.totalElements} translation keys applied`,
	);
	console.log("📈 Detailed stats:", translationStats.translationsApplied);

	return translationStats;
}

// Wait for CMS to load, then apply translations
function initializeLocalization() {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => {
			setTimeout(applyAllTranslations, 1500); // Wait for CMS to fully initialize
		});
	} else {
		setTimeout(applyAllTranslations, 1500);
	}
}

// Start localization
console.log(
	"⏰ Scheduling French localization for 1.5 seconds after CMS load...",
);
initializeLocalization();
