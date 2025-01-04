"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useUser } from "@clerk/clerk-react"
import { useMutation } from "convex/react"
import { MoreHorizontal, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface MenuProps {
    documentId: Id<"documents">
}
export const Menu = ({ documentId }: MenuProps) => {
    const router = useRouter();
    const { user } = useUser();
    const archieve = useMutation(api.documents.archieve);

    const onArchieve = () => {
        const promise = archieve({ id: documentId })
        toast.promise(promise, {
            loading: "Moving Notes to trash...",
            success: "Notes moved to Trash successfully",
            error: "Failed to move Note to the trash"
        })
        router.push("/documents");
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"sm"} variant={"ghost"}>
                    <MoreHorizontal className="w-60" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
                <DropdownMenuItem onClick={onArchieve}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs text-muted-foreground">
                    Last edited by: {user?.username||user?.fullName}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

Menu.Skeleton=function MenuSkeleton(){
    return(
        <Skeleton className="h-10 w-10" />
    );
}


