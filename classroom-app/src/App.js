import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import BaseLayout from "./components/BaseLayout";
import High from "./pages/High";
import Create from "./pages/Create";
import Join from "./pages/Join";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ClassRoom from "./pages/ClassRoom";
import Manager from "./pages/ClassManager";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <BaseLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
      <Routes>
        <Route path="/" element={<High isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/create" element={<Create />} />
        <Route path="/join" element={<Join />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/manager" element={<Manager/>}/>
        <Route path="/classroom" element={<ClassRoom />} />

      </Routes>
    </BaseLayout>
  );
};

export default App;
