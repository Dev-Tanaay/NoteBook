"use client";
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

import React from 'react'

function DocumentPage() {
    const { user } = useUser();
    const create=useMutation(api.documents.create);
    const onCreate=()=>{
        const promise=create({ title:"UnTitled" });
        toast.promise(promise,{
            loading:"Creating a new note ...",
            success:"New Note created:)",
            error:"Error creating note:("
        })
    }
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <h1 className="text-lg font-medium">
                Welcome {user?.username||user?.firstName} to <span className='text-green-400 font-semibold text-2xl'>NoteBook</span>
            </h1>
            <Button onClick={onCreate} className='animate-pulse shadow-green-400 shadow-lg'>
                Create your<span className='text-green-400'>Note's</span>
                <PlusCircle className="h-4 w-4 mr-2" />
            </Button>
        </div>
    );
}

export default DocumentPage
