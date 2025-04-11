import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import PasswordInput from "./PasswordInput";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const dispatch = useDispatch();
  const handleChangePassword = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      toast.error("New password and Confirm Password do not match.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/profile/update-password`,
        { oldPassword, newPassword },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
     
      if (response?.status === 200) {
        const successMessage = response?.data?.message || "Password updated!";
        toast.success(successMessage + " You need to login again.");
      
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      
       
        setTimeout(() => {
          dispatch(removeUser());
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      // Extract error from backend consistently
      const errorMsg =
        err?.response?.data?.error || err?.response?.data?.message || "Something went wrong.";
  
      // Show toast error
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <form
        onSubmit={handleChangePassword}
        className="w-full max-w-md p-6 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-900"
      >
        <h2 className="text-xl text-center font-bold text-gray-900">
            <span className="text-primary">tech</span>{" "}
            <span className="text-accent">Tinder</span>
          </h2>
        <h2 className="text-xl font-bold mb-4 text-center dark:text-white">
          Change Password
        </h2>
        <div className="mb-4">
          <label className="block text-md mb-1 dark:text-gray-300">
            Current Password
          </label>
          <PasswordInput
                type="password"
                value={oldPassword}
                required
                placeholder={"Type your current password"}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
              />
        </div>
        <div className="mb-4">
          <label className="block text-md mb-1 dark:text-gray-300">
            New Password
          </label>
          <PasswordInput
                type="password"
                value={newPassword}
                placeholder={"Type your new password"}
                required
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
              />
        </div>
        <div className="mb-4">
          <label className="block text-md mb-1 dark:text-gray-300">
            Confirm New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={confirmPassword}
            placeholder="Type your new password again"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
