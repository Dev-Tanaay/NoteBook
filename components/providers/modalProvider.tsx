"use client";

import { useEffect, useState } from "react";
import { SettingsModel } from "@/components/modals/settingModal";
export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModel />
    </>
  );
};