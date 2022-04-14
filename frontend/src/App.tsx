import React from "react";
import Messenger from "./Components/Messenger";
import Navbar from "./Components/Pages/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import Dashbord from "./Components/Admin";
import { io } from "socket.io-client";
import Landing from "./Components/Pages/Section";

const socket: any = io("/");

const App = () => {
  React.useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/admin/dashbord" element={<Dashbord socket={socket} />} />
    </Routes>
  );
};

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const Home = () => {
  return (
    <>
      <Landing />
      <Messenger socket={socket} />
    </>
  );
};

export default App;
