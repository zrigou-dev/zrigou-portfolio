import en from "@/i18n/dictionaries/en";
import fr from "@/i18n/dictionaries/fr";

const dictionaries = { en, fr };

export const getDictionary = (locale) => dictionaries[locale] ?? dictionaries.en;
