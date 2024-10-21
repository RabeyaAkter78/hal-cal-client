"use client";
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { TbMessageSearch } from "react-icons/tb";
import { IoCall } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";

const DynamicUserItem = ({ selectedUser }) => {
  const [user, setUser] = useState(null);
  const [text, setText] = useState("");
  const [allReceivedMessage, setAllReceivedMessage] = useState([]);
  const [socket, setSocket] = useState(null);
  const [singleUser, setSingleUser] = useState(null);
  const messageEndRef = useRef(null); // tracking the end of the message list

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Initialize socket connection
  useEffect(() => {
    if (user && user?._id) {
      const socket = io("http://localhost:5000");
      setSocket(socket);

      socket.on("connect", () => {
        console.log("SOCKET CONNECTED WITH ID", socket.id);
        socket.emit("register", user?._id);
      });

      socket.on(`receiverMessage:${user?._id}`, (newMessage) => {
        console.log("New message received:", newMessage);

        setAllReceivedMessage((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.disconnect();
        console.log("Socket disconnected");
      };
    }
  }, [user]);

  // Fetch conversation history
  useEffect(() => {
    if (user && user?._id && selectedUser?._id) {
      fetch(
        `https://hal-cal-server-utupj450w-rabeyaakter78s-projects.vercel.app/conversation/${user?._id}/${selectedUser?._id}`
      )
        .then((res) => res.json())
        .then((data) => setAllReceivedMessage(data))
        .catch((error) => console.log("Error fetching conversation:", error));
    }
  }, [user, selectedUser]);

  // Fetch single user data
  useEffect(() => {
    if (selectedUser?._id) {
      fetch(`https://hal-cal-server-utupj450w-rabeyaakter78s-projects.vercel.app/single-user/${selectedUser?._id}`)
        .then((res) => res.json())
        .then((data) => setSingleUser(data?.data))
        .catch((error) => console.log("Error fetching user data:", error));
    }
  }, [selectedUser?._id]);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allReceivedMessage]);

  // Send message
  const sendMessage = () => {
    if (text.trim() !== "" && socket && selectedUser) {
      const myMessage = {
        senderId: user?._id,
        receiverId: selectedUser?._id,
        text,
      };
      console.log("Sending message:", myMessage);
      socket.emit("sendMessage", myMessage);
      setText("");
    }
  };

  return (
    <div>
      {selectedUser ? (
        <div className="h-screen relative bg-pink-100">
          <div className=" px-2 h-[10%]  flex items-center justify-between border-b border-gray-300 bg-pink-100">
            <div className="flex items-center gap-2">
              <Image
                src={`http://localhost:5000${selectedUser?.avatarUrl}`}
                height={40}
                width={40}
                className="rounded-full border-2"
                alt="User Avatar"
              />
              <div>
                <h1 className="font-bold">{selectedUser?.name}</h1>
                <p className="text-neutral-500">Active now</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <TbMessageSearch className="h-5 w-5 text-[#707991]" />
              <IoCall className="h-5 w-5 text-[#707991]" />
              <BsThreeDotsVertical className="h-5 w-5 text-[#707991]" />
            </div>
          </div>
          <div className="pt-4 pb-5 px-10 h-[80%] overflow-y-scroll bg-black">
            <div className="flex flex-col">
              {allReceivedMessage.map((message, index) => (
                <div key={index} className="mt-6 w-full">
                  <span
                    className={`${user?._id === message?.senderId
                      ? "bg-pink-100 text-black"
                      : "bg-[#707991] text-white float-end"
                      } px-4 py-2 rounded-3xl`}
                  >
                    {message?.text}
                  </span>
                </div>
              ))}
              <div ref={messageEndRef} />{" "}
              {/* Reference to scroll to this div */}
            </div>
          </div>
          <div className="flex w-full justify-center items-center pt-2 mt-4 ">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();

                }
              }}
              className="border shadow-lg px-4 py-2 rounded-xl w-[500px]"
              placeholder="Type Message Here..."
            />
            <IoIosSend
              onClick={sendMessage}
              className="w-8 h-8  -ml-12 text-primary cursor-pointer text-[#fca5a5]"
            />
          </div>
        </div>
      ) : (
        <p>Select a user to start chatting</p>
      )}
    </div>
  );
};

export default DynamicUserItem;
