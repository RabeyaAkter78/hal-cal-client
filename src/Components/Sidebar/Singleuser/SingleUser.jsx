import { Avatar } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleUser = ({ user, onClick, isSelected }) => {
  const formattedTime = user?.time
    ? format(new Date(user.time), "hh:mm a")
    : "";
  const imageUrl = user?.avatarUrl
    ? `http://localhost:5000${user?.avatarUrl}`
    : "/default-avatar.png";
  return (
    <div>
      <>
        <Link onClick={onClick} href={`/${user?._id}`}>
          <div
            className={`mb-2 flex items-center gap-4 rounded-lg py-2 hover:bg-slate-200" ${
              isSelected
                ? "bg-primary text-white shadow-2xl"
                : "bg-white text-black"
            }  flex gap-2 justify-between items-center py-2 mt-4`}
          >
            <div className=" flex gap-2 items-center">
              <Image
                className="rounded-full border-2 border-[#8babd8]"
                src={imageUrl}
                height={40}
                width={40}
                alt="user image"
              />
              <div>
                <h1 className="text-md font-bold">
                  {user?.name || "User name"}
                </h1>
                <p>{user?.lastMessage || "Last Message"}</p>
              </div>
            </div>
            <p className=" mr-1">{formattedTime}</p>
          </div>
        </Link>
      </>
    </div>
  );
};

export default SingleUser;
