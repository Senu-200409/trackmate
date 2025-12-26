import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Fuel, 
  Wrench,
  Users,
  Bus,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Activity,
  Target
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';

function Analytics({ onMenuClick, setActiveTab }) {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  
  const financialData = [
    { month: "Jan", revenue: 38000, expenses: 28000, profit: 10000 },
    { month: "Feb", revenue: 42000, expenses: 29000, profit: 13000 },
    { month: "Mar", revenue: 45000, expenses: 31000, profit: 14000 },
    { month: "Apr", revenue: 48000, expenses: 32000, profit: 16000 },
    { month: "May", revenue: 52000, expenses: 35000, profit: 17000 },
    { month: "Jun", revenue: 45820, expenses: 32800, profit: 13020 },
  ];

  const expenseBreakdown = [
    { category: "Fuel", amount: 3850, percentage: 35, color: "bg-orange-500" },
    { category: "Maintenance", amount: 2150, percentage: 20, color: "bg-blue-500" },
    { category: "Salaries", amount: 3200, percentage: 29, color: "bg-green-500" },
    { category: "Insurance", amount: 1100, percentage: 10, color: "bg-purple-500" },
    { category: "Other", amount: 660, percentage: 6, color: "bg-gray-500" },
  ];

  const kpis = [
    { label: "Total Revenue", value: "$45,820", change: "+12.5%", isPositive: true, icon: <DollarSign className="w-5 h-5" /> },
    { label: "Total Expenses", value: "$32,800", change: "+8.2%", isPositive: false, icon: <TrendingDown className="w-5 h-5" /> },
    { label: "Net Profit", value: "$13,020", change: "+18.3%", isPositive: true, icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Profit Margin", value: "28.4%", change: "+2.1%", isPositive: true, icon: <Target className="w-5 h-5" /> },
  ];

  const performanceMetrics = [
    { label: "Fleet Utilization", value: "78%", target: "80%", status: "warning" },
    { label: "On-Time Rate", value: "92%", target: "95%", status: "good" },
    { label: "Safety Score", value: "9.2/10", target: "9.0/10", status: "excellent" },
    { label: "Customer Satisfaction", value: "4.8/5", target: "4.5/5", status: "excellent" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Business Analytics</h1>
              <p className="text-gray-600 mt-1">Track your fleet's financial performance and KPIs</p>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
              {['monthly', 'quarterly', 'yearly'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                    selectedPeriod === period 
                      ? 'bg-[#1E3A5F] text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${kpi.isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
                    <span className={kpi.isPositive ? 'text-green-600' : 'text-red-600'}>{kpi.icon}</span>
                  </div>
                  <span className={`flex items-center text-sm font-medium ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {kpi.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                <div className="text-sm text-gray-600">{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Revenue vs Expenses Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Revenue vs Expenses</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded"></div>
                    <span className="text-sm text-gray-600">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded"></div>
                    <span className="text-sm text-gray-600">Expenses</span>
                  </div>
                </div>
              </div>

              <div className="h-64">
                <div className="h-full flex items-end justify-between gap-2">
                  {financialData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="flex items-end gap-1 w-full justify-center h-48">
                        <div 
                          className="w-2/5 bg-gradient-to-t from-green-500 to-green-400 rounded-t transition-all hover:opacity-80"
                          style={{ height: `${(data.revenue / 60000) * 100}%` }}
                          title={`Revenue: $${data.revenue.toLocaleString()}`}
                        ></div>
                        <div 
                          className="w-2/5 bg-gradient-to-t from-red-500 to-red-400 rounded-t transition-all hover:opacity-80"
                          style={{ height: `${(data.expenses / 60000) * 100}%` }}
                          title={`Expenses: $${data.expenses.toLocaleString()}`}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-2 font-medium">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">$270,820</div>
                  <div className="text-xs text-gray-500">Total Revenue (6mo)</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-600">$187,800</div>
                  <div className="text-xs text-gray-500">Total Expenses (6mo)</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">$83,020</div>
                  <div className="text-xs text-gray-500">Net Profit (6mo)</div>
                </div>
              </div>
            </div>

            {/* Expense Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Expense Breakdown</h2>
              
              {/* Simple pie representation */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-8 border-orange-500"></div>
                  <div className="absolute inset-2 rounded-full border-8 border-blue-500"></div>
                  <div className="absolute inset-4 rounded-full border-8 border-green-500"></div>
                  <div className="absolute inset-6 rounded-full border-8 border-purple-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">$10.9K</div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {expenseBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm text-gray-700">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">${item.amount.toLocaleString()}</span>
                      <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Metrics</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">{metric.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      metric.status === 'excellent' ? 'bg-green-100 text-green-700' :
                      metric.status === 'good' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {metric.status}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-xs text-gray-500">Target: {metric.target}</div>
                  
                  {/* Progress bar */}
                  <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        metric.status === 'excellent' ? 'bg-green-500' :
                        metric.status === 'good' ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${parseInt(metric.value)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Analysis Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Fuel Costs */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-orange-100">
                  <Fuel className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Fuel Costs</h3>
                  <p className="text-sm text-gray-600">Monthly analysis</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">$3,850</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-red-600 flex items-center"><ArrowUpRight className="w-4 h-4" /> +5.2%</span>
                <span className="text-gray-500">vs last month</span>
              </div>
              <div className="mt-4 pt-4 border-t border-orange-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg per bus</span>
                  <span className="font-semibold">$160.42</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">Total liters</span>
                  <span className="font-semibold">2,850 L</span>
                </div>
              </div>
            </div>

            {/* Maintenance Costs */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-100">
                  <Wrench className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Maintenance Costs</h3>
                  <p className="text-sm text-gray-600">Monthly analysis</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">$2,150</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600 flex items-center"><ArrowDownRight className="w-4 h-4" /> -3.8%</span>
                <span className="text-gray-500">vs last month</span>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Scheduled services</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">Repairs</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <OwnerFooter />
    </div>
  );
}

export default Analytics;