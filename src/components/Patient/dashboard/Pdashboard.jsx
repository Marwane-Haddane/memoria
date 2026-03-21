import React from 'react'
import AddPatient from './AddSick'
import PatientInfo from './info'
import PatientConversations from './PatientConv'
import { usePatient } from './PatientContext'
import { Users } from 'lucide-react'

function PatientSelector() {
  const { patients, selectedPatientId, setSelectedPatientId, loading } = usePatient();

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Users className="w-4 h-4 animate-pulse" /> Loading patients...
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Users className="w-4 h-4" /> No patients yet. Add one to get started.
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Users className="w-5 h-5 text-teal-600" />
      <label htmlFor="patient-select" className="text-sm font-medium text-gray-600">
        Monitoring:
      </label>
      <select
        id="patient-select"
        value={selectedPatientId || ""}
        onChange={(e) => setSelectedPatientId(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 bg-white shadow-sm hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all cursor-pointer min-w-[200px]"
      >
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nom} — Age {p.Age}
          </option>
        ))}
      </select>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header with patient selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <PatientSelector />
      </div>

      {/* The 3-Column Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">

        {/* Left Column */}
        <div className="xl:col-span-1">
          <AddPatient />
        </div>

        {/* Middle Column */}
        <div className="xl:col-span-1">
          <PatientInfo />
        </div>

        {/* Right Column */}
        <div className="xl:col-span-1">
          <PatientConversations />
        </div>

      </div>
    </div>
  )
}

export default Dashboard