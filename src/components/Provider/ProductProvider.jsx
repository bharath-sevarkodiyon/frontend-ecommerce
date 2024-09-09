import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/productCategory/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching product categories", error);
    }
  };

  const fetchCategoryById = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/productCategory/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product category by ID", error);
    }
  };

  // Create a new product
  const createProduct = async (newProduct) => {
    try {
      const response = await axios.post("http://localhost:5000/api/product/", newProduct);
      setProducts((prevProducts) => [...prevProducts, response.data]); // Add the new product to the state
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  // Update a product by ID
  const updateProductById = async (productId, updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/product/${productId}`, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? response.data : product // Update the product in the state
        )
      );
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  // Delete a product by ID
  const deleteProductById = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId)); // Remove the deleted product from the state
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const contextValue = {
    products,
    categories,
    fetchProducts,
    fetchCategories,
    fetchCategoryById,
    createProduct,        // Expose createProduct to context
    updateProductById,    // Expose updateProductById to context
    deleteProductById,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
