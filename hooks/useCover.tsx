import { create } from "zustand";

type CoverImageStore={
    url?:string;
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
    onReplace:(url:string)=>void;
};

export const useCoverImage=create<CoverImageStore>((set)=>({
    url:undefined,
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
    onReplace:()=>set({isOpen:true,url:undefined})

}));