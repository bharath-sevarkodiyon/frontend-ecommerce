import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import { useAuth } from '../Provider/AuthContext';
import Cookies from 'js-cookie';

const CartNavbar = () => {
  const navigate = useNavigate();

  const { user, fetchUserById } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = Cookies.get("user_id"); // Get user_id from cookie
      if (userId && !user) { // Ensure user data is fetched only if user is not already set
        console.log(userId);
        await fetchUserById(userId); // Fetch user data using fetchUserById
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex items-center justify-between px-5 py-3 shadow-md">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        {/* Back Button */}
        <button 
          className="text-gray-700 hover:text-black"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-xl" />
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://generated-assets.prod.myninja.ai/be20b773-b2c7-4e6e-ae7d-0dd29dde7958/cd1eb8f9-fe48-43e9-959b-3ef5da2b6fbd_2.jpeg" // Replace with actual logo path
            alt="Logo"
            className="h-8 w-8 object-contain overflow-hidden rounded-3xl hover:scale-110"
          />
          <span className="text-lg font-semibold text-gray-800">BuzzBee</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-6">
        
        {/* Account Details */}
        {user ? (
          <div className="flex items-center space-x-2 cursor-pointer hover:text-black">
            <FaUser className="text-gray-700 h-6 w-6" />
            <span className="text-gray-700">{user.firstName}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 cursor-pointer hover:text-black" onClick={() => navigate('/login')}>
            <FaUser className="text-gray-700 h-6 w-6" />
            <span className="text-gray-700">Login / Signup</span>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartNavbar;
