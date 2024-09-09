import React from "react";

const ViewOrders = () => {
  const orders = [
    { id: 1, customer: "John Doe", total: 250, status: "Pending" },
    { id: 2, customer: "Jane Smith", total: 150, status: "Completed" },
    // Add more sample orders
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded shadow">
            <p>Customer: {order.customer}</p>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
              Update Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewOrders;
