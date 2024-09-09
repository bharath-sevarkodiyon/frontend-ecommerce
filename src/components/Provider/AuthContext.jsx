import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateUser = (updatedUser) => {
    setUser(updatedUser); // Update user information
  };

    // Fetch user details on app load
    const fetchUserById = useCallback(async (userId) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/user/${userId}`);
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
      setLoading(false);
    })

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });
      const userData = response.data.data;
      setUser(userData);
      
      Cookies.set("user_id", userData._id, { expires: 0.25 }); // Expires in 7 days
      Cookies.set("user_role", userData.role, { expires: 0.25 });
      
      console.log(userData);
      setLoading(false);

      toast.success("Logged in successfully!");
        setTimeout(()=>{
          navigate("/");
        }, 3000)


    } catch (error) {
      console.error("Error logging in:", error);
      setLoading(false);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message); // Display error message from backend
      } else {
        toast.error("An error occurred during signup. Please try again."); // Generic error message
      }
    }
  };

  const signup = async (signupData) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/signup", signupData);
      if (response.status === 201) {
        setUser(response.data);
        setLoading(false);
        toast.success("Account created successfully!");
        setTimeout(()=>{
          navigate("/");
        }, 3000)
      } else {
        console.error("Signup failed", response.status);
        setLoading(false);
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setLoading(false);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message); // Display error message from backend
      } else {
        toast.error("An error occurred during signup. Please try again."); // Generic error message
      }
    }
  };

  const logout = async () => {
    setUser(null);
    Cookies.remove("user_id");
    Cookies.remove("user_role");
    await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
    navigate("/login");
  };

  const value = {
    user,
    loading,
    fetchUserById,
    updateUser,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const updateUser = (updatedUser) => {
//     setUser(updatedUser); // Update user information
//   };

//   // Fetch user by ID
//   const fetchUserById = useCallback(async (userId) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:5000/user/${userId}`);
//       console.log(response.data);
//       setUser(response.data);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       setUser(null); // Ensure user is set to null on error
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const login = async (email, password) => {
//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:5000/login", { email, password });
//       const userData = response.data.data;
//       setUser(userData);

//       Cookies.set("user_id", userData._id, { expires: 0.25 }); // Expires in 6 hours
//       Cookies.set("user_role", userData.role, { expires: 0.25 });

//       console.log(userData);

//       navigate("/");
//     } catch (error) {
//       console.error("Error logging in:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signup = async (signupData) => {
//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:5000/signup", signupData);
//       if (response.status === 201) {
//         setUser(response.data);
//         navigate("/");
//       } else {
//         console.error("Signup failed", response.status);
//       }
//     } catch (error) {
//       console.error("Error signing up:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     setUser(null);
//     Cookies.remove("user_id");
//     Cookies.remove("user_role");
//     await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
//     navigate("/login");
//   };

//   const value = {
//     user,
//     loading,
//     fetchUserById,
//     updateUser,
//     login,
//     signup,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);
