import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import RateLimitedUi from "../components/RateLimitedUI"
import toast from 'react-hot-toast';
import NoteCard from "../components/NoteCard";
import axiosInstance from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axiosInstance.get("/notes");
        setNotes(response.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUi />}

      <div className="p-4 mx-auto mt-6 max-w-7xl">
        {loading && <div className="py-10 text-center text-primary">Loading notes...</div>}

        {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}

          </div>
        )
          }
      </div>
    </div>
  )
}

export default HomePage