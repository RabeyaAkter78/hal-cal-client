import React from "react";
import LoggedInUserprofile from "../LoggedInUserProfile/LoggedInUserprofile";
import SiddeBarHeader from "../SideBarHeader/SiddeBarHeader";
import AllUser from "../AllUser/AllUser";
import LogOut from "../logOut/LogOut";

const Sidebar = () => {
  return (
    <div>
      <LoggedInUserprofile />
      <SiddeBarHeader />
      <AllUser />
      <LogOut />
    </div>
  );
};

export default Sidebar;
