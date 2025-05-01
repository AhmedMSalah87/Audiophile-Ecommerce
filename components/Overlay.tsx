"use client"; // must for overlay component as context hook works only in client component
import { useOverlay } from "@/hooks/useOverlay";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const Overlay = () => {
  const { isOverlayVisible, setIsOverlayVisible } = useOverlay();
  const pathname = usePathname();
  const overlay: React.CSSProperties = {
    position: "absolute",
    top: "96px" /* Offset for header height*/,
    left: "0",
    width: "100%",
    height: "calc(100vh - 96px)" /* Subtract header height */,
    background: "rgba(0, 0, 0, 0.5)" /* Semi-transparent */,
    zIndex: "99",
  };
  // to ensure overlay is closed when page refreshed or navigation changed
  useEffect(() => setIsOverlayVisible(false), [pathname]);

  return isOverlayVisible && <div style={overlay}></div>;
};

export default Overlay;
