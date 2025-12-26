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

function Support({ onMenuClick, setActiveTab }) {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'general',
    subject: '',
    message: '',
    priority: 'normal'
  });

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

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Support request submitted:', contactForm);
    setContactForm({
      name: '',
      email: '',
      phone: '',
      category: 'general',
      subject: '',
      message: '',
      priority: 'normal'
    });
    setShowContactForm(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <DriverHeader notifications={[]} driverName="Michael" onMenuClick={onMenuClick} />
      
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
              onClick={() => setShowContactForm(!showContactForm)}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#3B6FB6] hover:shadow-md transition-all font-semibold text-gray-900"
            >
              <MessageSquare className="w-5 h-5 inline mr-2 text-blue-600" />
              Send Support Request
            </button>
            <button 
              onClick={() => setActiveTab && setActiveTab('dashboard')}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#3B6FB6] hover:shadow-md transition-all font-semibold text-gray-900"
            >
              <AlertCircle className="w-5 h-5 inline mr-2 text-orange-600" />
              Report an Emergency
            </button>
          </div>

          {/* Contact Form */}
          {showContactForm && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Support Request Form</h2>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleContactInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={contactForm.category}
                      onChange={handleContactInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                    >
                      <option value="general">General Support</option>
                      <option value="mechanical">Mechanical Issue</option>
                      <option value="student">Student Related</option>
                      <option value="accident">Accident Report</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                    placeholder="Subject of your request"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                    <select
                      name="priority"
                      value={contactForm.priority}
                      onChange={handleContactInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactInputChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                    placeholder="Describe your issue or request..."
                    required
                  ></textarea>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6] text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* FAQs */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map(faq => (
                <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 text-left">{faq.question}</h3>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4 pt-0 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
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