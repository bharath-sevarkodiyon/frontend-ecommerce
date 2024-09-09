// OrderProvider.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const createOrder = async (orderData) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/orders`, orderData);
      if (response.status === 201) {
        setOrders(response.data);
        // Update orders state after creation
        // fetchOrders(); // Refresh orders after successful creation
        console.log("Order created successfully!");
      }
    } catch (error) {
      console.error("Error creating order", error);
      throw new Error("Failed to create order.");
    }
  };

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders`);
      return response.data;
      // setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders', error);
      throw error;
    }
  }, []);

  const fetchOrdersById = useCallback(async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
      return response.data;
      // setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders', error);
      throw error;
    }
  }, []);

  return (
    <OrderContext.Provider value={{ orders, createOrder, fetchOrders, fetchOrdersById }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
