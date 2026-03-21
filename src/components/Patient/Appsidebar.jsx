

import React from "react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarMenuItem, SidebarMenuButton, SidebarMenu,
} from "../ui/sidebar"
import { Button } from "../ui/button"
import { LayoutDashboard, List, Plus, MessageSquare, ChevronDown } from "lucide-react"

import logo from "../../assets/logo.png"
import { Link, useLocation } from "react-router-dom"
import { usePatient } from "./dashboard/PatientContext"

export default function AppSidebar() {
  const SidebarOptions = [
    {
      Name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      Name: 'My Patient Info',
      icon: List,
      path: '/info'
    },
    {
      Name: 'Patient Conversation',
      icon: MessageSquare,
      path: '/patient-conv'
    },
  ]
  const { pathname } = useLocation();
  const { patients, selectedPatientId, setSelectedPatientId, loading } = usePatient();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center">
        <Link to="/#home" className="w-full flex justify-center mb-2">
          <img src={logo} alt="logo" className="h-14 w-auto object-contain transition-all" />
        </Link>

        <SidebarMenu className="w-full">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="bg-teal-500 hover:bg-sky-500 text-white w-full flex justify-center h-10 transition-all cursor-pointer">
              <Link to="/add-patient">
                <Plus className="min-w-5 min-h-5" />
                <span className="font-medium group-data-[collapsible=icon]:hidden">Add Patient</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Patient Selector */}
        <SidebarGroup>
          <div className="px-1 group-data-[collapsible=icon]:hidden">
            <label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 block">
              Patient
            </label>
            {loading ? (
              <div className="text-xs text-gray-400 p-2">Loading...</div>
            ) : patients.length === 0 ? (
              <div className="text-xs text-gray-400 p-2">No patients</div>
            ) : (
              <div className="relative">
                <select
                  value={selectedPatientId || ""}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md px-2 py-2 pr-6 appearance-none cursor-pointer hover:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nom}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            )}
          </div>
        </SidebarGroup>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarMenu>
            {
              SidebarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className="p-1">
                  <SidebarMenuButton asChild className={`p-3 ${pathname === option.path ? 'bg-blue-50 ' : ""}`}>
                    <Link to={option.path}>
                      <option.icon className={`text-[16px] ${pathname === option.path ? 'text-blue-500' : ""}`} />
                      <span className={`text-[16px] ${pathname === option.path ? 'text-blue-500' : ""}`}>{option.Name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            }
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>memoria team</SidebarFooter>
    </Sidebar>
  )
}