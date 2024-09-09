"use client";

import { Button } from "antd";
import React, { useEffect, useState } from "react";

const LogOut = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Retrieve the logged-in user from local storage on component mount
    const loggedInUserString = localStorage.getItem("user");
    if (loggedInUserString) {
      const userObject = JSON.parse(loggedInUserString);
      setLoggedInUser(userObject);
    }
  }, []);

  const handleLogout = () => {
    // Clear user-related data from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("selectedUser"); 

    // Redirect to the login page
    window.location.href = "/login";
  };

  return (
    <div>
      <div className="my-10 px-2 flex items-center justify-center">
        <Button block onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default LogOut;
