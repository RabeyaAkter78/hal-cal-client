"use client";

import { useEffect, useState } from "react";

const LoggedInUserprofile = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // get loggedin user from localstorage:
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userObj = JSON.parse(userString);
      setLoggedInUser(userObj);
    }
  }, []);

  // console.log(loggedInUser);
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {loggedInUser ? (
          <>
            <img
              src={
                loggedInUser.avatarUrl
                  ? `http://localhost:5000${loggedInUser.avatarUrl}`
                  : "/default-avatar.png"
              }
              alt="Logged-in User Avatar"
              className="my-5 h-20 w-20 rounded-full border-2"
            />
            <h1 className="text-xl font-bold">{loggedInUser.name}</h1>
          </>
        ) : (
          <p>Loading user...</p>
        )}
      </div>
    </div>
  );
};

export default LoggedInUserprofile;
