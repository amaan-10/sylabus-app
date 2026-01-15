"use client";

export function SaveDraftDialog({
  confirmLeave,
  setOpenDraftNameDialog,
}: {
  confirmLeave: any;
  setOpenDraftNameDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed inset-0 z-9999 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[360px]">
        <h3 className="text-lg font-semibold">Save paper draft?</h3>
        <p className="text-sm text-slate-600 mt-2">You have unsaved changes.</p>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => {
              localStorage.removeItem("paper:draft");
              confirmLeave();
            }}
            className="px-4 py-2 border rounded-lg cursor-pointer"
          >
            Discard
          </button>

          <button
            onClick={() => {
              setOpenDraftNameDialog(true);
            }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg cursor-pointer"
          >
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}
