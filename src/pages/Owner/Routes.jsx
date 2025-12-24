import React from 'react';
import { Route } from 'lucide-react';

function Routes() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Routes Management</h2>
      <div className="text-center py-12">
        <Route className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Route planning and optimization</p>
      </div>
    </div>
  );
}

export default Routes;