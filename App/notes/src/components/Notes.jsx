import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser.js';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const Notes = () => {
  const { user, logout , restApi } = useUser();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast('Sesión cerrada');
    navigate('/login');
  };

  useEffect(() => {
    let isActive = true;

    const fetchNotes = async () => {
      try {
        const response = await fetch(`${restApi.url}${restApi.port}/${user.name}`);
        const data = await response.json();
        if (isActive) {
          setNotes(data);
          toast.success('Notas cargadas');
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
        toast.error('Error al cargar notas');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();

    return () => {
      isActive = false;
    };

  }, [restApi, user.name]);

    if (loading) {
        return <div>Cargando...</div>;
    }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Notas de {user?.name}</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => (
          <div
            key={note.id}
            onClick={() => navigate(`/note/${note.id}`)}
            className="p-6 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-700">{note.title}</h2>
            <p className="text-gray-600">{note.note}</p>
          </div>
        ))}
            <div onClick={() => navigate(`/note/new`)}
            className="p-6 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all">
            <h2 className="text-xl font-semibold text-gray-700">+</h2>
          </div>
      </div>
    </div>
  );
};