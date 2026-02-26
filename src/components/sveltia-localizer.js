/**
 * Sveltia CMS UI Localizer - French Translation
 * Implements selective targeting with MutationObserver for reliable localization
 */

class SveltiaCMSLocaizer {
	constructor() {
		this.translations = {
			// Core UI elements with selective targeting
			Save: "Sauvegarder",
			Cancel: "Annuler",
			Delete: "Supprimer",
			Edit: "Modifier",
			New: "Nouveau",
			Create: "Créer",
			Update: "Mettre à jour",
			Close: "Fermer",
			Back: "Retour",
			Next: "Suivant",
			Previous: "Précédent",

			// Navigation and sections
			Collections: "Collections",
			Contents: "Contenu",
			Assets: "Ressources",
			Settings: "Paramètres",
			Media: "Médias",
			Workflow: "Flux de travail",

			// Collection actions
			"Create new entry": "Créer une nouvelle entrée",
			"Delete selected entries": "Supprimer les entrées sélectionnées",
			Duplicate: "Dupliquer",
			"Move to...": "Déplacer vers...",
			Status: "Statut",

			// Form elements
			Title: "Titre",
			Description: "Description",
			Content: "Contenu",
			Slug: "Slug",
			Date: "Date",
			Author: "Auteur",
			Tags: "Étiquettes",
			Categories: "Catégories",

			// Status messages
			"Entry saved": "Entrée sauvegardée",
			"Entry deleted": "Entrée supprimée",
			"Entry created": "Entrée créée",
			"Changes saved": "Modifications sauvegardées",
			"Loading...": "Chargement...",
			"Saving...": "Sauvegarde...",
			"Deleting...": "Suppression...",

			// Error messages
			"Required field": "Champ obligatoire",
			"Invalid format": "Format invalide",
			"Network error": "Erreur réseau",
			"Permission denied": "Permission refusée",

			// Modal dialogs
			Confirm: "Confirmer",
			"Are you sure?": "Êtes-vous sûr ?",
			"This action cannot be undone": "Cette action ne peut pas être annulée",
			Yes: "Oui",
			No: "Non",
			OK: "OK",

			// Asset management
			Upload: "Téléverser",
			"Choose file": "Choisir un fichier",
			"Drag and drop files here": "Glissez et déposez les fichiers ici",
			"Select all": "Tout sélectionner",
			"Deselect all": "Tout désélectionner",
		};

		this.selectors = {
			// Toolbar buttons - position-based for reliability
			"toolbar-save": ".sui-toolbar button:first-child:not([disabled])",
			"toolbar-delete": ".sui-toolbar button:has(.icon-delete)",
			"toolbar-new": ".sui-toolbar button:has(.icon-add)",

			// Navigation elements
			"nav-collections": 'nav [role="tab"]:nth-child(1)',
			"nav-contents": 'nav [role="tab"]:nth-child(2)',
			"nav-assets": 'nav [role="tab"]:nth-child(3)',

			// Status messages and alerts
			"status-message": '[aria-live="polite"], [role="status"]',
			"error-message": ".sui-alert, .error-message",

			// Form labels - more specific targeting
			"title-label": "label",
			"description-label": "label",

			// Modal elements
			"modal-save": ".sui-modal .sui-modal-footer button:first-child",
			"modal-cancel": ".sui-modal .sui-modal-footer button:last-child",

			// Search and filters
			"search-input": 'input[placeholder*="search" i]',
			"filter-select": 'select:has(option[value*="filter"])',
		};

		this.observer = null;
		this.isInitialized = false;
		this.debounceTimer = null;

		this.init();
	}

	init() {
		console.log(
			"🔄 Sveltia CMS Localizer: Initializing French translations...",
		);

		// Wait for CMS to fully load before starting
		this.waitForCMSLoad()
			.then(() => {
				console.log(
					"✅ Sveltia CMS Localizer: CMS detected, applying translations...",
				);
				this.applyTranslations();

				// Set up continuous monitoring for dynamic content
				this.setupObserver();

				this.isInitialized = true;
				console.log("🎉 Sveltia CMS Localizer: French localization active!");
			})
			.catch((error) => {
				console.error("❌ Sveltia CMS Localizer: Failed to initialize:", error);
			});
	}

