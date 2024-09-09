import React, { useCallback, useEffect, useState } from "react";
import { useCart } from "../Provider/CartProvider";
import { useAuth } from "../Provider/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../Provider/ProductProvider";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useOrders } from "../Provider/OrderProvider";
import CartNavbar from "../navbar/CartNavbar";

const Checkout = () => {
  const { getCart, cartDetails } = useCart();
  const { user, updateUser } = useAuth();
  const { products } = useProducts();
  const { createOrder } = useOrders();
  const { id: cartId } = useParams();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [address, setAddress] = useState({
    shippingAddress: "",
    billingAddress: "",
    state: "",
    city: "",
    pincode: "",
  });

  const fetchCart = useCallback(async () => {
    if (user) {
      try {
        await getCart(user._id);
        const specificCart = cartDetails.find(
          (cart) => cart._id === cartId && cart.created_by === user._id
        );

        if (specificCart) {
          const updatedCartItems = specificCart.productDetails.map(
            (cartItem) => {
              const product = products.find(
                (p) => p._id === cartItem.product_id
              );
              return {
                product_id: cartItem.product_id,
                productName: product ? product.productName : "Unknown Product",
                orderedQuantity: cartItem.orderedQuantity,
                sellingPrice: product ? cartItem.sellingPrice : "0.00",
                mainImage: product ? product.mainImage : "",
              };
            }
          );
          setCartItems(updatedCartItems);
        } else {
          setError("Cart not found or does not belong to the user.");
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart data", error);
        setError("Failed to fetch cart data.");
        setCartItems([]);
      }
      setLoading(false);
    }
  }, [user, cartId, getCart, products]);

  const checkUserAddress = useCallback(() => {
    if (
      !user.shippingAddress ||
      !user.billingAddress ||
      !user.state ||
      !user.city ||
      !user.pincode
    ) {
      setShowAddressPopup(true);
    } else {
      setAddress({
        shippingAddress: user.shippingAddress,
        billingAddress: user.billingAddress,
        state: user.state,
        city: user.city,
        pincode: user.pincode,
      });
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
    checkUserAddress();
  }, [fetchCart, checkUserAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: name === "pincode" ? Number(value) : value,
    }));
  };

  const handleAddressSubmit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/user/${user._id}`,
        address
      );
      updateUser({ ...user, ...response.data });
      setShowAddressPopup(false);
      console.log("Address updated successfully");
    } catch (error) {
      console.error("Failed to update address", error);
    }
  };

  const handleCancel = () => {
    setShowAddressPopup(false);
  };

  const proceedPayment = async () => {
    if (
      user.shippingAddress &&
      user.billingAddress &&
      user.state &&
      user.city &&
      user.pincode
    ) {
      console.log(`Proceed to payment with ${paymentMethod}`);
      try {
        const orderData = {
          created_by: user._id,
          productDetails: cartItems,
        };
        await createOrder(orderData);
        navigate(`/order?cartId=${cartId}`);
      } catch (error) {
        console.error("Failed to create order", error);
      }
    } else {
      setShowAddressPopup(true);
    }
  };

  const openEditAddressPopup = () => {
    setShowAddressPopup(true);
  };

  if (loading) return <Skeleton />;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <CartNavbar />
      <div className="p-5 w-full mx-auto space-x-5 flex">
        {/* Left Side: Product Display */}
        <div className="w-3/5 pr-5 ">
          <h1 className="text-2xl font-bold mb-4 p-3">Checkout</h1>
          {cartItems.length === 0 ? (
            <p>Your cart is empty or does not belong to you.</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="flex items-center border-b py-4"
                >
                  <img
                    src={item.mainImage}
                    alt={item.productName}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">
                      {item.productName}
                    </h2>
                    <p className="text-gray-600">Price: ₹{item.sellingPrice}</p>
                    <p className="text-gray-600">
                      Quantity: {item.orderedQuantity}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-semibold">
                      Total: ₹
                      {(
                        parseFloat(item.sellingPrice) * item.orderedQuantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-right">
                <p className="text-xl font-bold">
                  Grand Total: ₹
                  {cartItems
                    .reduce(
                      (total, item) =>
                        total +
                        parseFloat(item.sellingPrice) * item.orderedQuantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Address, Payment Method, and Checkout Button */}
        <div className="w-2/5 h-full pl-5 sticky top-3">
          {/* Display User Address Details in Table Format */}
          {user.shippingAddress &&
            user.billingAddress &&
            user.state &&
            user.city &&
            user.pincode && (
              <div className="mt-4 text-left mb-5 ">
                <h3 className="text-lg font-semibold mb-2">
                  Address Details
                  <HiOutlinePencilAlt
                    className="inline-block ml-4 cursor-pointer text-black"
                    onClick={openEditAddressPopup}
                  />
                </h3>
                <table className="min-w-full">
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 font-semibold">
                        Shipping Address
                      </td>
                      <td className="py-2 px-4">{user.shippingAddress}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold">
                        Billing Address
                      </td>
                      <td className="py-2 px-4">{user.billingAddress}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold">City</td>
                      <td className="py-2 px-4">{user.city}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold">State</td>
                      <td className="py-2 px-4">{user.state}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold">Pincode</td>
                      <td className="py-2 px-4">{user.pincode}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

          {/* Payment Method Radio Buttons */}
          <div className="mt-4 text-left mb-5">
            <label className="block mb-2 font-semibold">Payment Method</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="Google Pay"
                  checked={paymentMethod === "Google Pay"}
                  onChange={() => setPaymentMethod("Google Pay")} // Update payment method on selection
                  className="form-radio text-gray-400"
                />
                <span>Google Pay</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="Phone Pay"
                  checked={paymentMethod === "Phone Pay"}
                  onChange={() => setPaymentMethod("Phone Pay")} // Update payment method on selection
                  className="form-radio text-gray-400"
                />
                <span>Phone Pay</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="Net Banking"
                  checked={paymentMethod === "Net Banking"}
                  onChange={() => setPaymentMethod("Net Banking")} // Update payment method on selection
                  className="form-radio text-gray-400"
                />
                <span>Net Banking</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="Cash on Delivery"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={() => setPaymentMethod("Cash on Delivery")} // Update payment method on selection
                  className="form-radio"
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* Centered Checkout Button */}
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600 transition"
              onClick={proceedPayment}
            >
              Checkout
            </button>
          </div>
        </div>

        {/* Address Popup Form */}
        {showAddressPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/2">
              <h2 className="text-xl font-bold mb-4">Enter Address Details</h2>
              <div className="mb-4">
                <label className="block mb-2">Shipping Address</label>
                <input
                  type="text"
                  name="shippingAddress"
                  value={address.shippingAddress}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Billing Address</label>
                <input
                  type="text"
                  name="billingAddress"
                  value={address.billingAddress}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Pincode</label>
                <input
                  type="number"
                  name="pincode"
                  value={address.pincode}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  onClick={handleAddressSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
