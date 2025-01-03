"use client";
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/useSearch";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { File } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CommandDialog, CommandInput } from "./ui/command";

export const SearchCommand=()=>{
    const { user }=useUser();
    const router = useRouter();
    const documents = useQuery(api.documents.getSearch);
    const [isMounted,setIsMounted]=useState(false);
    const toggle=useSearch((store)=>store.toggle);
    const isOpen=useSearch((store)=>store.toggle);
    const onClose=useSearch((store)=>store.toggle);
    useEffect(()=>{
        setIsMounted(true);
    },[])
    if(!isMounted){
        return null;
    }

    return(
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder="hello">
                
            </CommandInput>
        </CommandDialog>
    )
} 