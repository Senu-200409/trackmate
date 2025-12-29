import React, { useMemo, useState } from 'react';
import { Users, UserCircle, School, User, MapPin, Phone, Search, BadgeCheck } from 'lucide-react';
import DriverHeader from '../../components/Driver/DriverHeader';
import DriverFooter from '../../components/Driver/DriverFooter';

function Students({ onMenuClick, setActiveTab, driverBusId = 'BUS-101' }) {
  // Sample assigned students data. Each student includes the bus they are assigned to.
  const allStudents = [
    { id: 'STU-001', name: 'Emma Wilson', grade: '5', rollNumber: 'R-105', stop: 'Maple St', school: 'Central School', parentPhone: '+1 (555) 010-1111', status: 'boarded', busId: 'BUS-101' },
    { id: 'STU-002', name: 'Noah Johnson', grade: '6', rollNumber: 'R-106', stop: 'Pine Ave', school: 'Central School', parentPhone: '+1 (555) 010-2222', status: 'pending', busId: 'BUS-101' },
    { id: 'STU-003', name: 'Liam Brown', grade: '7', rollNumber: 'R-107', stop: 'Elm St', school: 'Eastwood High', parentPhone: '+1 (555) 010-3333', status: 'boarded', busId: 'BUS-101' },
    { id: 'STU-004', name: 'Sophia Martinez', grade: '4', rollNumber: 'R-104', stop: 'Oak Ave', school: 'Central School', parentPhone: '+1 (555) 010-4444', status: 'pending', busId: 'BUS-101' },
    { id: 'STU-005', name: 'Ava Davis', grade: '5', rollNumber: 'R-108', stop: 'Cedar Rd', school: 'Westview School', parentPhone: '+1 (555) 010-5555', status: 'boarded', busId: 'BUS-203' },
    { id: 'STU-006', name: 'James Wilson', grade: '6', rollNumber: 'R-109', stop: 'Maple St', school: 'Central School', parentPhone: '+1 (555) 010-6666', status: 'pending', busId: 'BUS-101' },
    { id: 'STU-007', name: 'Isabella Brown', grade: '5', rollNumber: 'R-110', stop: 'Oak Ave', school: 'Central School', parentPhone: '+1 (555) 010-7777', status: 'boarded', busId: 'BUS-101' },
    { id: 'STU-008', name: 'Lucas Anderson', grade: '7', rollNumber: 'R-111', stop: 'Pine Ave', school: 'Eastwood High', parentPhone: '+1 (555) 010-8888', status: 'pending', busId: 'BUS-203' },
  ];

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | boarded | pending

  // Filter students by driverBusId, search query, and status
  const students = useMemo(() => {
    return allStudents
      .filter(s => s.busId === driverBusId)
      .filter(s =>
        query.trim() === ''
          ? true
          : (
              s.name.toLowerCase().includes(query.toLowerCase()) ||
              s.rollNumber.toLowerCase().includes(query.toLowerCase()) ||
              s.stop.toLowerCase().includes(query.toLowerCase())
            )
      )
      .filter(s => (statusFilter === 'all' ? true : s.status === statusFilter));
  }, [allStudents, driverBusId, query, statusFilter]);

  const boardedCount = students.filter(s => s.status === 'boarded').length;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <DriverHeader notifications={[]} driverName="Michael" onMenuClick={onMenuClick} setActiveTab={setActiveTab} />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white rounded-2xl p-6 border-b-4 border-[#F5C518]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#FFE066]" />
                  Assigned Students
                </h1>
                <p className="text-[#FFE066]">Bus: {driverBusId} • {boardedCount}/{students.length} boarded</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-[#F5C518] text-[#1E3A5F] font-semibold text-sm">Driver View</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, roll, or stop"
                className="w-full outline-none text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold border ${statusFilter === 'all' ? 'bg-[#3B6FB6] text-white border-[#3B6FB6]' : 'bg-white text-gray-900 border-gray-200'}`}
              >All</button>
              <button
                onClick={() => setStatusFilter('boarded')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold border ${statusFilter === 'boarded' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-900 border-gray-200'}`}
              >Boarded</button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold border ${statusFilter === 'pending' ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-gray-900 border-gray-200'}`}
              >Pending</button>
            </div>
          </div>

          {/* Students List */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Students ({students.length})</h2>
              <span className="text-sm text-gray-600">Showing assignments for {driverBusId}</span>
            </div>
            <div className="divide-y divide-gray-100">
              {students.map((s) => (
                <div key={s.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center">
                        <UserCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{s.name}</div>
                        <div className="text-xs text-gray-600 flex items-center gap-2">
                          <School className="w-3 h-3" />
                          <span>{s.school}</span>
                          <span className="mx-2">•</span>
                          <User className="w-3 h-3" />
                          <span>Roll: {s.rollNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {s.status === 'boarded' ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 font-semibold flex items-center gap-1">
                          <BadgeCheck className="w-3 h-3" /> Boarded
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700 font-semibold">Pending</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>Stop: {s.stop}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{s.parentPhone}</span>
                    </div>
                    <div className="text-gray-500">Student ID: {s.id}</div>
                  </div>
                </div>
              ))}

              {students.length === 0 && (
                <div className="p-8 text-center text-gray-600">
                  No students assigned to this bus.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <DriverFooter />
    </div>
  );
}

export default Students;
