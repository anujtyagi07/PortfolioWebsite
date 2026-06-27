import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { contentApi } from '../lib/api'

const ContentContext = createContext()

export function ContentProvider({ children }) {
  const [content, setContent] = useState({
    projects: null,
    skills: null,
    experience: null,
    education: null,
    settings: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await contentApi.getAll()
      setContent({
        projects: data.projects || [],
        skills: data.skills || [],
        experience: data.experience || [],
        education: data.education || [],
        settings: data.settings || null,
      })
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <ContentContext.Provider value={{ ...content, loading, error, refresh }}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
