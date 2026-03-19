import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import DriverHeader from '../../components/Driver/DriverHeader';
import DriverFooter from '../../components/Driver/DriverFooter';

function Support({ onMenuClick, setActiveTab, onLogout }) {

  const faqs = [
    {
      id: 1,
      question: 'How do I report a mechanical issue with the bus?',
      answer: 'You can report mechanical issues by clicking on the "Report Issue" button in the Navigation page or contacting the support team directly. Make sure to provide detailed information about the issue and your current location.'
    },
    {
      id: 2,
      question: 'What should I do if a student is missing?',
      answer: 'If you notice a student is missing from the bus: 1) Check your roster carefully 2) Call the parent/guardian immediately 3) Contact the school and support team 4) Do not proceed with your route until the issue is resolved.'
    },
    {
      id: 3,
      question: 'How can I optimize my fuel efficiency?',
      answer: 'Tips for better fuel efficiency: Maintain steady speed (avoid rapid acceleration), check your Reports page for efficiency metrics, avoid excessive idling, ensure tire pressure is correct, and follow the optimal route provided in the Navigation page.'
    },
    {
      id: 4,
      question: 'How do I report safety incidents?',
      answer: 'You can report safety incidents through the Reports page under "Incidents & Alerts". Provide details about what happened, the location, and the severity. Critical incidents should also be reported by calling the emergency number immediately.'
    },
    {
      id: 5,
      question: 'What does my Safety Score represent?',
      answer: 'Your Safety Score (0-10) is based on your driving behavior including: smooth acceleration/deceleration, adherence to speed limits, defensive driving, and adherence to traffic rules. Aim to maintain a score of 9.0 or above.'
    },
    {
      id: 6,
      question: 'How often should vehicle maintenance be done?',
      answer: 'Regular maintenance should be performed according to the vehicle manufacturer guidelines. Schedule maintenance appointments through the fleet management system and avoid operating a vehicle that needs critical repairs.'
    }
  ];

  const supportChannels = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Support',
      contact: '+1-800-123-4567',
      hours: '24/7 Available',
      color: 'text-green-600'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      contact: 'support@trackmate.com',
      hours: 'Response in 2 hours',
      color: 'text-blue-600'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Live Chat',
      contact: 'Chat Agent Available',
      hours: '9 AM - 6 PM',
      color: 'text-purple-600'
    }
  ];



  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <DriverHeader notifications={[]} driverName="Michael" onMenuClick={onMenuClick} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white rounded-2xl p-6 border-b-4 border-[#F5C518]">
            <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
            <p className="text-[#FFE066]">Get answers to common questions and reach our support team</p>
          </div>

          {/* Support Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {supportChannels.map((channel, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-4 ${channel.color}`}>
                  {channel.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-sm font-semibold text-gray-900 mb-1">{channel.contact}</p>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {channel.hours}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => setActiveTab && setActiveTab('dashboard')}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#3B6FB6] hover:shadow-md transition-all font-semibold text-gray-900"
            >
              <AlertCircle className="w-5 h-5 inline mr-2 text-orange-600" />
              Report an Emergency
            </button>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map(faq => (
                <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden p-4">
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mt-2">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Getting Started Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Quick Tips
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Check your daily alerts before starting your route</li>
              <li>✓ Review the Navigation page for optimal route and upcoming stops</li>
              <li>✓ Monitor your vehicle health metrics and fuel level</li>
              <li>✓ Report any issues immediately through the app</li>
              <li>✓ Keep your safety score above 9.0 for optimal performance</li>
            </ul>
          </div>

        </div>
      </main>

      <DriverFooter />
    </div>
  );
}

export default Support;