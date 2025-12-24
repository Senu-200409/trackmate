import React from 'react';
import { BarChart3 } from 'lucide-react';

function Analytics() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Analytics</h2>
      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Business analytics and insights</p>
      </div>
    </div>
  );
}

export default Analytics;