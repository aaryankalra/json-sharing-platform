import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../utils/supabase.js";
import AddJSON from "../components/dashboard-page/AddJSON.jsx";
import List from "../components/dashboard-page/List.jsx";

const Dashboard = () => {
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
      }

      if (!data.user) {
        alert("User needs to login first.");
        navigate("/auth");
      } else {
        setUser(data.user);
      }

      setUserLoading(false);
    };

    fetchUser();
  }, [navigate]);

  const fetchFiles = async () => {
    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from("json_files")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      alert(error);
    } else {
      setFiles(data);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFiles();
    }
  }, [user]);

  if (userLoading) {
    return (
      <div className="h-[90vh] flex items-center justify-center">
        Loading user...
      </div>
    );
  }

  return (
    <div className="h-[90vh] py-12 px-6 sm:px-12 md:px-18">
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-4xl font-bold">Welcome to your Dashboard.</h1>
        </div>
        <div>
          <AddJSON user={user} onCreate={fetchFiles} />
        </div>
        <div className="mt-4">
          <List user={user} files={files} onUpdate={fetchFiles} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
