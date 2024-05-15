export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Texte copié dans le presse-papiers :", text);
  } catch (error) {
    console.error("Impossible de copier le texte :", error);
  }
};
