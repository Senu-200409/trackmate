import React from 'react';
import { HelpCircle } from 'lucide-react';

function Support() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Support</h2>
      <div className="text-center py-12">
        <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Help and support resources</p>
      </div>
    </div>
  );
}

export default Support;

//good suport