// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// const ProductCategory = () => {
//   const [productCategories, setProductCategories] = useState([])

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/productCategory/")
//       .then((response) => {
//         // console.log(response.data)
//         setProductCategories(response.data)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }, [])

//   return (
//     <div className="flex overflow-x-auto space-x-5 p-5 mt-5 bg-yellow-50 justify-center">
//       {productCategories.map((category, index) => (
//         <div key={index} className="flex-shrink-0 w-36 text-center">
//           <img 
//             src={category.image} 
//             alt={category.categoryName} 
//             className="w-full h-28 object-cover rounded-md cursor-pointer" 
//           />
//           <p className="mt-2 text-sm font-semibold">{category.categoryName}</p>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ProductCategory

import React from 'react';
import { useProducts } from '../Provider/ProductProvider'; // Assuming the context is in context/ProductContext
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton'; // Assuming you have a Skeleton component available

const ProductCategory = () => {
  const { categories } = useProducts(); // Use the context hook to get categories
  const navigate = useNavigate();

  // Assume we have a loading state from the context, or manage it here
  const loading = categories.length === 0; // Consider loading if there are no categories

  const handleCategoryClick = (categoryName) => {
    navigate(`/product/${categoryName}`); // Navigate to ProductList page with categoryName parameter
  };

  return (
    <div className="p-5 mt-5 bg-yellow-50">
      {loading ? (
        // Skeletons for loading state
        <div className="flex overflow-x-auto space-x-5 justify-center">
          {Array.from({ length: 5 }).map((_, index) => ( // Render 5 skeletons as placeholders
            <div key={index} className="flex-shrink-0 w-36 text-center">
              <Skeleton className="w-full h-28 rounded-md" />
              <Skeleton className="mt-2 h-4 w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      ) : (
        // Render categories when loaded
        <div className="flex justify-center items-center">
          <div className="grid gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {categories.map((category, index) => (
              <div 
              key={index} 
              className="flex-shrink-0 w-36 text-center cursor-pointer"
              onClick={() => handleCategoryClick(category.categoryName)}
              >
                <img
                  src={category.image}
                  alt={category.categoryName}
                  className="w-full max-w-[100px] h-28 object-cover rounded-md sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px]"
                />
                <p className="mt-2 text-sm font-semibold">{category.categoryName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;