// "use client";
// import { api } from "@/convex/_generated/api";
// import { useSearch } from "@/hooks/useSearch";
// import { useUser } from "@clerk/clerk-react";
// import { useQuery } from "convex/react";
// import { File } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//     CommandDialog,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList
// } from "./ui/command";

// export const SearchCommand = () => {
//     const { user } = useUser();
//     const router = useRouter();
//     const documents = useQuery(api.documents.getSearch);
//     const [isMounted, setIsMounted] = useState(false);
//     const toggle = useSearch((store) => store.toggle);
//     const isOpen = useSearch((store) => store.toggle);
//     const onClose = useSearch((store) => store.toggle);
//     useEffect(() => {
//         setIsMounted(true);
//     }, [])
//     useEffect(() => {
//       const down=(e:KeyboardEvent)=>{
//         if(e.key==='k'&&(e.metaKey||e.ctrlKey)){
//             e.preventDefault();
//             toggle();
//         }
//       }
//       document.addEventListener("keydown",down)
//       return () => document.removeEventListener("keydown",down);
//     }, [toggle]);
    
//     const handleSelect=(id:string)=>{
//         router.push(`/documents/${id}`);
//         onClose();
//     };

//     if (!isMounted) {
//         return null;
//     }

//     return (
//         <CommandDialog open={isOpen} onOpenChange={toggle}>
//             <CommandInput
//                 placeholder={`Search ${user?.fullName}'s NoteBook...`}
//             ></CommandInput>

//             <CommandList>
//                 <CommandEmpty>
//                     <p>No results found.</p>
//                 </CommandEmpty>
//                 <CommandGroup heading="Documents">
//                     {documents?.map((doc) => (
//                         <CommandItem
//                             key={doc._id}
//                             value={`${doc._id}-${doc.title}`}
//                             title={doc.title}
//                             onSelect={handleSelect}
//                         >
//                             {doc.icon ? (
//                                 <p className="mr-2 text-[18px]">{doc.icon}</p>
//                             ) : (
//                                 <File className="h-4 w-4 mr-2" />
//                             )}
//                             <span> {doc.title}</span>
//                         </CommandItem>
//                     ))}
//                 </CommandGroup>
//             </CommandList>
//         </CommandDialog>
//     )
// } 

"use client";
import { api } from "@/convex/_generated/api";
import UseSearch from "@/hooks/useSearch";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { File } from "lucide-react";

export const SearchCommand=()=>{
  const { user } = useUser();
  const router = useRouter();
  const searchDocuments = useQuery(api.documents.getSearch);
  const [ismounted, setismounted] = useState(false);

  const toggle = UseSearch((store) => store.onToggle);
  const isOpen = UseSearch((store) => store.isOpen);
  const onClose = UseSearch((store) => store.onClose);

  useEffect(() => {
    setismounted(true);
  }, []);

  const down = (e: KeyboardEvent) => {
    if (e.key === "q" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      toggle();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const handleSelect = (id: string) => {
    router.push(`/document/${id}`);
    onClose();
  };

  if (!ismounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={toggle}>
      <CommandInput
        placeholder={`Search ${user?.username||user?.fullName}'s NoteBook...`}
      ></CommandInput>

      <CommandList>
        <CommandEmpty>
          <p>No results found.</p>
        </CommandEmpty>
        <CommandGroup heading="Documents">
          {searchDocuments?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              title={doc.title}
              onSelect={handleSelect}
            >
              {doc.icon ? (
                <p className="mr-2 text-[18px]">{doc.icon}</p>
              ) : (
                <File className="h-4 w-4 mr-2" />
              )}
              <span> {doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
