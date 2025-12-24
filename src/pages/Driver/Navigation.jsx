import React from 'react';
import { Navigation } from 'lucide-react';

function NavigationPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Navigation</h2>
      <div className="text-center py-12">
        <Navigation className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Route navigation and guidance</p>
      </div>
    </div>
  );
}

export default NavigationPage;