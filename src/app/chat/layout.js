import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <div className="w-[100%] h-[100%]">
        <div className="bg-emerald-100 ">{children}</div>
      </div>
    </div>
  );
};

export default layout;
