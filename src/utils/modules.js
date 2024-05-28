/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str The string to process.
 * @returns {string} The string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Copies text to the clipboard.
 *
 * @param {string} text The text to copy to the clipboard.
 * @returns {Promise<void>} A promise resolved when the text is successfully copied.
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard:", text);
  } catch (error) {
    console.error("Unable to copy text:", error);
  }
};

/**
 * Remove non-alphabetic characters (for first names, last names, etc.).
 *
 * @param {string} input The string to filter.
 * @returns {string} The filtered string containing only alphabetic characters and spaces.
 */
export const removeNonAlphabeticCharacters = (input) => {
  return input.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ-' ]/g, "");
};

/**
 * Remove non-alphanumeric characters (allowing digits).
 *
 * @param {string} input The string to filter.
 * @returns {string} The filtered string containing only alphanumeric characters and spaces.
 */
export const removeNonAlphanumericCharacters = (input) => {
  return input.replace(/[^a-zA-Z0-9À-ÖØ-öø-ÿ-' ]/g, "");
};

/**
 * Remove special characters.
 *
 * @param {string} input The string to filter.
 * @returns {string} The filtered string without special characters.
 */
export const removeSpecialCharacters = (input) => {
  return input.replace(/[<>&"/=]/g, "");
};
