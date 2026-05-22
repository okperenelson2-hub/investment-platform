// pages/dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Bell, User as UserIcon, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation (Desktop) / Bottom Nav (Mobile) */}
      <nav className="w-full md:w-64 bg-gray-800 p-4 hidden md:flex md:flex-col fixed h-full border-r border-gray-700">
        <h1 className="text-2xl font-bold text-blue-500 mb-8 tracking-wider">SIMUTRADE</h1>
        <ul className="space-y-4">
          <li className="text-blue-400 font-semibold cursor-pointer">Dashboard</li>
          <li className="text-gray-400 hover:text-gray-200 cursor-pointer">Investments</li>
          <li className="text-gray-400 hover:text-gray-200 cursor-pointer">Transactions</li>
          <li className="text-gray-400 hover:text-gray-200 cursor-pointer">Settings</li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8">
        {/* Top Header Bar */}
        <header className="flex justify-between items-center mb-8 bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm">
          <div className="text-sm text-gray-400">Platform Time: <span className="text-gray-200">{currentTime}</span></div>
          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <div className="bg-gray-700 p-2 rounded-full cursor-pointer">
              <UserIcon className="w-5 h-5 text-gray-200" />
            </div>
          </div>
        </header>

        {/* Hero Section: Total Balance & Quick Actions */}
        <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8 shadow-lg">
          <p className="text-gray-400 text-sm font-medium mb-1">Total Simulated Balance</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">$12,450.00 <span className="text-green-500 text-lg text-bold ml-2">+2.4%</span></h2>
          
          <div className="flex flex-wrap gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition">
              <ArrowDownRight className="mr-2" /> Simulate Deposit
            </button>
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition">
              <Activity className="mr-2" /> Invest
            </button>
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition">
              <ArrowUpRight className="mr-2" /> Demo Withdraw
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Profit Trends (Middle Area) */}
          <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg min-h-[300px] flex flex-col justify-center items-center">
            <p className="text-gray-400 mb-4 self-start">Profit Trends</p>
            {/* Note: In production, insert Recharts or Chart.js component here */}
            <div className="w-full h-48 border-b-2 border-l-2 border-gray-600 flex items-end justify-between px-2 pb-2">
                <div className="w-8 bg-blue-500 h-12"></div>
                <div className="w-8 bg-blue-500 h-24"></div>
                <div className="w-8 bg-blue-500 h-16"></div>
                <div className="w-8 bg-green-500 h-32 relative"><span className="absolute -top-6 text-xs text-green-400">Double!</span></div>
            </div>
          </section>

          {/* Active Investments Card */}
          <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <p className="text-gray-400 mb-4">Active Investments</p>
            <div className="bg-gray-700 p-4 rounded-lg mb-3 flex justify-between items-center border-l-4 border-green-500">
              <div>
                <h4 className="font-bold text-white">Alpha Simulation</h4>
                <p className="text-sm text-gray-400">Target: Double Profit</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-white">$5,000.00</p>
                <p className="text-sm text-green-400">Processing...</p>
              </div>
            </div>
          </section>
        </div>

        {/* Recent Activity (Bottom Area) */}
        <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg overflow-x-auto">
          <h3 className="text-gray-400 font-medium mb-4">Recent Activity</h3>
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-700 text-gray-400">
              <tr>
                <th className="p-3 rounded-tl-lg">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="p-3">Demo Deposit</td>
                <td className="p-3 text-green-400">+$2,000.00</td>
                <td className="p-3">Today, 14:30</td>
                <td className="p-3"><span className="bg-green-900 text-green-300 py-1 px-2 rounded text-xs">Completed</span></td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-3">Admin Adjustment</td>
                <td className="p-3 text-blue-400">+$450.00</td>
                <td className="p-3">Yesterday, 09:15</td>
                <td className="p-3"><span className="bg-green-900 text-green-300 py-1 px-2 rounded text-xs">Completed</span></td>
              </tr>
              <tr>
                <td className="p-3">Demo Withdraw</td>
                <td className="p-3 text-red-400">-$100.00</td>
                <td className="p-3">May 20, 11:00</td>
                <td className="p-3"><span className="bg-yellow-900 text-yellow-300 py-1 px-2 rounded text-xs">Processing</span></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
