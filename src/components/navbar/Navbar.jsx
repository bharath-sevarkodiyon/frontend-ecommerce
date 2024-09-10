import React, { useState, useEffect } from "react";
import { useAuth } from "../Provider/AuthContext";
import { useProducts } from "../Provider/ProductProvider"; // Import ProductProvider
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaChevronDown,
  FaBox,
  FaSignOutAlt,
} from "react-icons/fa"; // Import React Icons
import Cookies from "js-cookie"; // Import js-cookie

const Navbar = () => {
  const { fetchUserById, logout, user } = useAuth(); // Include fetchUserById and logout function
  const { products } = useProducts(); // Fetch products from ProductProvider
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [searchTerm, setSearchTerm] = useState(""); // State to manage search input
  const [filteredResults, setFilteredResults] = useState([]); // State to manage filtered results
  const [showResults, setShowResults] = useState(false); // State to manage visibility of search results

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Logout function
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Handle search input changes
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim().length > 0) {
      const filtered = filterResults(value);
      setFilteredResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  // Filter products based on search term for both product name and description
  const filterResults = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    const filteredProducts = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(lowerCaseTerm) ||
        product.description.toLowerCase().includes(lowerCaseTerm) // Include description in search
    );

    return filteredProducts; // Only return filtered products
  };

  // Handle result click
  const handleResultClick = (id) => {
    navigate(`/product-details/${id}`);
    setShowResults(false); // Close the search results after navigation
    setSearchTerm(""); // Clear the search input
  };

  // Fetch user data from the cookie
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = Cookies.get("user_id"); // Get user_id from cookie
      if (userId && !user) {
        await fetchUserById(userId); // Fetch user data using fetchUserById
      }
    };

    fetchUserData();
  }, [fetchUserById, user]);

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-lg z-50 mb-16">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src="https://generated-assets.prod.myninja.ai/be20b773-b2c7-4e6e-ae7d-0dd29dde7958/cd1eb8f9-fe48-43e9-959b-3ef5da2b6fbd_2.jpeg"
              alt="Logo"
              className="h-10 w-10 overflow-hidden rounded-3xl hover:scale-110"
            />
            <span className="text-xl font-semibold text-white">BuzzBee</span>
          </div>

          {/* Search Bar */}
          <div className="flex-grow max-w-md mx-4 relative">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="text-indigo-200 h-4 w-4" /> {/* React Icons search icon */}
              </span>
              <input
                type="text"
                placeholder="Search products or descriptions..."
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="w-full border bg-indigo-50 rounded-md pl-10 pr-4 py-2 outline-none"
              />
            </div>

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-md overflow-hidden max-h-64 overflow-y-auto">
                {filteredResults.length === 0 ? (
                  <p className="p-4 text-gray-500">No results found.</p>
                ) : (
                  <>
                    {/* Display Filtered Products */}
                    <div>
                      <p className="p-2 font-semibold text-gray-700">Products</p>
                      {filteredResults.map((product) => (
                        <div
                          key={product._id}
                          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleResultClick(product._id)}
                        >
                          <img
                            src={product.mainImage}
                            alt={product.productName}
                            className="w-8 h-8 rounded-full object-cover mr-2"
                          />
                          <div>
                            <p className="text-gray-700">{product.productName}</p>
                            <p className="text-sm text-gray-500">₹{product.sellingPrice.$numberDecimal}</p>
                            <p className="text-xs text-gray-400">{product.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Account Details */}
          <div className="flex items-center space-x-6">
            {/* Cart Details */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/cart")}>
              <FaShoppingCart className="text-white h-6 w-6" />
              <button className="text-white"> Cart </button>
            </div>

            {/* Account Details / Login Button */}
            {user ? (
              <div className="relative">
                {/* User Information with Dropdown Toggle */}
                <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                  <FaUser className="text-white h-6 w-6" />
                  <span className="text-white">Welcome, {user.firstName}</span>
                  <FaChevronDown
                    className={`text-white h-4 w-4 transition-transform duration-200 ${
                      dropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg py-2">
                    <button
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => navigate("/userorders")}
                    >
                      <FaBox className="mr-4" /> Orders
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="mr-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white px-4 py-2 rounded-md hover:bg-white hover:text-black focus:outline-none"
              >
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
