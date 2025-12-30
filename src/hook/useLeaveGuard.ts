import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export const useLeaveGuard = (shouldBlock: boolean) => {
  const router = useRouter();

  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const blockingRef = useRef(false);
  const bypassRef = useRef(false);

  useEffect(() => {
    if (!shouldBlock) return;

    const onClick = (e: MouseEvent) => {
      if (bypassRef.current) return; // allow routing

      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor || !anchor.href) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      e.preventDefault();
      e.stopPropagation();

      if (!blockingRef.current) {
        blockingRef.current = true;
        setPendingPath(href);
        setShowDialog(true);
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [shouldBlock]);

  // Confirm & continue navigation
  const confirmLeave = () => {
    if (!pendingPath) return;

    setShowDialog(false);
    blockingRef.current = false;

    bypassRef.current = true;
    router.push(pendingPath);

    // reset bypass after navigation tick
    setTimeout(() => {
      bypassRef.current = false;
    }, 0);
  };

  // Cancel navigation
  const cancelLeave = () => {
    setPendingPath(null);
    setShowDialog(false);
    blockingRef.current = false;
  };

  // Allow programmatic routing
  const allowRoute = (fn: () => void) => {
    bypassRef.current = true;
    fn();

    setTimeout(() => {
      bypassRef.current = false;
    }, 0);
  };

  return {
    showDialog,
    confirmLeave,
    cancelLeave,
    allowRoute,
  };
};
