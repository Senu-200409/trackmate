import React from 'react';
import { FileText } from 'lucide-react';

function Reports() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reports</h2>
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Daily reports and analytics</p>
      </div>
    </div>
  );
}

export default Reports;