	waitForCMSLoad() {
		return new Promise((resolve, reject) => {
			let attempts = 0;
			const maxAttempts = 100; // 10 seconds at 100ms intervals

			const checkCMS = () => {
				attempts++;

				// Check for multiple CMS indicators
				const cmsContainer =
					document.querySelector("#nc-root") ||
					document.querySelector(".sui-app-shell") ||
					document.querySelector('[class*="app-shell"]');

				const cmsLoaded =
					cmsContainer &&
					cmsContainer.children.length > 0 &&
					!document.querySelector('.loading, [aria-label*="loading" i]');

				if (cmsLoaded) {
					resolve();
				} else if (attempts >= maxAttempts) {
					reject(new Error("CMS failed to load within timeout"));
				} else {
					setTimeout(checkCMS, 100);
				}
			};

			checkCMS();
		});
	}

	applyTranslations() {
		try {
			// Apply translations in phases for better error isolation
			this.translateCoreUI();
			this.translateNavigation();
			this.translateForms();
			this.translateMessages();
			this.translateModals();

			// Fallback: direct text replacement for remaining elements
			this.applyDirectTextReplacements();
		} catch (error) {
			console.error(
				"❌ Sveltia CMS Localizer: Translation application failed:",
				error,
			);
		}
	}

	translateCoreUI() {
		// Toolbar buttons - most critical UI elements
		this.translateSelector(this.selectors["toolbar-save"], "Save");
		this.translateSelector(this.selectors["toolbar-delete"], "Delete");
		this.translateSelector(this.selectors["toolbar-new"], "New");

		// Additional toolbar buttons
		const toolbarButtons = document.querySelectorAll(".sui-toolbar button");
		for (const button of toolbarButtons) {
			const text = button.textContent?.trim();
			if (text && this.translations[text]) {
				this.safeTranslateElement(button, this.translations[text]);
			}
		}
	}

	translateNavigation() {
		// Navigation tabs
		this.translateSelector(this.selectors["nav-collections"], "Collections");
		this.translateSelector(this.selectors["nav-contents"], "Contents");
		this.translateSelector(this.selectors["nav-assets"], "Assets");

		// All navigation elements
		const navElements = document.querySelectorAll(
			'nav [role="tab"], nav a, .sui-nav-item',
		);
		for (const element of navElements) {
			const text = element.textContent?.trim();
			if (text && this.translations[text]) {
				this.safeTranslateElement(element, this.translations[text]);
			}
		}
	}

	translateForms() {
		// Form labels - check all labels for translatable text
		this.translateSelector(this.selectors["title-label"], null);
		this.translateSelector(this.selectors["description-label"], null);

		// All form labels
		const labels = document.querySelectorAll("label, legend");
		for (const label of labels) {
			const text = label.textContent?.trim();
			if (text && this.translations[text]) {
				this.safeTranslateElement(label, this.translations[text]);
			}
		}

		// Input placeholders
		this.translateSelector(this.selectors["search-input"], null);
	}

	translateMessages() {
		// Status messages
		this.translateSelector(this.selectors["status-message"], null); // Check all status messages
		this.translateSelector(this.selectors["error-message"], null);

		// All status and alert elements
		const messages = document.querySelectorAll(
			'[aria-live], [role="status"], .alert, .message',
		);
		for (const message of messages) {
			const text = message.textContent?.trim();
			if (text && this.translations[text]) {
				this.safeTranslateElement(message, this.translations[text]);
			}
		}
	}

	translateModals() {
		// Modal buttons
		this.translateSelector(this.selectors["modal-save"], "Save");
		this.translateSelector(this.selectors["modal-cancel"], "Cancel");

		// All modal content
		const modals = document.querySelectorAll('.sui-modal, [role="dialog"]');
		for (const modal of modals) {
			const elements = modal.querySelectorAll("button, h1, h2, h3, p, span");
			for (const element of elements) {
				const text = element.textContent?.trim();
				if (text && this.translations[text] && text.length < 50) {
					// Avoid long content
					this.safeTranslateElement(element, this.translations[text]);
				}
			}
		}
	}

	applyDirectTextReplacements() {
		// Fallback: walk the DOM and replace known text strings
		const walker = document.createTreeWalker(
			document.body,
			NodeFilter.SHOW_TEXT,
			{
				acceptNode: (node) => {
					const text = node.textContent?.trim();
					return text && this.translations[text] && text.length < 30
						? NodeFilter.FILTER_ACCEPT
						: NodeFilter.FILTER_SKIP;
				},
			},
		);

		const nodesToTranslate = [];
		let node;
		while (true) {
			node = walker.nextNode();
			if (!node) break;
			nodesToTranslate.push(node);
		}

		for (const textNode of nodesToTranslate) {
			const text = textNode.textContent?.trim();
			if (text && this.translations[text]) {
				textNode.textContent = textNode.textContent.replace(
					text,
					this.translations[text],
				);
			}
		}
	}

