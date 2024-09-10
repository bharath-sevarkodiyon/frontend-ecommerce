import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "../Provider/ProductProvider";
import { useNavigate, useParams } from 'react-router-dom';
import BackNavigation from "../BackNavigation/BackNavigation";
import Footer from "../Footer/Footer";

const SelectedProductList = () => {
  const { products, categories } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryName } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const filterProductsByCategory = () => {
      if (!products.length || !categories.length) {
        setLoading(true);
        return;
      }

      // Find category ID by category name
      const selectedCategory = categories.find(category => category.categoryName === categoryName);
      if (!selectedCategory) {
        setFilteredProducts([]);
        setLoading(false);
        return;
      }

      // Filter products based on the selected category ID
      const filteredProductsByCategory = products.filter(
        (product) => product.product_category === selectedCategory._id
      );

      setFilteredProducts(filteredProductsByCategory);
      setLoading(false);
    };

    filterProductsByCategory();
  }, [products, categories, categoryName]);

  const handleProductClick = (productName) => {
    navigate(`/product-details/${productName}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Ensuring min height of screen and flex column for layout */}
      <BackNavigation/>
      {/* Heading */}
      <h2 className="mt-4 text-2xl font-bold mb-2 text-center">{categoryName}</h2>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center space-x-4 flex-grow">
          {/* Added flex-grow here to take up remaining space when loading */}
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        // Product Grid
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 p-5 rounded-lg">
          {/* Added flex-grow here to take up remaining space when not loading */}
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white text-center shadow-md rounded-lg p-3"
              onClick={() => handleProductClick(product.productName)}
            >
              <img
                src={product.mainImage}
                alt={product.productName}
                className="w-full h-40 object-cover rounded-md cursor-pointer"
              />
              <p className="mt-2 text-sm font-semibold">{product.productName}</p>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SelectedProductList;
