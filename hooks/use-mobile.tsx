import { useState, useEffect } from "react";

export function useMobile(mobileBreakpoint = 768, desktopBreakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < mobileBreakpoint : false
  );
  const [isTablet, setIsTablet] = useState(
    typeof window !== "undefined" ? window.innerWidth >= mobileBreakpoint && window.innerWidth < desktopBreakpoint : false
  );
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= desktopBreakpoint : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < mobileBreakpoint);
      setIsTablet(width >= mobileBreakpoint && width < desktopBreakpoint);
      setIsDesktop(width >= desktopBreakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileBreakpoint, desktopBreakpoint]);

  return { isMobile, isTablet, isDesktop };
}
