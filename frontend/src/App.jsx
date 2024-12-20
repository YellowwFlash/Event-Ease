import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs.jsx";
import Categories from "./components/Categories.jsx";
import CreateEvent from "./components/CreateEvent.jsx";
import EventDetail from "./components/EventDetail.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import RegisterEvent from "./components/RegisterEvent.jsx";
import SignupUser from "./components/SignupUser.jsx";
import UpdateEvent from "./components/UpdateEvents.jsx";
import { useEffect, useState } from "react";
import Logout from "./components/Logout.jsx";
import Profile from './components/Profile.jsx';

const App = () => {
  // Fetch the login state and user from localStorage if they exist
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    return loggedIn ? JSON.parse(loggedIn) : false;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : {};
  });

  // Use useEffect to update localStorage whenever isLoggedIn or currentUser changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);
  const login = { isLoggedIn, setIsLoggedIn };
  const user = { currentUser, setCurrentUser };

  console.log(currentUser, ' is ', isLoggedIn);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home login={login} user={user} />}></Route>
        <Route path="/aboutUs" element={<AboutUs login={login} user={user} />}></Route>
        <Route path="/login" element={<Login login={login} user={user} />}></Route>
        <Route path="/logout" element={<Logout login={login} user={user} />}></Route>
        <Route path="/signup" element={<SignupUser login={login} user={user} />}></Route>
        <Route path="/createEvent" element={<CreateEvent login={login} user={user} />}></Route >
        <Route path="/updateEvent" element={<UpdateEvent login={login} user={user} />}></Route>
        <Route path="/registerEvent/:id" element={<RegisterEvent login={login} user={user} />}></Route >
        <Route path="/categories" element={<Categories login={login} user={user} />}></Route >
        <Route path="/events/:id" element={<EventDetail login={login} user={user} />} />
        <Route path="/profile" element={<Profile login={login} user={user} />}></Route >
        {/* <Route path="/event" element={< />}></Route > 
        {/* <Route path="/payment" element={< />}></Route > 
        {/* 
        */}
      </Routes>
    </BrowserRouter>

  );
};
export default App;
