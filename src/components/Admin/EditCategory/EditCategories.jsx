import React, { useState } from "react";

const EditCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Mobiles" },
    // Add more categories
  ]);

  const handleCategoryChange = (id, value) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, name: value } : category
    );
    setCategories(updatedCategories);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Product Categories</h2>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white p-4 rounded shadow">
            <input
              type="text"
              value={category.name}
              onChange={(e) => handleCategoryChange(category.id, e.target.value)}
              placeholder="Category Name"
              className="border p-2 rounded w-full"
            />
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditCategories;
