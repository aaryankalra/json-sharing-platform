import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase.js";
import { ExternalLink, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router";
import Edit from "./Edit.jsx";
import Share from "./Share.jsx";

const List = ({ files, onUpdate }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    let confirmed = confirm("Are you sure you want to delete the file?");

    if (!confirmed) {
      return;
    }

    const { error } = await supabase.from("json_files").delete().eq("id", id);

    if (error) {
      alert(error);
    } else {
      alert("File deleted successfully.");
      onUpdate();
    }
  };

  // useEffect(() => {
  //   const fetchFiles = async () => {
  //     try {
  //       setLoading(true);

  //       const { data, error } = await supabase
  //         .from("json_files")
  //         .select("*")
  //         .eq("user_id", user.id)
  //         .order("created_at", { ascending: false });

  //       if (error) {
  //         alert(error);
  //       } else {
  //         setFiles(data);
  //       }
  //     } catch (error) {
  //       alert("Unable to fetch your files.");
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (user?.id) {
  //     fetchFiles();
  //   }
  // }, [user]);

  // if (loading) {
  //   return (
  //     <div className="flex items-center gap-3">
  //       <div>
  //         <h1 className="text-lg">Fetching your data</h1>
  //       </div>
  //       <div>
  //         <span class="loading loading-dots loading-md"></span>
  //       </div>
  //     </div>
  //   );
  // }

  if (files.length === 0) {
    return (
      <div>
        <h1 className="text-lg">You don't have any json files yet.</h1>
      </div>
    );
  }

  return (
    <div className="border border-gray-100 rounded-lg">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, i) => (
            <tr key={file.id}>
              <th>{i + 1}</th>
              <td className="w-full">{file.name}</td>
              <td>
                <div className="flex gap-5 sm:gap-2 items-center">
                  <button
                    className="sm:btn btn-ghost hover:bg-green-300"
                    onClick={() => navigate(`/json/${file.id}`)}
                  >
                    <ExternalLink size={18} />
                    <span className="hidden md:flex">Open</span>
                  </button>
                  <button
                    className="sm:btn btn-ghost hover:bg-red-300"
                    onClick={() => handleDelete(file.id)}
                  >
                    <Trash size={18} />

                    <span className="hidden md:flex">Delete</span>
                  </button>
                  <div>
                    <Edit
                      file={file}
                      modalID={`edit-modal-${file.id}`}
                      onUpdate={onUpdate}
                    />
                  </div>
                  <div>
                    <Share file={file} modalID={`share-modal-${file.id}`} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
