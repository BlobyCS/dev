import { useEffect } from 'react'

export function usePageTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `Vaunt.cz | ${page}` : 'Vaunt.cz | CS2 Portál CZ/SK'
  }, [page])
}
