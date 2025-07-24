import { PenSquare, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import { useNoteForm } from '../hooks/useNoteForm';

const NoteCard = ({ note }) => {
  const { handleDelete } = useNoteForm(note);
  
//   const handleDelete = async (e) => {
//     e.preventDefault();
//     if (!window.confirm("Are you sure you want to delete this note?")) return;
    
//     try {
//         await axiosInstance.delete(`/notes/${note._id}`);
//         setNotes((prev) => prev.filter((n) => n._id !== note._id));
//         toast.success("Note deleted successfully!");
//     } catch (error) {
//         console.error("Error deleting note:", error);
//         toast.error("Failed to delete note. Please try again later.");
//     }
// };
  return (
    <Link to={`/note/${note._id}`}
    className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
      <div className="card-body">
          <h3 className="card-title text-base-content">
            {note.title.length > 50 ? note.title.substring(0, 50) + '...' : note.title}
          </h3>
          <p className="text-base-content/70 line-clamp-3">
            {note.content.length > 100 ? note.content.substring(0, 100) + '...' : note.content}
          </p>
        <div className='items-center justify-between mt-4 card-actions'>
          <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
        <div className="flex items-center gap-1">
            <PenSquare className="size-4" />
          <button className='btn btn-ghost btn-xs text-error' onClick={() => handleDelete(note._id)}>
            <Trash2Icon className="size-4" />
          </button>
        </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
