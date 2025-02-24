"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

import Lottie from "lottie-react";
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader, Plus } from 'lucide-react';
import { api } from '@/trpc/react';
import { useToast } from '@/hooks/use-toast';
import UseRefetch from '@/hooks/use-refetch';

const formSchema = z.object({
  projectname : z.string().min(3).max(50),
  gitRepoUrl : z.string().regex(
    /^https:\/\/github\.com\/[\w-]+\/[\w-]+$/,
    "Invalid GitHub repository URL. Example: https://github.com/user/repo"
  ),
  authToken : z.string().optional() 
})

const CreateProject = () => {

  const {toast} = useToast();

  const [isLoading , setIsLoading] = useState(false);

  const createProject = api.project.createProject.useMutation();

  const refetch = UseRefetch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
    defaultValues :{
      projectname : "",
      gitRepoUrl : "",
      authToken : "",

    }
  })

  const onSubmit = ( values : z.infer<typeof formSchema>) =>{
    setIsLoading(true);
    createProject.mutate({
      name : values.projectname ,
      githubUrl : values.gitRepoUrl ,
      githubToken : values.authToken ,
    },{
      onSuccess : ()=>{
        toast({
          title : "Project Created Sucessfully",
          description : "you are being redirected to your project dashboard"
        })
        setIsLoading(false);
        refetch();
        form.reset()
        
      },
      onError : ()=>{
        toast({
          variant : "destructive",
          title : "Failed to create project!"
        })
        setIsLoading(false);
      }
      
    })
 
   
  }


  return (
    <div className='h-full w-full flex items-center justify-center '>
      <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row-reverse gap-6 md:gap-4 w-full  justify-center '>

        <div className='flex flex-col w-full items-center lg:items-start justify-center mt-10  gap-2 lg:w-1/3 '>

           <div className='flex flex-col gap-1 '>
           <h1 className='font-bold text-xl md:text-3xl'>Link Github Repository</h1>
          
           </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>

                  <FormField 
                        control={form.control}
                        name="projectname"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel className='text-zinc-600 text-xs md:text-sm'>Project Name</FormLabel>
                            <FormControl>
                              <Input className='placeholder:text-zinc-400 placeholder:text-xs md:placeholder:text-sm' placeholder='i.e GithubSmasher' {...field}/>
                            </FormControl>
                            <FormMessage className='text-xs md:text-sm' />
                          </FormItem>
                        )}
                  />
                  <FormField 
                        control={form.control}
                        name="gitRepoUrl"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel className='text-zinc-600 text-xs md:text-sm'>Github Repo Link</FormLabel>
                            <FormControl>
                              <Input  className='placeholder:text-blue-400 placeholder:text-xs md:placeholder:text-sm'  placeholder='http://github.com/yourRepo' {...field}/>
                            </FormControl>
                            <FormMessage className='text-xs md:text-sm' />
                          </FormItem>
                        )}
                  />
                  <FormField 
                        control={form.control}
                        name="authToken"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel className='text-zinc-600 text-xs md:text-sm'>AuthToken {`( to access private repository )`} </FormLabel>
                            <FormControl>
                              <Input className='placeholder:text-xs md:placeholder:text-sm' placeholder='(Optional)' {...field}/>
                            </FormControl>
                            
                            <FormMessage className='text-xs md:text-sm' />
                          </FormItem>
                        )}
                  />

                  {isLoading ? 

                    <Button> <Loader className='animate-spin' /> Getting Ready</Button> : 
                    
                  <Button   type='submit'> <Plus /> Create Project </Button>
                }

              </form>
            </Form>


        </div>
       
      </div>
    </div>
  )
}

export default CreateProject