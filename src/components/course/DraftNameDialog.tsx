"use client";

import { X } from "lucide-react";

export function DraftNameDialog({
  confirmLeave,
  setOpenDraftNameDialog,
  draftName,
  setDraftName,
  saving,
  setSaving,
  saveDraftToDB,
}: any) {
  return (
    <div className="fixed inset-0 z-9999 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[380px] shadow-xl">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Save paper draft</h3>
          <button
            type="button"
            onClick={() => setOpenDraftNameDialog(false)}
            className="relative bottom-2 left-2 rounded-full p-2 hover:bg-slate-100 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-slate-600 mt-1">
          Give your draft a name to save it.
        </p>

        {/* Draft name input */}
        <input
          type="text"
          placeholder="e.g. Unit Test – Physics Ch 1"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          className="mt-4 w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-emerald-600"
          autoFocus
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            disabled={!draftName.trim() || saving}
            onClick={async () => {
              try {
                setSaving(true);
                await saveDraftToDB(draftName.trim());
                setDraftName("");
                confirmLeave();
              } finally {
                setSaving(false);
              }
            }}
            className={`px-4 py-2 rounded-lg text-white ${
              !draftName.trim()
                ? "bg-emerald-600/50 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
            }`}
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>
        </div>
      </div>
    </div>
  );
}
