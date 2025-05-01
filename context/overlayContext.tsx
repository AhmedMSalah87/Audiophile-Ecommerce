"use client";
import React, { createContext, useState } from "react";

interface overlayContextType {
  isOverlayVisible: boolean;
  toggleOverlay: () => void;
  setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OverlayContext = createContext<overlayContextType | null>(null);

const OverlayProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayVisible((prevState) => !prevState);
  };

  return (
    <OverlayContext.Provider
      value={{ isOverlayVisible, toggleOverlay, setIsOverlayVisible }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;
