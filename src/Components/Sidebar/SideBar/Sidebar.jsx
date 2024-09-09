"use client";
import LoggedInUserprofile from "../LoggedInUserProfile/LoggedInUserprofile";
import SiddeBarHeader from "../SideBarHeader/SiddeBarHeader";
import AllUser from "../AllUser/AllUser";
import LogOut from "../logOut/LogOut";
import { useState } from "react";
const Sidebar = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div>
      <LoggedInUserprofile />
      <SiddeBarHeader />
      <AllUser onUserSelect={setSelectedUser} />
      <LogOut />
    </div>
  );
};

export default Sidebar;
