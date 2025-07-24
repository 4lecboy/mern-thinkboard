import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";
import { useNoteForm } from "../hooks/useNoteForm";

const CreatePage = () => {
  const { title, setTitle, content, setContent, loading, handleSubmit } = useNoteForm();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Create a New Note</h2>
            <form onSubmit={(e) => handleSubmit(e, false)}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  value={content}
                  placeholder="Write your note here..."
                  onChange={(e) => setContent(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  rows="5"
                  required
                />
              </div>
              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
