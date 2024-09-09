"use client";

import React, { useState, useEffect } from "react";
import DynamicUserItem from "@/app/(auth)/[messageId]/page";
import AllUser from "../Sidebar/AllUser/AllUser";
import LoggedInUserprofile from "../Sidebar/LoggedInUserProfile/LoggedInUserprofile";
import SiddeBarHeader from "../Sidebar/SideBarHeader/SiddeBarHeader";
import LogOut from "../Sidebar/logOut/LogOut";

const ChatMessage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  // Use useEffect to handle client-side code
  useEffect(() => {
    // Get the selected user from local storage after component mounts
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      setSelectedUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Save selectedUser to local storage when it changes
    if (selectedUser) {
      localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    } else {
      localStorage.removeItem("selectedUser");
    }
  }, [selectedUser]);

  return (
    <div className="container mx-auto flex h-screen">
      <div className="w-[25%] h-[90%] bg-[#cde8e5]">
        <LoggedInUserprofile />
        <SiddeBarHeader />
        <AllUser onUserSelect={setSelectedUser} />
        <LogOut />
      </div>

      <div className="w-[75%] h-[90%] bg-neutral-300">
        {selectedUser ? (
          <DynamicUserItem selectedUser={selectedUser} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
