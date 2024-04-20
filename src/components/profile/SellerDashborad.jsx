import React from 'react';

const SellerDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          Dashboard
        </div>
        <ul className="py-4">
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Overview</li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Orders</li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Products</li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Customers</li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-4">Welcome to Your Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cards or Widgets */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Total Orders</h2>
            <p className="text-2xl font-bold">256</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Total Revenue</h2>
            <p className="text-2xl font-bold">$15,000</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">New Customers</h2>
            <p className="text-2xl font-bold">35</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
