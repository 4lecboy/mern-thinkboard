import { Link, useParams } from "react-router";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useNoteDetail } from "../hooks/useNoteDetail";
import { useNoteForm } from "../hooks/useNoteForm";

const NoteDetailPage = () => {
  const { id } = useParams();
  const { note, loading } = useNoteDetail(id);
  const { 
    title, setTitle, 
    content, setContent, 
    loading: saving, 
    handleSubmit, 
    handleDelete 
  } = useNoteForm(note);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Note not found</h2>
          <Link to="/" className="btn btn-primary">
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button 
              onClick={() => handleDelete(id)} 
              className="btn btn-error btn-outline"
              disabled={saving}
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="mb-4 text-2xl card-title">Edit Note</h2>
              <form onSubmit={(e) => handleSubmit(e, true)}>
                <div className="mb-4 form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered"
                    disabled={saving}
                    required
                  />
                </div>
                <div className="mb-4 form-control">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    value={content}
                    placeholder="Write your note here..."
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full textarea textarea-bordered"
                    rows="5"
                    disabled={saving}
                    required
                  />
                </div>
                <div className="justify-end card-actions">
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;