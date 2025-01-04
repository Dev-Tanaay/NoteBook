'use client';
import useIsMobile from '@/hooks/useIsMobile';
import { cn } from '@/lib/utils';
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import UserItem from './UserItem';
import { useMutation } from 'convex/react';
import { api } from "@/convex/_generated/api";
import Item from './Item';
import { toast } from 'sonner';
import DocumentList from './DocumentList';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import TrashBox from './TrashBox';
import UseSearch from '@/hooks/useSearch';
import { useSetting } from '@/hooks/useSetting';
import NavBar from './NavBar';



function Navigation() {
    const settings = useSetting();
    const search = UseSearch();
    const params = useParams();
    const pathname = usePathname();
    const isMobile = useIsMobile();
    const create = useMutation(api.documents.create);
    const isResizing = useRef(false);
    const sideBarRef = useRef<HTMLElement>(null)
    const navBarRef = useRef<HTMLElement>(null)
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapased] = useState(isMobile);

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.preventDefault();
        e.stopPropagation();
        isResizing.current = true
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }
    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing.current) return;
        let newWidth = e.clientX;
        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;
        if (sideBarRef.current && navBarRef.current) {
            sideBarRef.current.style.width = `${newWidth}px`;
            navBarRef.current.style.setProperty("left", `${newWidth}px`);
            navBarRef.current.style.setProperty("width", `calc(100%-${newWidth}px)`)
        }
    }
    const handleMouseUp = () => {
        isResizing.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    const resetWidth = () => {
        if (sideBarRef.current && navBarRef.current) {
            setIsCollapased(false);
            setIsResetting(false);

            sideBarRef.current.style.width = isMobile ? "100%" : "240px";
            navBarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100%-240px)"
            )
            navBarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px");
            setTimeout(() => setIsResetting(false), 300);
        }
    }

    const collapse = () => {
        if (sideBarRef.current && navBarRef.current) {
            setIsCollapased(true);
            setIsResetting(true);

            sideBarRef.current.style.width = "0";
            navBarRef.current.style.setProperty("width", "100%");
            navBarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);
        }
    }

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile])

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);


    const handleCreate = () => {
        const promise = create({ title: "Untitled" });
        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New Note created",
            error: "Failed to create a new note"
        })
    }


    return (
        <>
            <aside ref={sideBarRef} className={cn(
                'group/sidebar bg-secondary h-full overflow-y-auto relative flex w-60 flex-col z-[99999]',
                isResetting && "transition-all ease-in-out duration-300",
                isMobile && "w-0"
            )}>
                <div role='button'
                    onClick={collapse}
                    className={cn(
                        'h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100',
                        isMobile && "opacity-100"

                    )}>
                    <ChevronsLeft className='h-6 w-6 ' />
                </div>
                <div>
                    <UserItem />
                    <Item label='Search' icon={Search} isSearch onClick={search.onOpen} />
                    <Item label='Settings' icon={Settings} onClick={settings.onOpen} />
                    <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
                </div>
                <div className="mt-4">
                    <DocumentList />
                    <Item onClick={handleCreate} icon={Plus} label='Add Page' />
                    <Popover>
                        <PopoverTrigger className='w-full mt-4'>
                            <Item label='Trash' icon={Trash} />
                        </PopoverTrigger>
                        <PopoverContent className='p-0 w-72' side={isMobile ? "bottom" : "right"}>
                            <TrashBox />
                        </PopoverContent>

                    </Popover>
                </div>
                <div onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100
             transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0
        " />
            </aside>
            <div
                ref={navBarRef}
                className={cn(
                    "absolute top-0 z-[999999] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-in-out",
                    isMobile && "left-0 w-full"
                )}
            >
                {!!params.id ? (
                    <NavBar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
                ) : (
                    <nav className="bg-transparent px-3 py-2 w-full">
                        {isCollapsed && (
                            <MenuIcon
                                onClick={resetWidth}
                                role="button"
                                className="w-6 h-6 text-muted-foreground"
                            />
                        )}
                    </nav>
                )}

            </div>
        </>
    )
}

export default Navigation