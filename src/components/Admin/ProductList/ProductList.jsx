import React from "react";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa"; // Importing icons from react-icons

const ProductList = ({ products, onEdit, onDelete, onCreate }) => {
  return (
    <div>
      {/* Header with "Available Products" and "Create Product" Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Available Products</h2>
        <button
          onClick={onCreate}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <FaPlusCircle className="mr-2" />
          Create Product
        </button>
      </div>

      {/* List of Products */}
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{product.productName}</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="flex space-x-4">
              {/* Edit Icon */}
              <button
                onClick={() => onEdit(product.id)}
                className="text-blue-600 hover:text-blue-800"
                aria-label="Edit Product"
              >
                <FaEdit className="w-6 h-6" />
              </button>
              {/* Delete Icon */}
              <button
                onClick={() => onDelete(product.id)}
                className="text-red-600 hover:text-red-800"
                aria-label="Delete Product"
              >
                <FaTrashAlt className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
