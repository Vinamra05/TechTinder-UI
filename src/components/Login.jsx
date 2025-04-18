import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import {  toast } from "react-hot-toast";
import { playSound } from "../utils/soundPlayer";
import PasswordInput from "./PasswordInput";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
  
      setIsLoading(false);
      setPassword("");
      setEmailId("");
  
      // Dispatch user data to Redux
      dispatch(addUser(res?.data));
      
      // Show toast message
      toast.success(`Hey👋 ${res?.data?.firstName || "User"}, Explore the app! 🚀`);
      playSound("/login.mp3",0.5);
  
      // Navigate to home page
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err?.response?.data || "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 md:p-8 bg-gray-100 dark:bg-gray-950">
      <div className="flex flex-col items-center justify-center text-center mb-4">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Welcome to techTinder   
        </h1>
        <p className="text-gray-600 mt-4">
          Connect with friends and the world around you on our platform.
        </p>
        <p className="text-gray-400 mt-2 text-lg">
          Explore, share, and discover new connections.
        </p>
      </div>

      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 border-2 border-cyan-500 rounded-lg shadow-md">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            <span className="text-primary">tech</span>{" "}
            <span className="text-accent">Tinder</span>
          </h2>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sign in
          </h3>
          <p className="text-sm text-gray-600 mt-2 dark:text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-md font-medium text-primary "
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={emailId}
              placeholder="john@example.com"
              required
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-4 py-2 pr-10 border   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-md font-medium text-accent"
            >
              Password
            </label>
            <PasswordInput
              id="password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 pr-10 border   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          {/* <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="text-primary underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div> */}
          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
          <div className="text-center text-sm text-gray-700 dark:text-gray-300">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
