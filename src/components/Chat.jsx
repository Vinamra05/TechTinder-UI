import React, {  useEffect , useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/Socket";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Chat = () => {
  const { targetUserId } = useParams();
  const chatContainerRef = useRef(null);
  const socketRef = useRef(null);
  const [messages, setmessages] = useState([]);
  const [targetUserDetails, setTargetUserDetails] = useState({
    name: "",
    online: false,
  });
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);

  const userId = user?._id; // Get the current user's ID from the Redux store
  const navigate = useNavigate();

  const fetchTargetUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/" + targetUserId, {
        withCredentials: true,
      });
      const { firstName, lastName, isOnline } = res.data?.user;
      setTargetUserDetails({
        name: `${firstName} ${lastName}`,
        online: isOnline,
      });
    } catch (err) {
      console.error("Error fetching target user:", err);
    }
  };

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    // console.log(chat?.data?.chat?.messages);

    const chatMessages = chat?.data?.chat?.messages.map((msg) => {
      const { sender, text, time } = msg;
      return {
        firstName: sender?.firstName,
        lastName: sender?.lastName,
        text,
        time:
          time ||
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        photoUrl:
          sender?.photoUrl ||
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      };
    });

    // console.log(chatMessages);
    setmessages(chatMessages); // Set the messages state with the fetched chat messages
  };

  useEffect(() => {
    fetchChatMessages();
    fetchTargetUser();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  useEffect(() => {
    if (!userId) {
      return;
    }
    // const socket = createSocketConnection();
    socketRef.current = createSocketConnection(); // Create a socket connection
    const socket = socketRef.current; // Get the socket instance
    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    }); // Join the chat room for the target user

    socket.on("messageReceived", ({ firstName, lastName, text, time,photoUrl }) => {
      // console.log(firstName + ": " + text);
      // console.log("Received photoUrl:", photoUrl);
      setmessages((prevMessages) => [
        ...prevMessages,
        { firstName, lastName, text, time,photoUrl },
      ]); // Update the messages state with the received message
    });
   


    socket.on("userOffline", (offlineUserId) => {
      console.log("User offline:", offlineUserId);
      if (offlineUserId === targetUserId) {
        setTargetUserDetails((prev) => ({ ...prev, online: false }));
      }
    });



    socket.on("userStatusChanged", ({ userId: changedId, isOnline }) => {
      if (changedId === targetUserId) {
        setTargetUserDetails(prev => ({
          ...prev,
          online: isOnline,
        }));
      }
    });


    return () => {
      socket.disconnect(); // Clean up the socket connection on component unmount
    };
  }, [userId, targetUserId]);

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    // const socket = createSocketConnection();
    const socket = socketRef.current; // Get the socket instance

    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }); // Emit the message to the server

   
  



    // Prevent sending empty messages
    // console.log("Sending message:", newMessage);

    socket.on("notConnected", (data) => {
      const toastId = toast.error(data.message || "You are not connected!", {
        duration: 3000,
      });

      // Navigate after toast closes
      setTimeout(() => {
        toast.dismiss(toastId);
        navigate("/connections");
      }, 3000);
    });

    // setTimeout(() => {
    //   socket.disconnect();
    // }, 1000);

    setNewMessage("");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-6">
      {/* Heading */}
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-600 mb-6 text-center">
        Your Private Chat
      </h2>

     

      {/* Chat Container */}
      <div ref={chatContainerRef} className="w-full max-w-2xl bg-gray-800 border-2 border-accent rounded-xl shadow-lg pl-2 pr-2 space-y-4 overflow-y-auto max-h-[65vh] custom-scrollbar">
        {/* Messages */}
        <div className="sticky top-0 z-10   backdrop-blur-md  bg-gray-700 border-b border-accent pb-2 pt-1 px-2 flex items-center justify-between">
          <h3 className="text-[25px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-400 ">
            {targetUserDetails.name}
          </h3>
          <span
            className={`text-sm font-medium ${
              targetUserDetails.online ? "text-green-400" : "text-gray-400"
            }`}
          >
            {targetUserDetails.online ? "● Online" : "● Offline"}
          </span>
        </div>
        {messages.map((msg, index) => {
          const isSender = msg.firstName === user.firstName;
          return (
            <div
              key={index}
              className={`chat ${isSender ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User"
                    src={
                      msg?.photoUrl ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <div className="chat-header text-emerald-400 text-sm">
                {`${msg.firstName} ${msg.lastName}`}
                <time className="text-xs text-blue-400 opacity-60 ml-2">
                  {msg.time || "Now"}
                </time>
              </div>
              <div
                className={`chat-bubble ${
                  isSender ? "bg-cyan-500" : "bg-violet-500"
                } text-white`}
              >
                {msg.text}
              </div>
              <div
                className={`chat-footer ${
                  isSender ? "text-cyan-400" : "text-red-400"
                } opacity-50`}
              >
                {isSender ? `Seen at ${msg.time || "Now"}` : "Delivered"}
              </div>
            </div>
          );
        })}

        {/* Input Field */}
        <div className="flex items-center gap-2 p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 input input-bordered w-full dark:bg-gray-700 dark:text-white"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="btn btn-primary rounded-lg px-4 py-2 text-white"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
