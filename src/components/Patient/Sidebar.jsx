import React from 'react'
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import AppSidebar  from './Appsidebar'
import { Outlet } from 'react-router-dom'
import { PatientProvider } from './dashboard/PatientContext'

function Sidebar() {
  return (
    <PatientProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 w-full bg-slate-50 min-h-screen">
          <div className="flex items-center p-2 border-b bg-white">
            <SidebarTrigger />
          </div>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </PatientProvider>
  )
}

export default Sidebar


