import React from "react";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import Feed from "./Feed";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Connections from "./Connections";
import Requests from "./Requests";
import Signup from "./Signup";
import ChangePassword from "./ChangePassword";
import { Toaster } from "react-hot-toast";
import Privacy from "./Privacy";
import Terms from "./Terms";
import About from "./About";
import Chat from "./Chat";


function App() {
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

  

      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/about" element={<About />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>  
      </Provider>
      
    </>
  );
}

export default App;
