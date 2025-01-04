"use client";

import ToolBar from "@/components/ToolBar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface DocumentIdPageProps {
  params: {
    id: Id<"documents">
  };
}

export default function DocumentIdPage({ params }: DocumentIdPageProps) {
  const document = useQuery(api.documents.getById, {
    documentId: params.id
  });
  if (document === undefined) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  if(document===null){
    return(<div>Not found</div>)
  }

  return (
    <div className="pb-40">
      <div className="h-[35vh]" />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <ToolBar initialData={document}/>
      </div>
    </div>
  )
}
