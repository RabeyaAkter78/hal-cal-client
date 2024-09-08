"use client";

import { useEffect, useState } from "react";
import SingleUser from "../Singleuser/SingleUser";

const AllUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loggedinUser, setLoggedinUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // console.log(allUsers);
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
      fetch(`http://localhost:5000/users/${loggedinUser?._id}`)
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
        .catch((error) => console.log("Error Fetching user 38", error));
    }
  }, [loggedinUser]);

  const handleUserSelect = (user) => {
    console.log("Selected user 43:", user);
  };

  return (
    <div>
      <div className="flex-1 overflow-y-auto p-4">
        {Array.isArray(allUsers) && allUsers.length > 0 ? (
          allUsers.map((user) => (
            <SingleUser
              key={user._id}
              isSelected={selectedUser === user._id}
              onClick={() => setSelectedUser(user._id)}
              user={user}
            />
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default AllUser;

// {allUsers.length > 0 ? (
//   allUsers.map((user) => {
//     const imageUrl = user?.avatarUrl
//       ? `http://localhost:5000${user?.avatarUrl}`
//       : "/default-avatar.png";

//     return (
//       <div
//         key={user._id}
//         className="mb-2 flex items-center gap-4 rounded-lg py-2 hover:bg-slate-200"
//         onClick={() => handleUserSelect(user)}
//       >
//         <Image
//           className="rounded-full border-2 border-[#8babd8]"
//           src={imageUrl}
//           height={40}
//           width={40}
//           alt="user image"
//         />
//         <div>
//           <h1 className="text-md font-bold">
//             {user?.name || "User name"}
//           </h1>
//           <p>{user?.lastMessage || "Last Message"}</p>
//         </div>
//       </div>
//     );
//   })
// ) : (
//   <p>No users found</p>
// )}
