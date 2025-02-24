"use client"

import useProject from '@/hooks/use-projects'
import React, { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Github, Link } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const page = () => {

  const { project } = useProject();



  return (
    <div className='flex flex-col gap-4'>
      <div className='grid lg:grid-cols-4 grid-cols-1 gap-4 '>

            { project ? 
             <div className='bg-slate-100 flex gap-2 items-center col-span-2 h-12 rounded-lg overflow-hidden px-6'>
             <Github className='h-5 w-5 text-muted-foreground'/><span className='text-muted-foreground'> Current Repository</span><span className='underline hidden lg:block'>{project?.githubUrl} </span> <span className='lg:hidden underline '>Click Here</span>
      </div> : 
            <Skeleton className='col-span-2 h-12' />

          }

          
      </div>
      <div>
        <h1 className='text-lg'>Commit Logs : Summary</h1>
      </div>
    </div>
  )
}

export default page