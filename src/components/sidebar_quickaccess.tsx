"use client"

import React from 'react'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from './ui/sidebar'
import { Button } from './ui/button'
import { LucideIcon, Plus } from 'lucide-react'
import { redirect } from 'next/navigation'


const QuickAccess = ({
    items
} : {
    items: {
      name: string
      action: string
      icon: LucideIcon
    }[]
  }) => {


    // const { setCurRoute} = useCurrentRoute();

    // const newProject = ( { name , action} : { name : string ,action :string}) => {
    //   setCurRoute(name);
    //   redirect(action);
    // }

  return (


    <SidebarGroup>

        { items.map((item ,index)=>(

        <SidebarMenu key={index} className='w-full'>
            <SidebarMenuItem>
                <Button onClick={()=> redirect(item.action)} variant={"outline"} size="sm" className='w-full'> <item.icon /> {item.name} </Button>
            </SidebarMenuItem>
        </SidebarMenu>

        ))}
        
    </SidebarGroup>
  )
}

export default QuickAccess