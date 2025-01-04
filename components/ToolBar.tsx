"use client";
import { Doc } from '@/convex/_generated/dataModel';
import React from 'react'

interface ToolBarProps{
    initialData:Doc<"documents">
    preview?:boolean
} 
function ToolBar({
    initialData,
    preview
}:ToolBarProps) {
  return (
    <div>
      Toolbar
    </div>
  )
}

export default ToolBar
