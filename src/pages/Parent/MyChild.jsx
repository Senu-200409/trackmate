import React from 'react';
import { User } from 'lucide-react';
import ParentHeader from '../../components/Parent/ParentHeader';
import ParentFooter from '../../components/Parent/ParentFooter';

function MyChild() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ParentHeader notifications={[]} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Child Information</h2>
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Child information section</p>
            </div>
          </div>
        </div>
      </main>

      <ParentFooter />
    </div>
  );
}

export default MyChild;