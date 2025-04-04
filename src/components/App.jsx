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
function App() {
  return (
    <>
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
            </Route>
          </Routes>
        </BrowserRouter>  
      </Provider>
      
    </>
  );
}

export default App;
