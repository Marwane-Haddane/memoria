

import React from "react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarMenuItem,SidebarMenuButton,SidebarMenu,
} from "../ui/sidebar"
import { Button } from "../ui/button"
import { LayoutDashboard, List, Plus } from "lucide-react"

import logo from "../../assets/logo.png"
import { Link, useLocation } from "react-router-dom"

export default function AppSidebar() {
    const SidebarOptions=[
        {
            Name : 'Dashboard',
            icon : LayoutDashboard,
            path: '/dashboard'
        },
        {
            Name : 'My Patient Info',
            icon : List,
            path: '/info'
        },
    ]
    const path=useLocation();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader  className="flex items-center">
        <Link to="/#home">
        <img src={logo} alt="logo" className= "hov h-30 w-30 -mb-7 "/>
        </Link>
        <Button className="w-full mt-4 bg-teal-500 hover:bg-sky-500 hovF"><Plus/>Add Patient</Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarMenu>
                {
                    SidebarOptions.map((option , index)=>(
                        <SidebarMenuItem key={index} className="p-1">
                            <SidebarMenuButton asChild className={`p-3 ${path==option.path&&'bg-blue-50'}`}>
                                <Link to={option.path}>
                                    <option.icon className={`text-[16px] ${path==option.path&&'text-primary'}`}/>
                                    <span className={`text-[16px] ${path==option.path&&'text-primary'}`}>{option.Name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))
                }
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>User</SidebarFooter>
    </Sidebar>
  )
}