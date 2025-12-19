import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  initialValue: string;
  onClose: () => void;
  onSave: (value: string) => void;
  continueWithoutInfo: (value: string) => void;
};

export const SchoolNameDialog: React.FC<Props> = ({
  open,
  initialValue,
  onClose,
  onSave,
  continueWithoutInfo,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed z-[60] left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-400 px-4 py-3">
              <h3 className="text-sm font-semibold text-slate-900">Info</h3>
              <button
                onClick={onClose}
                className="rounded-md p-1 hover:bg-slate-100  cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Body */}
            <div className="px-4 py-4 space-y-2">
              <label className="text-xs font-medium text-slate-600">
                Enter institution name
              </label>
              <input
                autoFocus
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. ABC Junior College, Pune"
                className="w-full rounded-lg border border-slate-400 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSave(value.trim());
                  if (e.key === "Escape") onClose();
                }}
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 border-t border-slate-400 px-4 py-3">
              <button
                onClick={() => continueWithoutInfo(value)}
                className="rounded-lg border border-slate-400 px-3 py-1.5 text-xs hover:bg-slate-50 cursor-pointer"
              >
                Continue without Info
              </button>
              <button
                onClick={() => onSave(value.trim())}
                disabled={!value.trim()}
                className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-medium text-white disabled:opacity-50 cursor-pointer"
              >
                Save
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
