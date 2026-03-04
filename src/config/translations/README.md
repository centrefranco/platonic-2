# Sveltia CMS Admin UI Translations

This folder contains JavaScript-based translations for the Sveltia CMS admin interface.

## File Structure

- `fr.js` - French translations (primary language)
- `en.js` - English fallback translations
- `index.js` - Translation manager

## Editing Translations

### For French Translations (`fr.js`):
1. Edit the `frTranslations` object
2. Add/modify key-value pairs
3. Restart the dev server to see changes

### For English Fallback (`en.js`):
1. Edit the `enTranslations` object
2. This serves as fallback if French fails to load
3. Keep in sync with original English UI strings

## Translation Format

```javascript
export const frTranslations = {
  'English Text': 'French Translation',
  'Another String': 'Autre Traduction'
};
```

## Adding New Translations

1. Add the English key to both `fr.js` and `en.js`
2. French value in `fr.js`
3. Same English key as value in `en.js`
4. No code changes needed - translations load automatically

## Error Handling

- If French translations fail to load, falls back to English
- Console warnings indicate loading issues
- CMS continues to work with original English text if all else fails