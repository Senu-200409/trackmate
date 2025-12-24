import React from 'react';
import { Calendar } from 'lucide-react';

function History() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Journey History</h2>
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">History timeline and records</p>
      </div>
    </div>
  );
}

export default History;