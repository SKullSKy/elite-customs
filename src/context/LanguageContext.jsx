import { createContext, useContext, useState } from 'react'
import { translations } from '../translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangRaw] = useState(() => {
    const stored = localStorage.getItem('ec-lang')
    return stored && translations[stored] ? stored : 'LV'
  })

  const setLang = (l) => {
    localStorage.setItem('ec-lang', l)
    setLangRaw(l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
