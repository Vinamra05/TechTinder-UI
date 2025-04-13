import React, { useRef } from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { playSound } from "../utils/soundPlayer";

import axios from "axios";

const UserCard = ({ user, onSwipe, variant = "feed" }) => {
  if (!user) {
    return <p className="text-center text-gray-400">Loading user data...</p>;
  }
  const IGNORE_SOUND = "/ignore.mp3";
  const INTERESTED_SOUND = "/interested.mp3";
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const { firstName, lastName, gender, age, photoUrl, about } = user;
  const widthClasses =
    variant === "edit"
      ? "w-[50%]  md:w-[22%]" // 💡 Width for EditProfile
      : "w-[60%] md:w-[80%] lg:w-[70%] xl:w-[25%]"; // 💡 Width for Feed

  // const handleSendRequest = async (status, userId) => {
  //   if (!cardRef.current) return;
  //   playSound("/click.mp3", 0.7);

  //   const animationClass =
  //     status === "ignored" ? "card-animate-left" : "card-animate-right";
  //   cardRef.current.classList.add(animationClass);

  //   setTimeout(() => {
  //     // Play swipe sound just before actual API call
  //     playSound("/swipe.mp3", 1.0);
  //   }, 300);

  //   setTimeout(async () => {
  //     try {
  //       await axios.post(
  //         `${BASE_URL}/request/send/${status}/${userId}`,
  //         {},
  //         { withCredentials: true }
  //       );
  //       dispatch(removeUserFromFeed(userId));
  //       onSwipe(); // 🔥 Trigger next card
  //     } catch (error) {
  //       console.error("Error sending request:", error);
  //     }
  //   }, 400); // match the animation duration
  // };
  const handleSendRequest = async (status, userId) => {
    if (!cardRef.current) return;
  
    const animationClass = status === "ignored" ? "card-animate-left" : "card-animate-right";
    cardRef.current.classList.add(animationClass);
  
    // 👉 Play different sound based on status
    const soundToPlay = status === "ignored" ? IGNORE_SOUND : INTERESTED_SOUND;
    playSound(soundToPlay, 0.8);
  
    setTimeout(async () => {
      try {
        await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
        dispatch(removeUserFromFeed(userId));
        onSwipe(); // 🔥 Trigger next card
      } catch (error) {
        console.error("Error sending request:", error);
      }
    }, 400); // match with CSS animation
  };
  
  return (
    <div
      ref={cardRef}
      className={`${widthClasses}  shadow-lg  dark:bg-gray-900  transition-all hover:shadow-2xl flex flex-col justify-center items-center max-h-[70%] p-6 mr-2 border-3 border-purple-600 rounded-xl`}
    >
      <figure>
        <img
          className="w-full  h-[220px]  md:h-[280px]  object-cover rounded-t-xl cursor-pointer"
          src={
            photoUrl ||
            "https://tse2.mm.bing.net/th?id=OIP.cjKYIzYOViaYl4E6Pb2ZtgHaHa&pid=Api&P=0&h=260"
          }
          alt={firstName || "User Photo"}
        />
      </figure>

      <div className="p-5 text-center">
        <h2 className="text-2xl font-bold text-transparent  bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 cursor-pointer">
          {firstName ? `${firstName} ${lastName || ""}` : "User Name"}
        </h2>

        {age && gender && (
          <p className="mt-2 inline-block px-3 py-1 text-sm font-semibold text-gray-300 bg-gray-800 rounded-full">
            🎂 {age} | {gender}
          </p>
        )}

        <p className="mt-3 mb-4 text-sm text-gray-400 italic overflow-auto max-h-[100px] px-1">
          {about || "This user hasn't added a bio yet."}
        </p>

        <div className="flex justify-around items-center gap-1 md:gap-2">
        <button
    disabled={variant === "edit"}
    className={` ${
      variant === "edit"
        ? "bg-green-500 cursor-not-allowed px-2 md:px-3 py-2 text-sm font-medium text-white rounded-lg shadow-md transition-all  flex items-center gap-1 md:gap-2 hover:bg-green-700"
        : " px-2 md:px-3 py-2 text-sm font-medium rounded-lg shadow-md text-white  transition-all cursor-grab flex items-center gap-1 md:gap-2 bg-green-500  hover:bg-green-600"
    }`}
    onClick={() => handleSendRequest("ignored", user._id)}
  >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Ignore
          </button>

          <button
          disabled={variant === "edit"}
            className= {`${ variant === "edit" ? "px-2 md:px-3 py-2 text-sm font-medium text-white bg-violet-500 rounded-lg shadow-md hover:bg-violet-700 cursor-not-allowed transition-all  flex items-center gap-1 md:gap-2" : "px-2 md:px-3 py-2 text-sm font-medium text-white bg-violet-500 rounded-lg shadow-md hover:bg-violet-700 transition-all cursor-grab flex items-center gap-1 md:gap-2"}`}
            onClick={() => handleSendRequest("interested", user._id)}
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
