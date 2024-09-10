import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../Provider/ProductProvider";
import BackNavigation from "../BackNavigation/BackNavigation";
import { Toaster, toast } from "sonner";
import Footer from "../Footer/Footer";
// import { useAuth } from "../Provider/AuthContext";
// import { useCart } from "../Provider/CartProvider";

const ProductDetails = () => {
  const { productName } = useParams();
  const { products } = useProducts();
  // const { user } = useAuth();
  // const { addToCart } = useCart();
  const navigate = useNavigate();

  // State to handle image hover
  const [displayedImage, setDisplayedImage] = useState(null);

  const product = products.find(
    (product) => product.productName === productName
  );

  if (!product) {
    return <p className="text-center">Product not found.</p>;
  }

  const handleAddToCart = () => {
    navigate(`/cart?productId=${product._id}`);
    // if(user){
    //   addToCart(product);
    //   toast.success(`Product ${product.productName} has been added to the cart.`)
    // } else {
    //   toast.error('Please log in to add products to the cart.')
    // }
  };

  return (
    <div className="bg-purple-100">
      <BackNavigation />
      <div className="max-w-screen-lg mx-auto p-5">
        <div className="flex flex-col md:flex-row items-start space-y-5 md:space-y-0 md:space-x-10">
          {/* Product Image */}
          <img
            src={displayedImage || product.mainImage}  // Display the hovered image or the main image
            alt={product.productName}
            className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-lg"
          />

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.productName}
            </h1>

            {/* Display Item Price */}
            {product.itemPrice && (
              <div className="mb-2">
                <p className="text-gray-800 font-medium">
                  Item Price:
                  <span className="text-gray-700 font-semibold ml-2">
                    ₹{product.itemPrice.$numberDecimal}
                  </span>
                </p>
              </div>
            )}

            {/* Discount */}
            {product.discount !== undefined && product.discount > 0 && (
              <div className="mb-2">
                <p className="text-gray-800 font-medium">
                  Discount:
                  <span className="text-gray-700 font-semibold ml-2">
                    {product.discount}%
                  </span>
                </p>
              </div>
            )}

            {/* Display Selling Price */}
            <div className="mb-2">
              <p className="text-gray-800 font-medium">
                Price:
                <span className="text-gray-700 font-semibold ml-2">
                  ₹{product.sellingPrice.$numberDecimal}
                </span>
              </p>
            </div>

            {/* Description */}
            <div className="mb-4">
              <p className="text-gray-800 font-medium">
                Description:
                <span className="text-gray-700 font-normal ml-2">
                  {product.description}
                </span>
              </p>
            </div>

            {/* Product Details */}
            <div className="border-t border-b py-4 mb-4">
              <p className="text-gray-800 font-medium">
                Brand Name:
                <span className="text-gray-700 font-normal ml-2">
                  {product.brandName}
                </span>
              </p>
            </div>

            {/* Add to Cart Button */}
            <div className="flex justify-end mb-4">
              {/* Flex container to align right */}
              <Toaster richColors />
              <button
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            {/* Additional Images */}
            <div className="mt-4">
              <div className="flex space-x-4 cursor-pointer">
                {product.additionalImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Additional ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md shadow-md"
                    onMouseEnter={() => setDisplayedImage(image)} // Show the additional image on hover
                    onMouseLeave={() => setDisplayedImage(null)} // Revert to main image on mouse leave
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;