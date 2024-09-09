import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <div className="w-[100%] h-[100%]">
        <div className=" ">{children}</div>
      </div>
    </div>
  );
};

export default layout;
