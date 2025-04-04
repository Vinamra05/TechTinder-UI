import React from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice"; 
import axios from "axios";
const UserCard = ({ user }) => {
  if (!user) {
    return <p className="text-center text-gray-400">Loading user data...</p>;
  }

  const dispatch = useDispatch();
  const { firstName, lastName, gender, age, photoUrl, about } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      console.log("func called");
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: "Error in Making new Connection !!" });
    }
  };

  return (
    
    <div className="w-[70%] sm:w-[60%] md:w-[80%] lg:w-[70%] xl:w-[25%] bg-gray-900 border border-gray-700 rounded-xl shadow-lg dark:bg-gray-900 dark:border-gray-700 transition-all hover:shadow-2xl flex flex-col justify-center items-center max-h-[70%] p-5 mr-2">
  
      
        <figure>
          <img
            className="w-full h-[280px] object-cover rounded-t-xl cursor-pointer
            "
            src={photoUrl || "/default-profile.jpg"}
            alt={firstName || "User Photo"}
          />
        </figure>

        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 cursor-pointer">
            {firstName ? `${firstName} ${lastName || ""}` : "User Name"}
          </h2>

          {age && gender && (
            <p className="mt-2 inline-block px-3 py-1 text-sm font-semibold text-gray-300 bg-gray-800 rounded-full">
             🎂 {age} |  {gender}
            </p>
          )}

          <p className="mt-3 mb-5 text-sm text-gray-400 italic">
            {about || "This user hasn't added a bio yet."}
          </p>

          <div className="flex justify-around items-center gap-2 ">
            <button
              className="px-3 py-2 text-sm font-medium text-white bg-cyan-500 rounded-lg shadow-md hover:bg-cyan-700 cursor-grab transition-all flex items-center gap-2 "
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
              className="px-3 py-2 text-sm font-medium text-white bg-violet-500 rounded-lg shadow-md hover:bg-violet-700 transition-all  cursor-grab flex items-center gap-2"
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
