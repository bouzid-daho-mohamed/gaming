import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-md bg-primary-100 text-primary-900 hover:bg-primary-200 transition-colors"
    >
      {i18n.language === 'en' ? 'FR' : 'EN'}
    </button>
  );
}

export default LanguageSwitcher;