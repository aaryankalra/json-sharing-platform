import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../utils/supabase.js";
import AddJSON from "../components/dashboard-page/AddJSON.jsx";

const Dashboard = () => {
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState(null);
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
          <AddJSON user={user} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
