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
	"Search for entries…": "Rechercher des entrées…",
	"Create Entry or Assets": "Créer une Entrée ou des Ressources",
	"Show Account Menu": "Afficher le Menu Compte",

	// Actual toolbar element text found via debugging
	add: "Créer une Entrée ou des Ressources", // "Create Entry or Assets" button
	account_circle: "Afficher le Menu Compte", // "Show Account Menu" button
	photo_library: "Ressources", // "Assets" tab/button
	"edit New": "Créer une Nouvelle Entrée", // Combined "Create New Entry" text
	"Sort  arrow_drop_down": "Trier", // "Sort" with dropdown icon
	Save: "Sauvegarder",

	// Collections section
	Collections: "Collections",
	Posts: "Articles",
	Categories: "Catégories",
	Tags: "Étiquettes",
	Authors: "Auteurs",
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
console.log(
	"🔑 Sample translation keys:",
	Object.keys(translations).slice(0, 5).join(", "),
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
	let found = 0;

	for (const element of allElements) {
		const text = element.textContent?.trim();
		if (text === targetText) {
			found++;
			if (safeTranslateElement(element, translations[targetText])) {
				translated++;
				translationStats.translationsApplied[targetText] =
					(translationStats.translationsApplied[targetText] || 0) + 1;
			} else {
				console.log(
					`❌ Failed to translate "${targetText}" on element:`,
					element.tagName,
					element.className,
				);
			}
		}
	}

	if (translated > 0) {
		console.log(
			`✅ "${targetText}" → "${translations[targetText]}" (${translated} elements)`,
		);
	} else if (found > 0) {
		console.log(
			`⚠️ Found ${found} "${targetText}" elements but none translated`,
		);
	}

	return translated;
}

// Debug function to find all translatable elements on page
function debugFindElements() {
	console.log("🔍 DEBUG: Finding all translatable elements...");

	const foundElements = [];
	const allElements = document.querySelectorAll("*");

	for (const element of allElements) {
		const text = element.textContent?.trim();
		if (text && text.length > 1 && text.length < 50) {
			// Check if this text should be translated (either exact match or in our dictionary)
			if (translations[text]) {
				foundElements.push({
					text: text,
					translation: translations[text],
					tagName: element.tagName,
					classes: element.className || "no-classes",
				});
			}
		}
	}

	console.log(`📋 Found ${foundElements.length} translatable elements:`);
	for (const item of foundElements.slice(0, 15)) {
		console.log(`  "${item.text}" (${item.tagName}.${item.classes})`);
	}

	// Also log ALL text content to see what elements exist
	console.log("📝 ALL visible text elements on page:");
	const allTextElements = [];
	for (const element of allElements) {
		const text = element.textContent?.trim();
		if (
			text &&
			text.length > 1 &&
			text.length < 30 &&
			element.offsetWidth > 0
		) {
			allTextElements.push(`"${text}"`);
		}
	}
	console.log("  ", allTextElements.slice(0, 30).join(", "));

	// Check for specific elements that should exist
	console.log("🔍 Checking for specific toolbar elements:");
	const toolbarElements = document.querySelectorAll(
		'.sui-toolbar button, [role="button"]',
	);
	for (const el of toolbarElements) {
		const text = el.textContent?.trim();
		if (text) {
			console.log(`  Toolbar button: "${text}"`);
		}
	}

	console.log(`Found ${foundElements.length} translatable elements:`);
	for (const item of foundElements.slice(0, 10)) {
		console.log(`  "${item.text}" (${item.tagName}.${item.classes})`);
	}

	return foundElements;
}

// Translate all elements
function applyAllTranslations() {
	console.log("🔄 Applying complete French translations...");

	// First, debug what elements are actually on the page
	debugFindElements();

	translationStats.totalElements = Object.keys(translations).length;
	translationStats.translatedElements = 0;

	// Apply translations in logical order
	const translationOrder = [
		// Core navigation first
		"Collections",
		"Posts",
		"Categories",
		"Tags",
		"Authors",
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

		// Additional elements
		"Sign In with GitHub",
		"More Options",
		"Work with Local Repository",
		"Click the button to select the root directory",
		"Welcome to Sveltia CMS",
		"Sign In Using Personal Access Token",
		"Publish",
		"Unpublish",
		"Draft",
		"Published",
		"Save Draft",
		"Discard Changes",
		"Cancel",
		"Save",
		"Close",
		"Loading...",
		"No entries found",
		"Search",
		"Filter",
		"All",
		"None",
		"Required field",
		"Invalid value",
		"Field is required",
		"Value must be unique",
	];

	for (const key of translationOrder) {
		const count = translateByText(key);
		if (count > 0) {
			translationStats.translatedElements++;
		}
	}

	// Translate placeholders separately
	console.log("🏷️ Translating placeholders...");
	const inputs = document.querySelectorAll(
		"input[placeholder], textarea[placeholder]",
	);
	console.log(`Found ${inputs.length} inputs with placeholders`);

	for (const input of inputs) {
		const placeholder = input.getAttribute("placeholder")?.trim();
		if (placeholder) {
			console.log(
				`  Input placeholder: "${placeholder}" (length: ${placeholder.length})`,
			);
			console.log(`  Looking for translation key: "${placeholder}"`);
			console.log(`  Has translation: ${!!translations[placeholder]}`);
			if (translations[placeholder]) {
				input.setAttribute("placeholder", translations[placeholder]);
				console.log(
					`✅ Translated placeholder "${placeholder}" → "${translations[placeholder]}"`,
				);
			} else {
				console.log(
					`❌ No translation found for placeholder: "${placeholder}"`,
				);
			}
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
