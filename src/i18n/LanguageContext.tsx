import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, type Language } from './translations'

type Theme = 'light' | 'dark' | 'system'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved as Language) || 'ru'
  })

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    return (saved as Theme) || 'system'
  })

  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement
    
    root.classList.remove('light', 'dark')
    
    let actualTheme = newTheme
    
    if (newTheme === 'system') {
      actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    
    root.classList.add(actualTheme)
    
    root.setAttribute('data-theme', actualTheme)
    
    console.log('Theme applied:', { selected: newTheme, actual: actualTheme })
  }

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = () => {
        applyTheme('system')
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }
    
    return value
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}