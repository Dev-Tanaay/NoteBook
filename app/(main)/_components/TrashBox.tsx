"use client";

import { ConfirmModal } from "@/components/modals/confirmModal";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function TrashBox() {
    const router=useRouter();
    const params=useParams();
    const documents=useQuery(api.documents.getTrash);
    const restore=useMutation(api.documents.restore);
    const remove=useMutation(api.documents.remove);
    const [search,setSearch]=useState("");
    const filteredDocument=documents?.filter((doc)=>{
        return doc.title.toLowerCase().includes(search.toLowerCase())
    });
    const onClick=(docId:string)=>{
        router.push(`/documents/${docId}`)
    };
    const onRestore=(
        event:React.MouseEvent<HTMLDivElement,MouseEvent>,
        docId:Id<"documents">
    )=>{
        event.stopPropagation();
        const promise=restore({ id:docId });
        toast.promise(promise,{
            loading:"Restoring document",
            success:"Document restored",
            error:"Failed to restore document"
        });
    }
    const onRemove=(
        docId:Id<"documents">
    )=>{
        const promise=remove({ id:docId });
        toast.promise(promise,{
            loading:"Deleting document",
            success:"Document deleted:)",
            error:"Failed to delete document:("
        });
        if(params.docId===docId){
            router.push("/documents")
        }
    }

    if(documents===undefined){
        return(
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size={"lg"}/>
            </div>
        )
    }


  return (
    <div className="text-sm p-2">
        <div className="flex items-center gap-x-2">
            <Search className="h-4 w-4" />
            <Input 
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                placeholder="Filter by page title..."
            />
        </div>
        <div className="mt-2 px-1 pb-1">
            <p className="hidden last:block text-xs text-center text-muted-foreground">
                No Documents
            </p>
            {
                filteredDocument?.map((doc)=>(
                    <div 
                        key={doc._id}
                        role="button"
                        onClick={()=>onClick(doc._id)}
                        className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
                    >
                        <span className="truncate pl-2">
                            {doc.title}
                        </span>
                        <div className="flex items-center">
                            <div onClick={(e)=>onRestore(e,doc._id)}
                                 role="button"
                                 className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"   
                            >
                                <Undo className="h-4 w-4 text-muted-foreground"/>
                            </div>
                            <ConfirmModal onConfirm={()=>onRemove(doc._id)}>
                            <div role="button"  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600">
                                <Trash className="h-4 w-4 text-muted-foreground"/>
                            </div>
                            </ConfirmModal>

                        </div>
                    </div>
                ))
            }
        </div>
      
    </div>
  )
}

export default TrashBox
