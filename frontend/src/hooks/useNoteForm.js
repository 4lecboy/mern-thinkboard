import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import axiosInstance from '../lib/axios';

export const useNoteForm = (initialNote = null) => {
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Update form fields when initialNote changes
  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || "");
      setContent(initialNote.content || "");
    }
  }, [initialNote]);

  const handleSubmit = async (e, isEdit = false) => {
    e.preventDefault();
    setLoading(true);
    
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      if (isEdit) {
        await axiosInstance.put(`/notes/${initialNote._id}`, { title, content });
        toast.success("Note updated successfully!");
      } else {
        await axiosInstance.post("/notes", { title, content });
        toast.success("Note created successfully!");
        setTitle("");
        setContent("");
      }
      navigate("/");
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} note:`, error);
      
      // Handle different types of errors
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data?.error;
        
        if (status === 400) {
          toast.error(message || "Invalid note data. Please check your inputs.");
        } else if (status === 401) {
          toast.error(`You are not authorized to ${isEdit ? 'update' : 'create'} notes.`);
        } else if (status === 429) {
          toast.error("Slow down! You're creating notes too fast.", {
            duration: 4000,
            icon: "💀"
          });
        } else if (status === 500) {
          toast.error(`Failed to ${isEdit ? 'update' : 'create'} note. Please try again later.`);
        } else {
          toast.error(message || `Error: ${status}. Please try again.`);
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    
    setLoading(true);
    try {
      await axiosInstance.delete(`/notes/${noteId}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    loading,
    handleSubmit,
    handleDelete
  };
};