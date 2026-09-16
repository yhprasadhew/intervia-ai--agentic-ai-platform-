import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-bold text-indigo-400">Dashboard</h1>
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition duration-200"
          >
            ← Back to Home
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-slate-200 mb-2">Upcoming Interviews</h2>
            <p className="text-3xl font-bold text-indigo-400">0</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-slate-200 mb-2">Interview Coins</h2>
            <p className="text-3xl font-bold text-indigo-400">50</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-slate-200 mb-2">Completed Sessions</h2>
            <p className="text-3xl font-bold text-indigo-400">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard