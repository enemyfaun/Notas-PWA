import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUser.js';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const Note = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { user, restApi } = useUser();
  const [loading, setLoading] = useState(true);
  const [noteData, setNoteData] = useState({ title: '', note: '' });

  useEffect(() => {
    const loadNote = async () => {
      if (noteId === 'new') {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${restApi.url}${restApi.port}/${user.name}/${noteId}`);
        const data = await response.json();
        setNoteData(data);
      } catch (error) {
        console.error('Error fetching note:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [noteId, user.name, restApi.url, restApi.port]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const handleNoteOperation = async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const note = document.getElementById('note').value;
    if (!title || !note) return;
    try {
      const response = await fetch(`${restApi.url}${restApi.port}/${user.name}/${noteId !== 'new' ? noteId : ''}`, {
        method: noteId === 'new' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, note }),
      });
      if (!response.ok) {
        throw new Error('Error details: ' + (await response.text()));
      }
      toast.success('Nota guardada');
      navigate('/notes');
    } catch (error) {
      console.error(error);
      toast.error('No se pudo guardar la nota');
    }
  };

  const handleDeleteNote = async () => {
    if (noteId !== 'new') {
    try {
            const response = await fetch(`${restApi.url}${restApi.port}/${user.name}/${noteId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
        throw new Error('Error details: ' + (await response.text()));
            }
      toast('Nota eliminada', { icon: '🗑️' });
        } catch (error) {
            console.error(error);
      toast.error('No se pudo eliminar la nota');
        }
    }
    navigate('/notes');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <form id="note-form" onSubmit={handleNoteOperation}>
        <header className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/notes')}
            className="mr-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            &larr; Back
          </button>
          <input
            id="title"
            type="text"
            defaultValue={noteData.title}
            placeholder="Title"
            className="text-3xl font-bold text-gray-800 text-center"
          />
          {noteId !== 'new' && (
            <button onClick={handleDeleteNote} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Borrar</button>
          )}
        </header>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <textarea
            id="note"
            defaultValue={noteData.note}
            placeholder="Note"
            className="w-full h-48 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Save
        </button>
      </form>
    </div>

  );
};