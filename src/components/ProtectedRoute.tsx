import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--green)', textTransform: 'uppercase', opacity: 0.7 }}>
        Načítám...
      </div>
    </div>
  )

  if (!session) return <Navigate to="/" replace />

  return <>{children}</>
}