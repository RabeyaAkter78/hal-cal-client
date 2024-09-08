import ChatHeader from "@/Components/ChatHeader/ChatHeader/ChatHeader";
import Sidebar from "@/Components/Sidebar/SideBar/Sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className=" container mx-auto flex">
      <div className=" w-[25%] h-[100vh] bg-[#cde8e5]">
        <Sidebar />
      </div>

      <div className="w-[75%] h-[100vh]">
        {/* <div className=" h-[10%] bg-[#cde8e5]">
          <ChatHeader />
        </div> */}
        <div className=" h-[100%]  bg-neutral-300">{children}</div>
      </div>
    </div>
  );
};

export default layout;
