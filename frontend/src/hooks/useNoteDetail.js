import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import axiosInstance from '../lib/axios';

export const useNoteDetail = (id) => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      // Don't fetch if no valid ID
      if (!id || id === 'undefined' || id === 'null') {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        
        if (error.response?.status === 404) {
          navigate("/", { replace: true });
        } else {
          toast.error("Failed to load note. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  return { note, loading, setNote };
};