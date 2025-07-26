import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { supabasePublic } from "../utils/supabasePublic.js";
import Card from "../components/view-page/Card.jsx";

const View = () => {
  const { id } = useParams();
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [date, setDate] = useState("");

  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFile = async () => {
      try {
        setloading(true);

        const { data, error } = await supabasePublic
          .from("json_files")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          alert(error);
          navigate("/");
          return;
        }

        if (!data) {
          alert("File not found.");
          navigate("/");
          return;
        }

        setFileName(data.name);
        setFileContent(data.content);

        const date = data.created_at;
        const fileDate = new Date(date).toLocaleString("en-IN", {
          dateStyle: "medium",
        });

        setDate(fileDate);
      } catch (error) {
        alert("Unable to fetch file.");
        console.error(error);
      } finally {
        setloading(false);
      }
    };

    fetchFile();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="h-[90vh] flex items-center justify-center">
        <h1 className="flex items-center gap-2">
          Loading file<span className="loading loading-dots loading-lg"></span>
        </h1>
      </div>
    );
  }

  return (
    <div>
      <Card title={fileName} content={fileContent} date={date} />
      <div className="mt-6 text-center">
        <Link to="/dashboard">
          <button className="btn">Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default View;
