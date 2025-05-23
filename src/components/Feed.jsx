import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { toast } from "react-hot-toast";    

const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth?.user);
  const [animationKey, setAnimationKey] = useState(0);
  const [skillFilter, setSkillFilter] = useState("");
  const [filteredFeed, setFilteredFeed] = useState([]);
  const [unfilteredFeed, setUnfilteredFeed] = useState([]);
  const [usingFiltered, setUsingFiltered] = useState(false);
  const [filterExhausted, setFilterExhausted] = useState(false);

  const currentFeed = usingFiltered ? filteredFeed : unfilteredFeed;
  const currentUser = currentFeed[0];

  const getFeed = async (skills = "", isFallback = false) => {
    try {
      const query = skills ? `?skills=${skills}` : "";
      const res = await axios.get(BASE_URL + "/feed" + query, {
        withCredentials: true,
      });

      const users = res?.data?.data || [];

      if (isFallback) {
        setUnfilteredFeed(users);
        setUsingFiltered(false);
      } else {
        setFilteredFeed(users);
        setUsingFiltered(true);
        setFilterExhausted(false); // reset flag on new search
        if (skills && users.length > 0) {
          toast.success(`Showing profiles with skill: ${skills}`);
        } else if (skills && users.length === 0) {
          toast.error(`No users found with skill: ${skills}! Please Refresh the page`);
        }
      }

      dispatch(addFeed(users)); // optional global state update
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed(); // Load default feed
  }, [user?._id]);

  const handleSwipe = () => {
    setAnimationKey((prev) => prev + 1);
    if (usingFiltered) {
      const next = filteredFeed.slice(1);
      if (next.length === 0) {
        setFilteredFeed([]);
        setFilterExhausted(true); // 🎯 Notify that filtered users are done
      } else {
        setFilteredFeed(next);
      }
    } else {
      setUnfilteredFeed(unfilteredFeed.slice(1));
    }
  };

  const handleFilter = () => {
    if (!skillFilter.trim()) return;
    getFeed(skillFilter);

  };

  const handleShowRemaining = () => {
    getFeed("", true); // fallback to general feed
    setFilterExhausted(false);
  };

  if (filterExhausted && skillFilter.trim()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] text-center">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 mb-4">
          🔍 No more users found with skill: “{skillFilter.trim().charAt(0).toUpperCase() + skillFilter.trim().slice(1)}”
        </h2>
        {/* {setSkillFilter("")} */}
        <p className="text-gray-500 mb-6">
          Looks like you've explored all the profiles with that skill.
        </p>
        <button onClick={handleShowRemaining} className="btn btn-accent">
          Show Other Users
        </button>
      </div>
    );
  }

  if (!currentFeed?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          🚀 Your Feed is Up-to-Date!
        </h1>
        <p className="mt-5 text-gray-400 text-lg sm:text-base">
          No more profiles to connect with for now. Check back later 😊!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start px-4 pt-20 min-h-screen pb-24">
  {/* Filter */}
  <div className="w-full max-w-xl fixed top-[72px] z-10  backdrop-blur-lg rounded-md shadow px-4 py-3">
    <div className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Enter Skills to Filter the Users..."
        value={skillFilter}
        onChange={(e) => setSkillFilter(e.target.value)}
        className="flex-1 input border-purple-500 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
      <button onClick={handleFilter} className="btn btn-accent">
        Filter
      </button>
    </div>
    

  <hr className=" mt-3 h-[2px] border-0 bg-gradient-to-r  from-purple-400 via-pink-500 to-red-400 dark:from-purple-600 dark:via-pink-600 dark:to-red-500" />
  </div>
  {/* User Cards */}
  <div key={animationKey} className="mt-4 fade-in-up w-full flex justify-center">
    
    <UserCard user={currentUser} onSwipe={handleSwipe} variant="feed" />
  </div>
</div>
   
  );
};

export default Feed;
