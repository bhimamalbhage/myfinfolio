import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const Dashboard = () => {

  const [activeTab, setActiveTab] = useState('overview');

  // Portfolio data
  const portfolioData = {
    totalValue: 124875.42,
    initialInvestment: 100000,
    cashBalance: 8540.22,
    dailyChange: 1284.36,
    dailyChangePercent: 1.04,
    totalReturn: 24875.42,
    totalReturnPercent: 24.88,
    assets: [
      { id: 1, name: 'Apple Inc.', symbol: 'AAPL', shares: 150, avgPrice: 152.34, currentPrice: 178.72, value: 26808.00, allocation: 21.5, dailyChange: 2.1, yearToDateReturn: 12.7, sector: 'Technology' },
      { id: 2, name: 'Microsoft Corp.', symbol: 'MSFT', shares: 85, avgPrice: 276.43, currentPrice: 321.86, value: 27358.10, allocation: 21.9, dailyChange: 1.4, yearToDateReturn: 15.2, sector: 'Technology' },
      { id: 3, name: 'Amazon.com Inc.', symbol: 'AMZN', shares: 120, avgPrice: 112.56, currentPrice: 128.91, value: 15469.20, allocation: 12.4, dailyChange: -0.8, yearToDateReturn: 9.8, sector: 'Consumer Cyclical' },
      { id: 4, name: 'Alphabet Inc.', symbol: 'GOOGL', shares: 90, avgPrice: 105.78, currentPrice: 129.27, value: 11634.30, allocation: 9.3, dailyChange: 0.3, yearToDateReturn: 11.5, sector: 'Technology' },
      { id: 5, name: 'Tesla Inc.', symbol: 'TSLA', shares: 110, avgPrice: 220.43, currentPrice: 175.34, value: 19287.40, allocation: 15.4, dailyChange: -2.1, yearToDateReturn: -14.8, sector: 'Consumer Cyclical' },
      { id: 6, name: 'Nvidia Corp.', symbol: 'NVDA', shares: 70, avgPrice: 167.54, currentPrice: 348.26, value: 24378.20, allocation: 19.5, dailyChange: 3.2, yearToDateReturn: 42.6, sector: 'Technology' }
    ]
  };

  // Market data
  const [marketData, setMarketData] = useState({
    indices: [
      { name: 'S&P 500', symbol: 'SPX', value: 5285.32, change: 0.72, lastUpdated: new Date() },
      { name: 'Dow Jones', symbol: 'DJI', value: 39021.75, change: 0.58, lastUpdated: new Date() },
      { name: 'Nasdaq', symbol: 'IXIC', value: 16718.36, change: 0.95, lastUpdated: new Date() },
      { name: 'Russell 2000', symbol: 'RUT', value: 2071.62, change: -0.12, lastUpdated: new Date() }
    ],
    sectors: [
      { name: 'Technology', change: 1.25, ytd: 8.76 },
      { name: 'Healthcare', change: 0.45, ytd: 3.21 },
      { name: 'Financials', change: 0.68, ytd: 5.43 },
      { name: 'Consumer Cyclical', change: -0.32, ytd: 2.87 },
      { name: 'Industrials', change: 0.78, ytd: 4.12 }
    ]
  });

  // Performance data
  const performanceData = [
    { date: '2024-03-01', value: 100000, benchmark: 100000 },
    { date: '2024-04-01', value: 101500, benchmark: 101200 },
    { date: '2024-05-01', value: 103200, benchmark: 102400 },
    { date: '2024-06-01', value: 104800, benchmark: 103600 },
    { date: '2024-07-01', value: 107500, benchmark: 104900 },
    { date: '2024-08-01', value: 110200, benchmark: 106300 },
    { date: '2024-09-01', value: 113400, benchmark: 107800 },
    { date: '2024-10-01', value: 116800, benchmark: 109400 },
    { date: '2024-11-01', value: 119500, benchmark: 111000 },
    { date: '2024-12-01', value: 121700, benchmark: 112800 },
    { date: '2025-01-01', value: 123200, benchmark: 114600 },
    { date: '2025-02-01', value: 124875, benchmark: 116500 }
  ];

  // Sector allocation data
  const sectorAllocation = [
    { name: 'Technology', value: 90178.60 },
    { name: 'Consumer Cyclical', value: 34756.60 },
    { name: 'Cash', value: 8540.22 }
  ];

  // Recent transactions
  const transactions = [
    { id: 1, date: '2025-02-28', type: 'Buy', symbol: 'NVDA', shares: 10, price: 346.72, total: 3467.20 },
    { id: 2, date: '2025-02-15', type: 'Sell', symbol: 'TSLA', shares: 5, price: 183.44, total: 917.20 },
    { id: 3, date: '2025-02-01', type: 'Dividend', symbol: 'AAPL', shares: null, price: null, total: 87.00 },
    { id: 4, date: '2025-01-25', type: 'Buy', symbol: 'MSFT', shares: 15, price: 318.52, total: 4777.80 },
    { id: 5, date: '2025-01-10', type: 'Deposit', symbol: null, shares: null, price: null, total: 5000.00 }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => {
        const updatedIndices = prev.indices.map(index => {
          const change = parseFloat(index.change) + (Math.random() * 0.2 - 0.1);
          const value = index.value * (1 + change / 1000);
          return {
            ...index,
            value: parseFloat(value.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            lastUpdated: new Date()
          };
        });
        return { ...prev, indices: updatedIndices };
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Format percentage
  const formatPercent = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
  };

  // Asset card for mobile view
  const AssetCard = ({ asset }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between mb-2">
        <h3 className="font-medium">{asset.name}</h3>
        <span className="text-gray-600">{asset.symbol}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-500">Shares</p>
          <p>{asset.shares}</p>
        </div>
        <div>
          <p className="text-gray-500">Price</p>
          <p>{formatCurrency(asset.currentPrice)}</p>
        </div>
        <div>
          <p className="text-gray-500">Value</p>
          <p className="font-medium">{formatCurrency(asset.value)}</p>
        </div>
        <div>
          <p className="text-gray-500">Daily</p>
          <p className={asset.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}>
            {formatPercent(asset.dailyChange)}
          </p>
        </div>
      </div>
    </div>
  );

  // Transaction card for mobile view
  const TransactionCard = ({ transaction }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">{transaction.date}</span>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          transaction.type === 'Buy' ? 'bg-green-100 text-green-800' :
          transaction.type === 'Sell' ? 'bg-red-100 text-red-800' :
          transaction.type === 'Dividend' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {transaction.type}
        </span>
      </div>
      {transaction.symbol && (
        <p className="text-base font-medium">{transaction.symbol}</p>
      )}
      <div className="grid grid-cols-2 gap-2 text-sm mt-2">
        {transaction.shares && (
          <div>
            <p className="text-gray-500">Shares</p>
            <p>{transaction.shares}</p>
          </div>
        )}
        {transaction.price && (
          <div>
            <p className="text-gray-500">Price</p>
            <p>{formatCurrency(transaction.price)}</p>
          </div>
        )}
        <div className="col-span-2">
          <p className="text-gray-500">Total</p>
          <p className={`font-medium ${transaction.type === 'Buy' ? 'text-red-600' : 'text-green-600'}`}>
            {transaction.type === 'Buy' ? '-' : '+'}{formatCurrency(transaction.total)}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Financial Dashboard</h1>
      
      {/* Navigation - More compact on mobile */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <div className="flex whitespace-nowrap">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-3 font-medium text-sm border-b-2 ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('market')}
            className={`py-2 px-3 font-medium text-sm border-b-2 ${activeTab === 'market' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
          >
            Market
          </button>
          <button 
            onClick={() => setActiveTab('performance')}
            className={`py-2 px-3 font-medium text-sm border-b-2 ${activeTab === 'performance' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
          >
            Performance
          </button>
        </div>
      </div>
      
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Value Cards - Stack on mobile, grid on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Total Value</h3>
              <p className="text-xl md:text-2xl font-semibold">{formatCurrency(portfolioData.totalValue)}</p>
              <p className="text-xs text-gray-500 mt-1">Cash: {formatCurrency(portfolioData.cashBalance)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Daily Change</h3>
              <p className={`text-xl md:text-2xl font-semibold ${portfolioData.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(portfolioData.dailyChange)} ({formatPercent(portfolioData.dailyChangePercent)})
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Total Return</h3>
              <p className={`text-xl md:text-2xl font-semibold ${portfolioData.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(portfolioData.totalReturn)} ({formatPercent(portfolioData.totalReturnPercent)})
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Assets</h3>
              <p className="text-xl md:text-2xl font-semibold">{portfolioData.assets.length}</p>
              <p className="text-xs text-gray-500 mt-1">{sectorAllocation.length - 1} Sectors</p>
            </div>
          </div>
          
          {/* Charts - Stack on mobile, grid on larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Asset Allocation */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Asset Allocation</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorAllocation}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {sectorAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [formatCurrency(value), 'Value']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Performance Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Performance</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis tickFormatter={(tick) => formatCurrency(tick)} />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), 'Value']}
                      labelFormatter={formatDate}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="Portfolio" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="benchmark" name="S&P 500" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Transactions - Table on desktop, cards on mobile */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold">Recent Transactions</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            
            {/* Mobile view: Cards */}
            <div className="md:hidden">
              {transactions.map(transaction => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
            
            {/* Desktop view: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{transaction.date}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          transaction.type === 'Buy' ? 'bg-green-100 text-green-800' :
                          transaction.type === 'Sell' ? 'bg-red-100 text-red-800' :
                          transaction.type === 'Dividend' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{transaction.symbol || '-'}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 text-right">{transaction.shares || '-'}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 text-right">{transaction.price ? formatCurrency(transaction.price) : '-'}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-right">
                        <span className={transaction.type === 'Buy' ? 'text-red-600' : 'text-green-600'}>
                          {transaction.type === 'Buy' ? '-' : '+'}{formatCurrency(transaction.total)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Assets - Table on desktop, cards on mobile */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold">Portfolio Assets</h2>
              <div>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Add</button>
              </div>
            </div>
            
            {/* Mobile view: Cards */}
            <div className="md:hidden">
              {portfolioData.assets.map(asset => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
            
            {/* Desktop view: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Price</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Daily</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {portfolioData.assets.map((asset) => (
                    <tr key={asset.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{asset.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{asset.symbol}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{asset.sector}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">{asset.shares}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">{formatCurrency(asset.avgPrice)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">{formatCurrency(asset.currentPrice)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{formatCurrency(asset.value)}</td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium text-right ${asset.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {asset.dailyChange >= 0 ? '+' : ''}{asset.dailyChange.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Market Data Tab */}
      {activeTab === 'market' && (
        <div>
          {/* Market Indices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {marketData.indices.map((index) => (
              <div key={index.symbol} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between">
                  <h3 className="text-gray-500 text-sm">{index.name}</h3>
                </div>
                <p className="text-xl font-semibold">{index.value.toLocaleString()}</p>
                <p className={`text-sm font-medium ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {index.change >= 0 ? '+' : ''}{index.change}%
                </p>
              </div>
            ))}
          </div>
          
          {/* Sector Performance */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Sector Performance</h2>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={marketData.sectors} 
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(tick) => `${tick}%`} />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Performance']} />
                  <Legend />
                  <Bar dataKey="change" name="Daily Change" fill="#8884d8" />
                  <Bar dataKey="ytd" name="YTD Performance" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div>
          {/* Performance Chart */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Portfolio Performance</h2>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={formatDate} />
                  <YAxis tickFormatter={(tick) => formatCurrency(tick)} />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), 'Value']}
                    labelFormatter={formatDate}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="value" name="Portfolio" stroke="#8884d8" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="benchmark" name="S&P 500" stroke="#82ca9d" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Initial Investment</h3>
              <p className="text-xl font-semibold">{formatCurrency(portfolioData.initialInvestment)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Current Value</h3>
              <p className="text-xl font-semibold">{formatCurrency(portfolioData.totalValue)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Total Return</h3>
              <p className={`text-xl font-semibold ${portfolioData.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(portfolioData.totalReturn)} ({formatPercent(portfolioData.totalReturnPercent)})
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;