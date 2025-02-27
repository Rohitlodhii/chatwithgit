"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  Icon,
  LifeBuoy,
  Map,
  PieChart,
  Plus,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import QuickAccess from "./sidebar_quickaccess"
import useProject from "@/hooks/use-projects"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Commit Log",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "QA Git",
      url: "/dashboard/qa",
      icon: SquareTerminal,
      isActive: false,
    }
    
  ],
  
  quickAccess  :[
    {
      name : "Create Project",
      icon : Plus ,
      action : '/dashboard/createproject'
    }

  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

 

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Jeff</span>
                  <span className="truncate text-xs">Github Assistant</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects  />

        <QuickAccess items={data.quickAccess} />

       
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
