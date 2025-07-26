import { Pencil } from "lucide-react";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { supabase } from "../../utils/supabase.js";

const Edit = ({ file, modalID, onUpdate }) => {
  const [title, setTitle] = useState(file.name);
  const [content, setContent] = useState(JSON.stringify(file.content, null, 2));
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const parsed = JSON.parse(content);
      console.log(parsed);

      const { error } = await supabase
        .from("json_files")
        .update({
          name: title,
          content: parsed,
        })
        .eq("id", file.id);

      if (error) {
        alert(error);
      }

      alert("File updated.");
      onUpdate();
      document.getElementById(modalID).close();
    } catch (error) {
      alert("Unable to save.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="sm:btn btn-ghost hover:bg-blue-300"
        onClick={() => document.getElementById(modalID).showModal()}
      >
        <Pencil size={18} />
        <span className="hidden md:flex">Edit</span>
      </button>
      <dialog id={modalID} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit the JSON File</h3>
          <div className="mt-3">
            <form className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
              />
              <CodeMirror
                value={content}
                height="350px"
                theme="light"
                extensions={[json()]}
                onChange={(value) => setContent(value)}
                className="border border-base-300 font-mono"
              />

              <div>
                <button
                  className="btn w-full hover:bg-green-400"
                  type="submit"
                  disabled={loading}
                  onClick={handleSave}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
          <div className="mt-3">
            <form method="dialog">
              <button className="btn w-full hover:bg-red-400">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Edit;
