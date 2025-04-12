import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { Toaster ,toast } from "react-hot-toast";
import UserCard from "./UserCard";

const EditProfile = ({user}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || ""); 
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");    

  const saveProfile = async (e) => { 
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
        const res = await axios.patch(BASE_URL + "/profile/edit", {firstName,lastName,photoUrl,age,gender,about}, {withCredentials: true});
        dispatch(addUser(res?.data?.data));
        toast.success("Profile Updated Successfully", {
          position: "top-center",
          duration: 3000,
        });
        
        setIsLoading(false);     
    } catch (err) {
        setError(err?.response?.data || "Something went wrong");
        setIsLoading(false);    
    }
  };
    

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

  <div className="flex max-h-[80vh]  justify-center  items-center md:p-2 bg-gray-100 dark:bg-gray-950">
    <div className=" w-full p-2 md:max-w-md bg-white dark:bg-gray-900 border-2 border-secondary rounded-lg m-3 md:mt-5 md:mb-5 shadow-md">
      <h3 className="text-2xl text-center mb-2 font-bold dark:text-fuchsia-700  underline">
        Edit Profile
      </h3>

      <form onSubmit={saveProfile} className="space-y-1 md:space-y-2">
        {/* First Name */}
        <label htmlFor="firstName" className="block text-lg font-medium dark:text-violet-400">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
          className="  w-full px-3 py-2  border  h-7 md:h-10  text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500      border-gray-300 dark:border-gray-700  bg-white  dark:bg-gray-800 "
        />

        {/* Last Name */}
        <label htmlFor="lastName" className="block text-lg font-medium dark:text-violet-400">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
          className="  w-full px-3 py-2  border  h-7 md:h-10    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500      border-gray-300 dark:border-gray-700  bg-white  dark:bg-gray-800 "
        />

        {/* Photo URL */}
        <label htmlFor="photoUrl" className="block text-lg font-medium dark:text-violet-400">
          Photo URL
        </label>
        <input
          id="photoUrl"
          type="text"
          value={photoUrl}
          required
          onChange={(e) => setPhotoUrl(e.target.value)}
          className="  w-full px-3 py-2   border h-7 md:h-10  text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500      border-gray-300 dark:border-gray-700  bg-white  dark:bg-gray-800 "
        />

        {/* Gender Dropdown */}
        <label htmlFor="gender" className="block text-lg font-medium dark:text-violet-400">
          Gender
        </label>
        <select
          id="gender"
          value={gender}
          required
          onChange={(e) => setGender(e.target.value)}
         className="  w-full px-3 py-2  border h-9 md:h-10  text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500      border-gray-300 dark:border-gray-700  bg-white  dark:bg-gray-800 "
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* Age */}
        <label htmlFor="age" className="block text-lg font-medium dark:text-violet-400">
          Age
        </label>
        <input
          id="age"
          type="number"
          value={age}
          required
          onChange={(e) => setAge(e.target.value)}
          className="  w-full px-3 py-2  border   h-7 md:h-11   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500    border-gray-300 dark:border-gray-700  bg-white  dark:bg-gray-800 "
        />

        {/* About (Textarea) */}
        <label htmlFor="about" className="block text-lg font-medium dark:text-violet-400">
          About
        </label>
        <textarea
          id="about"
          value={about}
          required
          onChange={(e) => setAbout(e.target.value)}
          rows="3"
         className="  w-full px-3 py-2  border h-9 md:h-12  text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500     border-gray-300 dark:border-gray-700  bg-white  dark:bg-gray-800 "
        ></textarea>

        <p className="text-red-500">{error}</p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Saving Changes..." : "Save Profile"}
        </button>
      </form>
    </div>

    <UserCard user={{ firstName, lastName, photoUrl, age, gender, about } } variant="edit" />
  </div>
  </>
);

};

export default EditProfile;


//gender mei male or female or  other teen option add krne hai error aye to bs male or female as a dropdown karna hai kal ka first task 


// profile update hone ke baad toast bhi dikhana hai ki profile updated successfully position top center

//about section ke liye textarea use karna hai input ko change karke textarea karna hai