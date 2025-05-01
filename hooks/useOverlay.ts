import { useContext } from "react";
import { OverlayContext } from "@/context/overlayContext";

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
};
