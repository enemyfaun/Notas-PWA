import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Notes } from './components/Notes';
import { Note } from './components/Note';
import './App.css';
import { Toaster, toast } from 'react-hot-toast';
import { UserProvider } from './providers/UserProvider.jsx';
import { useUser } from './hooks/useUser.js';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Main App Component
function App() {
  useEffect(() => {
    const onOfflineReady = () => toast.success('PWA lista para funcionar sin conexión')
    const onNeedRefresh = (e) => {
      const { confirm } = e.detail || {}
      toast((t) => (
        <div>
          <div>Nueva versión disponible</div>
          <div className="mt-2 flex gap-2">
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded"
              onClick={() => {
                confirm?.()
                toast.dismiss(t.id)
              }}
            >Actualizar</button>
            <button
              className="px-3 py-1 bg-gray-600 text-white rounded"
              onClick={() => toast.dismiss(t.id)}
            >Luego</button>
          </div>
        </div>
      ), { duration: 8000 })
    }

    document.addEventListener('pwa:offline-ready', onOfflineReady)
    document.addEventListener('pwa:need-refresh', onNeedRefresh)
    return () => {
      document.removeEventListener('pwa:offline-ready', onOfflineReady)
      document.removeEventListener('pwa:need-refresh', onNeedRefresh)
    }
  }, [])

  useEffect(() => {
    const online = () => toast.success('Conectado')
    const offline = () => toast('Sin conexión', { icon: '📵' })
    window.addEventListener('online', online)
    window.addEventListener('offline', offline)
    return () => {
      window.removeEventListener('online', online)
      window.removeEventListener('offline', offline)
    }
  }, [])

  return (
    <UserProvider>
      <main className="bg-gray-50 min-h-screen font-sans">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { background: '#111827', color: '#fff' },
            success: { iconTheme: { primary: '#10b981', secondary: '#1f2937' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#1f2937' } },
          }}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          } />
          <Route path="/note/:noteId" element={
            <ProtectedRoute>
              <Note/>
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </UserProvider>

  );
}

export default App;