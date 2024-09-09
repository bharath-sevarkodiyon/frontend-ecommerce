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
  FaArrowLeft,
} from "react-icons/fa"; // Import React Icons

const Navbar = () => {
  const { user, logout } = useAuth(); // Include logout function
  const { products, categories } = useProducts(); // Fetch products and categories from ProductProvider
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

  // Filter products and categories based on search term
  const filterResults = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.productName.toLowerCase().includes(lowerCaseTerm)
    );
    const filteredCategories = categories.filter((category) =>
      category.categoryName.toLowerCase().includes(lowerCaseTerm)
    );

    return { products: filteredProducts, categories: filteredCategories };
  };

  // Handle result click
  const handleResultClick = (type, id) => {
    if (type === "product") {
      navigate(`/product-details/${id}`);
    } else if (type === "category") {
      navigate(`/product/${id}`);
    }
    setShowResults(false); // Close the search results after navigation
    setSearchTerm(""); // Clear the search input
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
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

        {/* Search Bar */}
        <div className="flex-grow max-w-md mx-4 relative">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-indigo-200 h-4 w-4" /> {/* React Icons search icon */}
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="w-full border bg-indigo-50 rounded-md pl-10 pr-4 py-2 outline-none"
            />
          </div>

          {/* Search Results Dropdown */}
          {showResults && (
            <div className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-md overflow-hidden max-h-64 overflow-y-auto">
              {filteredResults.products.length === 0 &&
              filteredResults.categories.length === 0 ? (
                <p className="p-4 text-gray-500">No results found.</p>
              ) : (
                <>
                  {/* Display Filtered Categories */}
                  {filteredResults.categories.length > 0 && (
                    <div className="border-b">
                      <p className="p-2 font-semibold text-gray-700">Categories</p>
                      {filteredResults.categories.map((category) => (
                        <div
                          key={category._id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleResultClick("category", category.categoryName)}
                        >
                          {category.categoryName}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Display Filtered Products */}
                  {filteredResults.products.length > 0 && (
                    <div>
                      <p className="p-2 font-semibold text-gray-700">Products</p>
                      {filteredResults.products.map((product) => (
                        <div
                          key={product._id}
                          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleResultClick("product", product.productName)}
                        >
                          <img
                            src={product.mainImage}
                            alt={product.productName}
                            className="w-8 h-8 rounded-full object-cover mr-2"
                          />
                          <div>
                            <p className="text-gray-700">{product.productName}</p>
                            <p className="text-sm text-gray-500">₹{product.sellingPrice.$numberDecimal}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Account Details */}
        <div className="flex items-center space-x-6">
          {/* Cart Details */}
          <div className="flex items-center space-x-2" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="text-gray-700 h-6 w-6" />
            <button className="text-gray-700 hover:text-black"> Cart </button>
          </div>

          {/* Account Details / Login Button */}
          {user ? (
            <div className="relative">
              {/* User Information with Dropdown Toggle */}
              <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                <FaUser className="text-gray-700 h-6 w-6" />
                <span className="text-gray-700">{user.firstName}</span>
                <FaChevronDown
                  className={`text-gray-700 h-4 w-4 transition-transform duration-200 ${
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
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black focus:outline-none"
            >
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
