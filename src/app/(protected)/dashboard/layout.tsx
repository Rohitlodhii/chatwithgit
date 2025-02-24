"use client"

import React from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import useCurrentRoute from '@/hooks/use-curRoute'
import useProject from '@/hooks/use-projects'
import { Loader } from 'lucide-react'


type Props = {
    children: React.ReactNode ;
}

const DashboardLayout = ({children} : Props) => {

  const {curRoute} = useCurrentRoute();
  const { project } = useProject();


  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header className="flex  shadow-md rounded-lg h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
           { project ? `${project?.name} - ${curRoute}` : <Loader className='animate-spin h-4 w-4' /> }
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
        {children}
      </div>
    </SidebarInset>
  </SidebarProvider>
  )
}

export default DashboardLayout