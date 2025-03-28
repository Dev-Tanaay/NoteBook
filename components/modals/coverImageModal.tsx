"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/useCover";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { SingleImageDropzone } from "../SingleImageDropzone";

export const CoverImageModal = () => {
    const params = useParams();
    const update = useMutation(api.documents.update);
    const coverImage = useCoverImage();
    const [file, setFiles] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { edgestore } = useEdgeStore();

    const onClose = () => {
        setFiles(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    }
    const onChange = async (file?: File) => {
        if (file) {
            setIsSubmitting(true);
            setFiles(file);
            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url
                }
            })
            await update({
                id: params.id as Id<"documents">,
                coverImage: res.url
            });
            onClose();
        }

    }
    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <SingleImageDropzone
                    className="w-full outline-none"
                    disabled={isSubmitting}
                    value={file}
                    onChange={onChange}
                />
            </DialogContent>
        </Dialog>
    );
}