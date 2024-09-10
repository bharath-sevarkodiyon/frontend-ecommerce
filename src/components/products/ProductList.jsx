import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "../Provider/ProductProvider";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi"; // Importing the icon

const ProductList = ({ category }) => {
  const { products, categories } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const filterProductsByCategory = () => {
      if (!products.length || !categories.length) {
        setLoading(true);
        return;
      }
      // Map the product category id with the product category name
      const categoryMap = categories.reduce((map, cat) => {
        map[cat._id] = cat.categoryName;
        return map;
      }, {});

      // Create a new key to store the product category name
      const productsWithCategoryNames = products.map((product) => ({
        ...product,
        product_category_name: categoryMap[product.product_category],
      }));

      // Filtering only the product based on product category
      const filteredProductsByCategory = productsWithCategoryNames.filter(
        (product) => product.product_category_name === category
      );

      setFilteredProducts(filteredProductsByCategory.slice(0, 5)); // Display only the first 5 products
      setLoading(false);
    };

    filterProductsByCategory();
  }, [products, categories, category]);

  const handleProductClick = (productName) => {
    navigate(`/product-details/${productName}`);
  };

  const handleViewMoreClick = () => {
    navigate(`/product/${category}`); // Navigating to the respective category page
  };

  return (
    <div className="p-5 bg-purple-100">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 bg-violet-200 py-3 rounded-md">
        {category}
      </h2>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        // Product Image Grid
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white text-center shadow-md rounded-lg p-4 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => handleProductClick(product.productName)}
              >
                <img
                  src={product.mainImage}
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-md font-medium text-gray-800 bg-gray-50 py-2 px-1 rounded-md">
                  {product.productName}
                </p>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleViewMoreClick}
              className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-lg"
            >
              View More
              <HiArrowRight className="ml-2 text-lg" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
