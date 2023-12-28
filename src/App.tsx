import { useState, useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/slice/auth/authSlice";
import { Header } from "./components";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    async () => {
      try {
        const user = await authService.getCurrentUser();
        dispatch(login(user));
      } catch (error) {
        dispatch(logout());
        console.error("Error fetching current user:", error);
      }
    };
    setLoading(false);
  }, [dispatch]);
  return !loading ? (
    <>
      <div className="min-h-screen flex flex-wrap bg-gray-900 text-white">
        <div className="w-full block">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </>
  ) : (
    <p>Loading....</p>
  );
}

export default App;
