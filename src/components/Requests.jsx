import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { Toaster,toast } from "react-hot-toast";
import { playSound } from "../utils/soundPlayer";
import "../index.css"; // Import your CSS file for animations
const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    playSound("/click.mp3"); // Play sound on button click
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
    //   console.log("fucntion called", res);
    // console.log(requests.fromUserId.firstName);
    if(status=="accepted"){
     toast.success("Amazing! You've made a new connection. 🎉", {
              position: "top-center",
              duration: 3000,
            });

          }
          dispatch(removeRequest(_id));
    } catch (error) {
    //   console.log(error); 
    res.status(500).json({ message: "Error in making New connection!" });
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
    //   console.log("ye dataa hai", res?.data?.data);
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests?.length === 0)
    return (
        <div className="flex flex-col items-center justify-center text-center mt-10">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          No Connection Requests Found
        </h1>
        <p className="mt-2 text-gray-400 text-lg">
          Looks like you haven’t received any connection requests yet. Why not take the first step?
        </p>
        <p className="mt-1 text-gray-400 text-md"> 
          Start networking and send connection requests to grow your circle! 🌍✨
        </p>
      </div>
      
    );

  return (
    <>
      <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        removeDelay: 1000,
        style: {
          background: "#A78BFA", 
          color: "#fff", 
          borderRadius: "8px",
          padding: "12px 16px",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(167, 139, 250, 0.5)", 
        },
    
        success: {
          duration: 3000,
          iconTheme: {
            primary: "#8B5CF6", 
            secondary: "#FFFFFF", 
          },
        },
        
        error: {
          style: {
            background: "#F87171", 
            color: "#fff",
          },
        },
      }}
    />
    <div className="flex justify-center p-6">
      <div className="w-full max-w-lg p-6 bg-white border-2 border-accent rounded-lg shadow-lg dark:bg-gray-900 ">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-2xl font-bold  dark:text-accent">
            Connections Requests
          </h5>
          <a
            href="/connections"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a>
        </div>

        <ul
          role="list"
          className="divide-y divide-gray-300 dark:divide-gray-700"
        >
          {requests.map((request, index) => (
            <li key={index} className="py-4 animate-fadeIn">
              <div className="flex items-center gap-4">
                <img
                  className="w-14 h-14 rounded-full border border-gray-300 dark:border-gray-600"
                  src={request.fromUserId.photoUrl || "https://tse2.mm.bing.net/th?id=OIP.gWz-QI2hDDhQpDnBvMe_2wHaHj&pid=Api&P=0&h=240"}
                  alt={request.fromUserId.firstName}
                />

                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-900 dark:text-violet-500">
                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-cyan-400">
                    {request.fromUserId.age} • {request.fromUserId.gender}
                  </p>

                  <p className="mt-1 text-sm hidden md:block text-gray-500 dark:text-white text-start">
                    {request.fromUserId.about}
                  </p>
                </div>
                <button className="inline-flex items-center cursor-grab px-3 py-2 text-sm font-medium text-white bg-cyan-500 rounded-lg hover:bg-cyan-700 transition-all" onClick={() => reviewRequest("rejected", request._id)}>
            
                  Reject
                </button>
                <button className="flex items-center cursor-grab px-3 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-700 transition-all" onClick={() => reviewRequest("accepted", request._id)}>
                  Accept
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Requests;
