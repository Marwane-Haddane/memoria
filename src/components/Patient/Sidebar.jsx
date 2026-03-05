import React from 'react'
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import AppSidebar  from './Appsidebar'
function Sidebar() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger></SidebarTrigger>
    </SidebarProvider>
  )
}

export default Sidebar

