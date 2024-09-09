import React, { useState } from "react";
import EditProducts from "../EditProduct/EditProducts";
import EditCategories from "../EditCategory/EditCategories";
import ViewOrders from "../ViewOrders/ViewOrders";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products"); // State to track the active tab

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-1/5 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-center font-bold text-lg border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="flex-grow">
          <ul>
            <li>
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full text-left px-4 py-3 hover:bg-gray-700 ${
                  activeTab === "products" ? "bg-gray-700" : ""
                }`}
              >
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("categories")}
                className={`w-full text-left px-4 py-3 hover:bg-gray-700 ${
                  activeTab === "categories" ? "bg-gray-700" : ""
                }`}
              >
                Product Categories
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-3 hover:bg-gray-700 ${
                  activeTab === "orders" ? "bg-gray-700" : ""
                }`}
              >
                Orders
              </button>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700 text-center">
          © 2024 BuzzBee Admin
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8 bg-purple-100 overflow-y-auto">
        {activeTab === "products" && <EditProducts />}
        {activeTab === "categories" && <EditCategories />}
        {activeTab === "orders" && <ViewOrders />}
      </main>
    </div>
  );
};

export default AdminDashboard;
