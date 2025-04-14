import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import {toast} from "react-hot-toast";
import PasswordInput from "./PasswordInput";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [skills, setSkills] = useState("");
  const [about, setAbout] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, age, gender, photoUrl, skills, about, emailId, password },
        { withCredentials: true }
      );
      console.log(res?.data?.user);
      dispatch(addUser(res?.data?.user));
      toast.success(`Hey ${firstName}, you’re officially live on techTinder 🚀 Time to match brains.`)
;
       return navigate("/"); 
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-auto p-4 bg-gray-100 dark:bg-gray-950">
    <div className="flex max-h-[80vh]  flex-col items-center justify-center p-3 md:p-4 bg-gray-100 dark:bg-gray-950">
      <div className="w-full max-w-md p-3 bg-white dark:bg-gray-900 border-2 border-primary  rounded-lg shadow-md">
        <div className="text-center  md:mb-0 mb-2">
          <h2 className="text-xl font-bold text-gray-900">
            <span className="text-primary">tech</span> <span className="text-accent">Tinder</span>
          </h2>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Create Account</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Sign up to find and connect with developers..
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-1 md:space-y-2">  
          <div className="flex flex-row md:flex-row space-x-3 md:space-x-3">
            <div className="w-1/2 md:w-1/2">
              <label className="block text-sm font-semibold  md:mb-0 mb-2 text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                required
                placeholder="Your First Name"
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 pr-10 border   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="w-1/2 md:w-1/2">
              <label className="block text-sm font-semibold md:mb-0   mb-2 text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                required
                placeholder="Your Last Name"
                onChange={(e) => setLastName(e.target.value)}
                className="  w-full px-4 py-2 pr-10 border   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
          <div className="flex flex-row md:flex-row  space-x-3 md:space-x-4">
            <div className="w-1/2 md:w-1/2">
              <label className="block text-sm font-semibold md:mb-0 mb-2 text-gray-700 dark:text-gray-300">
                Age
              </label>
              <input
                type="number"
                value={age}
                required
                min="13"
                max="100"
                placeholder="Enter your Age..."
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-2 pr-10 border   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="w-1/2 md:w-1/2">
              <label className="block text-sm font-semibold md:mb-0  mb-2 text-gray-700 dark:text-gray-300">
                Gender
              </label>
              <select
                value={gender}
                required
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border rounded-md   shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex  flex-row  md:flex-row space-x-3 md:space-x-4">
            <div className="w-1/2 md:w-1/2">
              <label className="block text-sm font-semibold md:mb-0 mb-2 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={emailId}
                placeholder="Enter your Email"
                required
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full px-4 py-2 pr-10 border   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="w-1/2 md:w-1/2">
              <label className="block text-sm font-semibold md:mb-0 mb-2 text-gray-700 dark:text-gray-300">
                Password
              </label>
              <PasswordInput
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold md:mb-0 mb-2 text-gray-700 dark:text-gray-300">
              Profile Photo URL
            </label>
            <input
              type="url"
              value={photoUrl}
              placeholder="https://example.com/photo.jpg"
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full px-4 py-2 pr-10 border   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold  md:mb-0 mb-2  text-gray-700 dark:text-gray-300">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              value={skills}
              placeholder="React, Node.js, Python"
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-4 py-2 pr-10 border   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold  md:mb-0 mb-2 text-gray-700 dark:text-gray-300">
              About
            </label>
            <textarea
              value={about}
              required
              placeholder="Tell us something about yourself..."
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-2 pr-10 border   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none h-12"
            ></textarea>
          </div>

          <p className="text-red-500">{error}</p>

          <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg  cursor-pointer border hover:bg-opacity-90 transition disabled:opacity-50" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign up"}
          </button>

          <div className="text-center text-sm text-gray-700 dark:text-gray-300">
            Already have an account? <Link to="/login" className="text-primary underline-offset-4 hover:underline">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
