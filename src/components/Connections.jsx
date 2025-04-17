import axios from "axios";
import { BASE_URL } from "../utils/Constants.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice.js";
import "../index.css"; // Import your CSS file for animations

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [showAll, setShowAll] = useState(false);

  
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections?.length === 0)
    return (
      <div className="flex flex-col  min-h-[75vh]  items-center justify-center text-center mt-10">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          No Connection Requests Found
        </h1>
        <p className="mt-2 text-gray-400 text-lg">
          Looks like you haven’t received any connection requests yet. Why not
          take the first step?
        </p>
        <p className="mt-1 text-gray-400 text-md">
          Start networking and send connection requests to grow your circle! 🌍✨
        </p>
      </div>
    );

  return (
    <div className="flex justify-center p-6 ">
      <div className="w-full max-w-lg p-6 bg-white border-2 border-accent rounded-lg shadow-lg dark:bg-gray-900 ">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h5 className="text-2xl font-bold dark:text-accent">Your Connections</h5>

          {connections.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              {showAll ? "Show Less" : "View All"}
            </button>
          )}
        </div>
        
        {/* Connection List with Scroll or View All */}
        <div
          className={`overflow-y-auto ${
            connections.length > 5 ? "max-h-[465px]" : "max-h-auto"
          } custom-scrollbar`} // Increased height for better visibility
          style={{ paddingBottom: "20px" }} // Adds extra padding to prevent cutoff
        >
          <ul role="list" className="divide-y divide-gray-300 dark:divide-gray-700">
            {(showAll ? connections : connections.slice(0, 5)).map((connection, index) => (
              <li key={index} className="py-4 animate-fadeIn">
                <div className="flex items-center gap-4">
                  {/* Profile Image */}
                  <img
                    className="w-14 h-14 rounded-full border border-gray-300 dark:border-gray-600"
                    src={connection.photoUrl || "/default-profile.jpg"}
                    alt={connection.firstName}
                  />

                  {/* User Info */}
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900 dark:text-violet-500">
                      {connection.firstName} {connection.lastName}
                    </p>

                    <p className="text-sm text-gray-600 dark:text-cyan-400">
                      {connection.age} • {connection.gender}
                    </p>

                    <p className="mt-1 text-sm text-gray-500 dark:text-white text-start">
                      {connection.about}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Connections;
