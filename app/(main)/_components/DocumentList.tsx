"use client";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import Item from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
    parentDocumentId?: Id<"documents">
    level?: number;
    data?: Doc<"documents">[];
}

function DocumentList({
    parentDocumentId,
    level = 0,
}: DocumentListProps) {
    const params = useParams();
    const router = useRouter();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }))
    };

    const documents = useQuery(api.documents.getSideBar, {
        parentDocument: parentDocumentId,
    });
    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }

    if (documents === undefined) {
        return <>
            <Item.Skeleton level={level} />
            {
                level === 0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />

                    </>
                )
            }
        </>
    }
    return (
        <>
            <p style={{
                paddingLeft:level ?`${(level * 12) + 25}px` : undefined
            }}
            className={cn(
                "hidden text-sm font-medium text-muted-foreground/80 ml-2",
                expanded && "last:block",
                level ===0 && "hidden"
            )}
            >
                Pages yet ain't created
            </p>
            {
                documents.map((document) => (
                    <div key={document._id} className="flex flex-col">
                        <Item 
                            id={document._id}
                            onClick={()=>onRedirect(document._id)}
                            label={document.title}
                            icon={FileIcon}
                            documentIcon={document.icon}
                            active={params.documentId===document._id}
                            level={level}
                            onExpand={()=>onExpand(document._id)}
                            expanded={expanded[document._id]}
                            />
                            {
                                expanded[document._id]&&(
                                    <DocumentList 
                                        parentDocumentId={document._id}
                                        level={level+1}
                                    />
                                )
                            }
                    </div>
                ))
            }
        </>
    )
}

export default DocumentList
