"use client";

import { Button } from "antd";
import React, { useEffect, useState } from "react";

const LogOut = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    const loggedInUserString = localStorage.getItem("user");
    if (loggedInUserString) {
      const userObject = JSON.parse(loggedInUserString);
      setLoggedInUser(userObject);
    }
  }, []);
  return (
    <div>
      <div className="my-10 px-2 flex items-center justify-center">
        <Button
          block
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          // style={{
          //   backgroundColor: "#8babd8",
          //   color: "white",
          // }}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default LogOut;
