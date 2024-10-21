"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import io from "socket.io-client";
const AllUser = ({ onUserSelect }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [loggedinUser, setLoggedinUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setLoggedinUser(JSON.parse(storedUser));
      }
    }
  }, []);

  useEffect(() => {
    if (loggedinUser && loggedinUser._id) {
      fetch(`https://hal-cal-server-utupj450w-rabeyaakter78s-projects.vercel.app/users/${loggedinUser?._id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          if (data?.data) {
            setAllUsers(data.data);
          } else {
            setAllUsers([]);
          }
        })
        .catch((error) => console.log("Error fetching user data:", error));
    }
  }, [loggedinUser]);

  const handleUserSelect = (user) => {
    console.log("Selected user:", user);
    setSelectedUser(user._id);
    onUserSelect(user);
  };

  // socket:
  useEffect(() => {
    const socket = io("http://localhost:5000");
    setSocket(socket);
    // Listen for the 'newUser' event from the server
    socket.on("user", (user) => {
      console.log("New User registered:", user);
      setAllUsers((prevUsers) => [user, ...prevUsers]);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <div className="  h-[650px] overflow-y-scroll">
        {Array.isArray(allUsers) && allUsers.length > 0 ? (
          allUsers.map((user) => {
            const imageUrl = user?.avatarUrl
              ? `http://localhost:5000${user?.avatarUrl}`
              : "/default-avatar.png";

            return (
              <div key={user._id} className={` ${selectedUser === user._id ? "bg-red-300  text-white hover:bg-red-300" : "hover:bg-red-200"
                }`}>

                <div
                  className={`px-4 py-2 mb-2 flex justify-start items-center gap-2 `}
                  onClick={() => handleUserSelect(user)}
                >

                  <Image
                    className="rounded-full border-2 border-red-300 h-10 w-10 object-cover"
                    src={imageUrl}
                    height={20}
                    width={20}
                    alt="user image"
                  />
                  <div>
                    <h1 className="text-md font-bold">
                      {user?.name || "User name"}
                    </h1>
                    <p>{user?.lastMessage || "Last Message"}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default AllUser;
