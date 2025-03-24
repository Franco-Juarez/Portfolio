"use client";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="px-2 py-1 
      rounded-sm 
      border-2 
      border-orange-light-theme
      text-orange-light-theme
      hover:bg-orange-light-theme
      hover:text-btn-text
      dark:border-orange-theme 
      dark:text-orange-theme 
      dark:hover:bg-orange-theme 
      dark:hover:text-white
      font-body"
    >
      {translations.languageToggle[language]}
    </button>
  );
} 