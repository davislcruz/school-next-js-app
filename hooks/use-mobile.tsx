import { useState, useEffect } from "react";

export function useMobile(mobileBreakpoint = 768, desktopBreakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < mobileBreakpoint);
      setIsTablet(width >= mobileBreakpoint && width < desktopBreakpoint);
      setIsDesktop(width >= desktopBreakpoint);
    };

    // Set initial values
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileBreakpoint, desktopBreakpoint]);

  // Return desktop defaults until mounted
  if (!mounted) {
    return { isMobile: false, isTablet: false, isDesktop: true };
  }

  return { isMobile, isTablet, isDesktop };
}
