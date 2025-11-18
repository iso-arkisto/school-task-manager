import { useLanguage } from '../i18n/LanguageContext'

export const Header = () => {
  const { t, language, setLanguage } = useLanguage()

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t('header.title')}
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1">
              {t('header.subtitle')}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={language}
              id='lang-select'
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-gray-100 mr-40 dark:bg-gray-700 border-0 rounded-lg pl-2 pr-8 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="ru">
                Русский
              </option>
             <option value="en">
                English
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}