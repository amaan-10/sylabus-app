import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export const useLeaveGuard = (shouldBlock: boolean) => {
  const router = useRouter();
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const blockingRef = useRef(false);

  useEffect(() => {
    if (!shouldBlock) return;

    const onClick = (e: MouseEvent) => {
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

  const confirmLeave = () => {
    if (!pendingPath) return;
    setShowDialog(false);
    blockingRef.current = false;
    router.push(pendingPath);
  };

  const cancelLeave = () => {
    setPendingPath(null);
    setShowDialog(false);
    blockingRef.current = false;
  };

  return {
    showDialog,
    confirmLeave,
    cancelLeave,
  };
};
