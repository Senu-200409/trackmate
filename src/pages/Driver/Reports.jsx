import React from 'react';
import { FileText } from 'lucide-react';
import DriverHeader from '../../components/Driver/DriverHeader';
import DriverFooter from '../../components/Driver/DriverFooter';

function Reports({ onMenuClick }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <DriverHeader notifications={[]} driverName="Michael" onMenuClick={onMenuClick} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reports</h2>
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Daily reports and analytics</p>
            </div>
          </div>
        </div>
      </main>

      <DriverFooter />
    </div>
  );
}

export default Reports;