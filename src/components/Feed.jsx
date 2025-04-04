import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed?.length) return; // ✅ Prevents unnecessary API calls
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data || []));
    } catch (error) {
      // console.error("Error fetching feed:", error);
      res.status(500).json({ message: "Error fetching feed!" });

    }
  };

  useEffect(() => {
    getFeed();
  }, []);


  if (!feed || feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          🚀 Your Feed is Up-to-Date!
        </h1>
        <p className="mt-5 text-gray-400 text-lg sm:text-base">
          No more profiles to connect with for now. Check back later to find new connections!
        </p>
        
      </div>
    );
    
  }

  return (
    <div className="flex flex-col items-center justify-center p-6"> 
      
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
