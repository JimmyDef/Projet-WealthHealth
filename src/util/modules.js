/* ----------------------------------------------------
 Fonction : Mettre en majuscule la première lettre d'une chaîne
 ---------------------------------------------------- */
export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/* ----------------------------------------------------
 Fonction : Copier du texte dans le presse-papiers
 ---------------------------------------------------- */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Texte copié dans le presse-papiers :", text);
  } catch (error) {
    console.error("Impossible de copier le texte :", error);
  }
};

/* ----------------------------------------------------
 Fonction : Filtrer les caractères non alphabétiques (pour les prénoms, noms, etc.)
 ---------------------------------------------------- */
export const filterNonAlphabeticCharacters = (input) => {
  return input.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ-' ]/g, "");
};

/* ----------------------------------------------------
 Fonction : Filtrer les caractères non alphanumériques (chiffres autorisés)
 ---------------------------------------------------- */
export const filterNonAlphanumericCharacters = (input) => {
  return input.replace(/[^a-zA-Z0-9À-ÖØ-öø-ÿ-' ]/g, "");
};

/* ----------------------------------------------------
 Fonction : Filtrer les caractères spéciaux
 ---------------------------------------------------- */
export const filterSpecialCharacters = (input) => {
  return input.replace(/[<>&"/=]/g, "");
};

export const handleEsc = (event, callback) => {
  if (event.key === "Escape") {
    callback();
  }
};
