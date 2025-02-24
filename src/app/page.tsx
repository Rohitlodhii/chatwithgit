"use client"

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";


export default function Home() {
 

  return (
   
      <div className="h-screen w-full flex items-center justify-center ">
        <Button onClick={()=>redirect('/dashboard')}>DashBoard</Button>
      </div>
  
  );
}
