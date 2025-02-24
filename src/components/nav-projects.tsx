"use client"

import {
  Book,
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import useProject from "@/hooks/use-projects";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import { api } from "@/trpc/react";
import { useToast } from "@/hooks/use-toast";
import UseRefetch from "@/hooks/use-refetch";
import { useDeleteHook } from "@/hooks/modal/confirmDelete";

export function NavProjects() {
  const { isMobile } = useSidebar();

  const {toast} = useToast();

  const { projects , projectId , setProjectId } = useProject();

  const useDelete = useDeleteHook();



  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Your Projects</SidebarGroupLabel>

      { projects == undefined ? 

          <SidebarMenu>
            <SidebarMenuItem> 
                <Skeleton className="w-full h-7 rounded-lg" />
            </SidebarMenuItem>
            <SidebarMenuItem> 
                <Skeleton className="w-full h-7 rounded-lg" />
            </SidebarMenuItem>
            <SidebarMenuItem> 
                <Skeleton className="w-full h-7 rounded-lg" />
            </SidebarMenuItem>
          </SidebarMenu>


          : 


      <SidebarMenu>
        {projects?.map((item) => (
          <SidebarMenuItem className={` overflow-hidden rounded-lg  ${item.id == projectId ? "bg-zinc-100" : "bg-transparent"}  `} key={item.name}>
            <SidebarMenuButton onClick={()=>{
              setProjectId(item.id)
            }}  asChild>
              
              <span>
                <Book className={`   ${item.id == projectId ? "text-blue-700" : "text-black"} `} />
                <span>{item.name}</span>
                </span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=> useDelete.onOpen(item.name , item.id)}>
                  <Trash2 className="text-red-400" />
                  <span className="text-red-400">Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        
      </SidebarMenu>
        
      }

    </SidebarGroup>
  )
}
