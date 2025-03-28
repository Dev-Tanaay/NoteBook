"use client";

import { useSetting } from "@/hooks/useSetting";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { ModeToggle } from "../ModeToggle";

export const SettingsModel = () => {
  const setting = useSetting();
  return (
    <Dialog open={setting.isOpen} onOpenChange={setting.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My Setting</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[.8rem] text-muted-foreground">
              Customize Your NoteBook Appearance
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};