	translateSelector(selector, expectedText = null) {
		try {
			const elements = document.querySelectorAll(selector);
			for (const element of elements) {
				if (expectedText) {
					// Specific translation
					if (element.textContent?.trim() === expectedText) {
						this.safeTranslateElement(element, this.translations[expectedText]);
					}
				} else {
					// Check if element text matches any translation
					const text = element.textContent?.trim();
					if (text && this.translations[text]) {
						this.safeTranslateElement(element, this.translations[text]);
					}
				}
			}
		} catch (error) {
			console.warn(
				`Sveltia CMS Localizer: Selector failed ${selector}:`,
				error,
			);
		}
	}

	safeTranslateElement(element, translation) {
		if (!element || !translation) return;

		// Safety checks
		if (
			element.hasAttribute("data-no-translate") ||
			element.closest("[data-user-content]") ||
			element.closest("script, style")
		) {
			return;
		}

		// Avoid translating form inputs that contain user data
		if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
			if (element.value && element.value !== element.defaultValue) {
				return; // Don't translate user-entered data
			}
		}

		try {
			element.textContent = translation;
		} catch (error) {
			console.warn(
				"Sveltia CMS Localizer: Failed to translate element:",
				error,
			);
		}
	}

	setupObserver() {
		if (this.observer) {
			this.observer.disconnect();
		}

		const config = {
			childList: true, // Watch for added/removed elements
			subtree: true, // Watch entire CMS subtree
			attributes: false, // Don't watch attribute changes (performance)
			characterData: false, // Don't watch text changes (performance)
		};

		this.observer = new MutationObserver(
			this.debounce(this.handleMutations.bind(this), 150),
		);

		// Observe only the CMS container for better performance
		const cmsContainer =
			document.querySelector("#nc-root") ||
			document.querySelector(".sui-app-shell") ||
			document.body;

		this.observer.observe(cmsContainer, config);
	}

	handleMutations(mutations) {
		let needsTranslation = false;

		for (const mutation of mutations) {
			if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
				for (const node of mutation.addedNodes) {
					if (this.isTranslatableElement(node)) {
						needsTranslation = true;
						break;
					}
				}
			}
		}

		if (needsTranslation) {
			this.applyTranslations();
		}
	}

	isTranslatableElement(node) {
		if (node.nodeType !== Node.ELEMENT_NODE) return false;

		const element = node;

		// Quick checks for elements that likely need translation
		return (
			element.matches(
				'button, label, [role="tab"], [role="button"], [aria-live], .alert, .message',
			) ||
			element.querySelector('button, label, [role="tab"], [aria-live]') ||
			(element.textContent && this.translations[element.textContent.trim()])
		);
	}

	debounce(func, wait) {
		return (...args) => {
			clearTimeout(this.debounceTimer);
			this.debounceTimer = setTimeout(() => func.apply(this, args), wait);
		};
	}

	// Utility method to check if translations are working
	testTranslations() {
		const results = {
			toolbarButtons: document.querySelectorAll(".sui-toolbar button").length,
			navigationTabs: document.querySelectorAll('nav [role="tab"]').length,
			modals: document.querySelectorAll(".sui-modal").length,
			statusMessages: document.querySelectorAll("[aria-live]").length,
		};

		console.log("Sveltia CMS Localizer: UI Element Count:", results);
		return results;
	}

	// Manual test method for debugging
	testManualTranslation() {
		console.log("🧪 Sveltia CMS Localizer: Manual Translation Test");

		// Create a test element with known text
		const testDiv = document.createElement("div");
		testDiv.textContent = "Save";
		testDiv.style.cssText =
			"position: fixed; top: 10px; right: 10px; background: yellow; padding: 5px; z-index: 9999;";
		document.body.appendChild(testDiv);

		// Try to translate it
		setTimeout(() => {
			this.safeTranslateElement(testDiv, this.translations.Save);
			console.log("✅ Test element translated to:", testDiv.textContent);
		}, 100);

		return "Test element created and queued for translation";
	}
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		new SveltiaCMSLocaizer();
	});
} else {
	new SveltiaCMSLocaizer();
}

// Expose for debugging
window.SveltiaCMSLocaizer = SveltiaCMSLocaizer;
