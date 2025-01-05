"use client";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import { ImageIcon, X } from 'lucide-react';
import { useCoverImage } from '@/hooks/useCover';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { useEdgeStore } from '@/lib/edgestore';

interface coverImageProps {
    url?: string;
    preview?: boolean
}

function Cover({ url, preview }: coverImageProps) {
    const { edgestore } = useEdgeStore();
    const params = useParams()
    const coverImage = useCoverImage();
    const removeCover = useMutation(api.documents.removeCoverImage);
    const onRemove = async() => {
        if (url) {
            await edgestore.publicFiles.delete({
                url: url
            })
        }
        removeCover({ id: params.id as Id<"documents"> })
    }
    return (
        <div className={cn(
            "relative w-full h-[45vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {
                !!url && (
                    <Image src={url}
                        fill
                        alt="Cover"
                        className="object-cover"
                    />
                )
            }
            {
                url && !preview && (
                    <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
                        <Button
                            onClick={()=>coverImage.onReplace(url)}
                            className='text-muted-foreground text-xs rounded-md'
                            variant="outline"
                            size="sm"
                        >
                            <ImageIcon className='h-4 w-4 mr-2' />
                            Change Cover
                        </Button>
                        <Button
                            onClick={onRemove}
                            className='text-muted-foreground text-xs rounded-md'
                            variant="outline"
                            size="sm"
                        >
                            <X className='h-4 w-4 mr-2' />
                            Remove Cover
                        </Button>
                    </div>
                )
            }

        </div>
    )
}

export default Cover
