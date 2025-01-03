'use client';
import { Spinner } from '@/components/spinner';
import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';
import React from 'react';
import Navigation from './_components/Navigation';
import { SearchCommand } from "@/components/searchCommand";

export default function layout({children}:{
    children: React.ReactNode
}) {
    const { isAuthenticated,isLoading }=useConvexAuth();
    if(isLoading){
        return(<div className='h-full flex items-center justify-center'>
            <Spinner size={"icon"} />
        </div>) ;
    }
    if(!isAuthenticated){
        return redirect("/");
    }
  return (
    <div className='flex h-screen'>
        <Navigation />
        <main className="flex-1 h-full overflow-y-auto">
            <SearchCommand />
            {children}
        </main>
    </div>
  )
}
