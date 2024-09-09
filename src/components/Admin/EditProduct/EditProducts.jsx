import React, { useState } from "react";
import ProductList from "../ProductList/ProductList";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/components/Provider/ProductProvider"; 

const EditProducts = () => {
  const {
    products,
    updateProductById, 
    deleteProductById,  
  } = useProducts(); 
  const navigate = useNavigate();

  const [editingProductId, setEditingProductId] = useState(null); // State to manage which product is being edited
  const [editingProduct, setEditingProduct] = useState(null); // State to hold the current editing product's data

  // When a product is selected for editing, initialize the editing state
  const handleEdit = (id) => {
    const product = products.find((product) => product.id === id);
    setEditingProductId(id); // Set the product ID that is being edited
    setEditingProduct({ ...product }); // Initialize editing state with selected product data
  };

  // Function to handle product field change
  const handleProductChange = (field, value) => {
    setEditingProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  // Function to handle save action
  const handleSave = async () => {
    try {
      await updateProductById(editingProductId, editingProduct); // Use the updateProductById function to update product in the provider
      setEditingProductId(null); // Reset editing state after saving
      setEditingProduct(null); // Clear editing product state
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const selectedProduct = products.find(
    (product) => product.id === editingProductId
  ); // Find the selected product based on editingProductId

  return (
    <div>
      {editingProductId === null ? (
        // If no product is selected for editing, show the list of products
        <ProductList products={products} onEdit={handleEdit} />
      ) : (
        // If a product is selected for editing, show the edit form for that product
        <div>
          <ArrowLeft onClick={() => navigate(-1)} /> {/* Back button */}
          <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
          {selectedProduct && editingProduct && ( // Render only if selectedProduct is found and editingProduct is initialized
            <div key={selectedProduct.id} className="bg-white p-4 rounded shadow">
              <div className="grid grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Product Name</label>
                  <input
                    type="text"
                    value={editingProduct.productName}
                    onChange={(e) =>
                      handleProductChange("productName", e.target.value)
                    }
                    placeholder="Product Name"
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Description</label>
                  <input
                    type="text"
                    value={editingProduct.description}
                    onChange={(e) =>
                      handleProductChange("description", e.target.value)
                    }
                    placeholder="Product Description"
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* Item Price */}
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Item Price</label>
                  <input
                    type="number"
                    value={editingProduct.itemPrice}
                    onChange={(e) =>
                      handleProductChange("itemPrice", e.target.value)
                    }
                    placeholder="Item Price"
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* Discount */}
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Discount (%)</label>
                  <input
                    type="number"
                    value={editingProduct.discount}
                    onChange={(e) =>
                      handleProductChange("discount", e.target.value)
                    }
                    placeholder="Discount (%)"
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* Selling Price */}
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Selling Price</label>
                  <input
                    type="number"
                    value={editingProduct.sellingPrice}
                    onChange={(e) =>
                      handleProductChange("sellingPrice", e.target.value)
                    }
                    placeholder="Selling Price"
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* Stock Quantity */}
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Stock Quantity</label>
                  <input
                    type="number"
                    value={editingProduct.stockQuantity}
                    onChange={(e) =>
                      handleProductChange("stockQuantity", e.target.value)
                    }
                    placeholder="Stock Quantity"
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* Product Category Name */}
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Product Category</label>
                  <input
                    type="text"
                    value={editingProduct.productCategoryName}
                    onChange={(e) =>
                      handleProductChange("productCategoryName", e.target.value)
                    }
                    placeholder="Product Category"
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* Brand Name */}
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Brand Name</label>
                  <input
                    type="text"
                    value={editingProduct.brandName}
                    onChange={(e) =>
                      handleProductChange("brandName", e.target.value)
                    }
                    placeholder="Brand Name"
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* Main Image */}
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Main Image</label>
                  <input
                    type="text"
                    value={editingProduct.mainImage}
                    onChange={(e) =>
                      handleProductChange("mainImage", e.target.value)
                    }
                    placeholder="Main Image URL"
                    className="border p-2 rounded w-full"
                  />
                  <img
                    src={editingProduct.mainImage}
                    alt="Main"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                </div>

                {/* Additional Image */}
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Additional Image</label>
                  <input
                    type="text"
                    value={editingProduct.additionalImage}
                    onChange={(e) =>
                      handleProductChange("additionalImage", e.target.value)
                    }
                    placeholder="Additional Image URL"
                    className="border p-2 rounded w-full"
                  />
                  <img
                    src={editingProduct.additionalImage}
                    alt="Additional"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                </div>
              </div>
              {/* Centered Save Button */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditProducts;
