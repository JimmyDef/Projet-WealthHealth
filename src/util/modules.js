/* ----------------------------------------------------
 Fonction formatage string majuscule 1ère lettre
 ---------------------------------------------------- */
export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/* ----------------------------------------------------
Fonction ajout copier dans le presse papier
 ----------------------------------------------------*/
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Texte copié dans le presse-papiers :", text);
  } catch (error) {
    console.error("Impossible de copier le texte :", error);
  }
};

/* ----------------------------------------------------
 Fonction echappement caractères non alphabetique ( => prénom, nom etc..)
 ----------------------------------------------------*/
export const filterNonAlphabeticCharacters = (input) => {
  return input.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ-' ]/g, "");
};

/* ----------------------------------------------------
 Fonction echappement caractères non alphabetique numérique (chiffres autorisés)
 ----------------------------------------------------*/
export const filterNonAlphanumericCharacters = (input) => {
  return input.replace(/[^a-zA-Z0-9À-ÖØ-öø-ÿ-' ]/g, "");
};

/* ----------------------------------------------------
 Fonction echappement caractères spéciaux
 ----------------------------------------------------*/

export const filterSpecialCharacters = (input) => {
  return input.replace(/[<>&"/=]/g, "");
};
