import React from 'react';
import { Settings } from 'lucide-react';

function SettingsPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
      <div className="text-center py-12">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Account and preference settings</p>
      </div>
    </div>
  );
}

export default SettingsPage;