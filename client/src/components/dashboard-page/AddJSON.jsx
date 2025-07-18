import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { supabase } from "../../utils/supabase.js";
import { FilePlus } from "lucide-react";

const AddJSON = ({ user }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState('{\n  "example": true\n}');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const parsed = JSON.parse(content);

      const { error } = await supabase.from("json_files").insert([
        {
          user_id: user.id,
          name: title,
          content: parsed,
          is_public: false,
        },
      ]);

      if (error) {
        alert(error);
      }

      setContent('{\n  "example": true\n}');
      setTitle("");

      alert("JSON file created.");
    } catch (error) {
      alert("Error creating file.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("modal").showModal()}
      >
        <FilePlus /> Add JSON File
      </button>
      <dialog id="modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create your JSON File</h3>
          <div className="mt-3">
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                >
                  {loading ? "Creating..." : "Create"}
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

export default AddJSON;
