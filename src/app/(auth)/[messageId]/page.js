"use client";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { TbMessageSearch } from "react-icons/tb";
import { IoCall } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";

const DynamicUserItem = ({ params }) => {
  const { messageId } = params || {};
  const [user, setUser] = useState(null);
  const [text, setText] = useState("");
  const [singleUser, setSingleUser] = useState(null);
  const [allReceivedMessage, setAllReceivedMessage] = useState([]);
  const [socket, setSocket] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Initialize socket connection and message listener
  useEffect(() => {
    if (user && user?._id) {
      const newSocket = io("http://localhost:5000");
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("SOCKET CONNECTED WITH ID", newSocket.id);
        newSocket.emit("register", user?._id);
      });

      newSocket.on(`receiverMessage:${user?._id}`, (newMessage) => {
        console.log("New message received:", newMessage);

        setAllReceivedMessage((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        newSocket.disconnect();
        console.log("Socket disconnected");
      };
    }
  }, [user]);

  // Fetch conversation history
  useEffect(() => {
    if (user && user?._id && messageId) {
      fetch(`http://localhost:5000/conversation/${user?._id}/${messageId}`)
        .then((res) => res.json())
        .then((data) => setAllReceivedMessage(data))
        .catch((error) => console.log("Error fetching conversation:", error));
    }
  }, [user, messageId]);

  // Fetch single user data
  useEffect(() => {
    if (messageId) {
      fetch(`http://localhost:5000/single-user/${messageId}`)
        .then((res) => res.json())
        .then((data) => setSingleUser(data?.data))
        .catch((error) => console.log("Error fetching user data:", error));
    }
  }, [messageId]);

  // Send message
  const sendMessage = () => {
    if (text.trim() !== "" && socket) {
      const myMessage = {
        senderId: user?._id,
        receiverId: messageId,
        text,
      };
      console.log("Sending message:", myMessage);
      socket.emit("sendMessage", myMessage);
      setText("");
    }
  };

  return (
    <div>
      <div className="h-screen relative">
        <div className="h-16 md:h-[70px] flex items-center justify-between border-b border-gray-300 bg-[#cde8e5]">
          {singleUser && (
            <div className="flex items-center gap-2">
              <Image
                src={`http://localhost:5000${singleUser?.avatarUrl}`}
                height={40}
                width={40}
                className="rounded-full border-2"
                alt="User Avatar"
              />
              <div>
                <h1 className="font-bold">{singleUser?.name}</h1>
                <p className="text-neutral-500">Active time</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-5">
            <TbMessageSearch className="h-5 w-5 text-[#707991]" />
            <IoCall className="h-5 w-5 text-[#707991]" />
            <BsThreeDotsVertical className="h-5 w-5 text-[#707991]" />
          </div>
        </div>
        <div className="pt-4 md:pt-4 pb-5 px-10 h-[83vh] md:h-[81vh] overflow-hidden overflow-y-scroll bg-[#02040a]">
          {/* Messages */}

          <div className="flex flex-col">
            {allReceivedMessage?.map((message, index) => (
              <div key={index} className="mt-6 w-full ">
                <span
                  className={`${
                    user?._id === message?.senderId
                      ? "bg-[#cde8e5] text-black"
                      : "bg-[#707991] text-white float-end"
                  } px-4 py-2 rounded-3xl`}
                >
                  {message?.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex w-full justify-center -mt-16">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border shadow-lg active:shadow-lg focus:shadow-lg px-4 rounded-xl w-[250px] md:w-[300px] lg:w-[500px] xl:w-[700px]"
            placeholder="Type Message Here..."
          />
          <IoMdSend
            onClick={sendMessage}
            className="w-10 h-10 -ml-12 text-primary cursor-pointer text-[#156d63]"
          />
        </div>
      </div>
    </div>
  );
};

export default DynamicUserItem;
