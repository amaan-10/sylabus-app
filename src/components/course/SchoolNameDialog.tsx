import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type DialogData = {
  schoolName: string;
  className: string;
  subjectName: string;
  testName: string;
  examDate: string;
  time: number;
  includeInstructions: boolean;
  logo?: string;
  watermark: string;
};

type Props = {
  open: boolean;
  initialValue: Partial<DialogData>;
  onClose: () => void;
  onSave: (data: DialogData) => void;
  continueWithoutInfo: () => void;
};

export const SchoolNameDialog: React.FC<Props> = ({
  open,
  initialValue,
  onClose,
  onSave,
  continueWithoutInfo,
}) => {
  const today = new Date().toISOString().split("T")[0];

  const [data, setData] = useState<DialogData>({
    schoolName: "",
    className: "",
    subjectName: "",
    testName: "",
    examDate: today,
    includeInstructions: true,
    logo: "",
    watermark: "",
    time: 0,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setData((prev) => ({ ...prev, ...initialValue }));
  }, [initialValue]);

  const update = <K extends keyof DialogData>(key: K, value: DialogData[K]) =>
    setData((p) => ({ ...p, [key]: value }));

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      alert("Only PNG and JPG images are allowed");
      e.target.value = "";
      return;
    }

    setImageFile(file);
  };

  const uploadImage = async () => {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch("/api/upload-question-image", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const data = await res.json();
    return data.url as string;
  };

  const removeFile = () => {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed z-60 left-1/2 top-1/2 w-[92vw] max-w-lg
                       -translate-x-1/2 -translate-y-1/2
                       rounded-3xl bg-white
                       shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                       ring-1 ring-black/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5">
              <h3 className="text-sm font-medium text-slate-900">
                Paper Information
              </h3>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">
              <Input
                label="School / Institute Name"
                placeholder="ABC Junior College"
                value={data.schoolName}
                onChange={(e) => update("schoolName", e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Class"
                  placeholder="Class 12"
                  value={data.className}
                  onChange={(e) => update("className", e.target.value)}
                />
                <Input
                  label="Subject"
                  placeholder="Mathematics"
                  value={data.subjectName}
                  onChange={(e) => update("subjectName", e.target.value)}
                />
              </div>

              <Input
                label="Test Name"
                placeholder="Mid Term Examination"
                value={data.testName}
                onChange={(e) => update("testName", e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Exam Date"
                  type="date"
                  min={today}
                  value={data.examDate}
                  onChange={(e) => update("examDate", e.target.value)}
                />
                <Input
                  label="Time (minutes)"
                  type="number"
                  min={0}
                  value={data.time}
                  onChange={(e) => update("time", Number(e.target.value))}
                />
              </div>

              <div className="flex flex-row gap-4">
                <div className="w-full">
                  <Input
                    label="Watermark"
                    placeholder="CONFIDENTIAL"
                    value={data.watermark}
                    onChange={(e) => update("watermark", e.target.value)}
                  />
                </div>

                {/* Logo */}
                <div className="space-y-1 w-full">
                  <label className="text-[11px] font-medium text-slate-500">
                    Institute Logo (optional)
                  </label>
                  <label
                    className="flex cursor-pointer items-center justify-center gap-2
                           rounded-xl border border-dashed border-slate-300
                           bg-slate-50 py-3 text-xs text-slate-600
                           hover:bg-slate-100"
                  >
                    <Upload size={14} />
                    {imageFile ? (
                      <span className="truncate max-w-[180px]">
                        {imageFile.name}
                      </span>
                    ) : (
                      <span>Upload logo</span>
                    )}

                    {imageFile && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault(); // prevent file picker
                          removeFile();
                        }}
                        className="rounded-full p-1 hover:bg-slate-200 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    )}

                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <label className="inline-flex items-center gap-2 text-[11px] text-slate-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.includeInstructions}
                  onChange={(e) =>
                    update("includeInstructions", e.target.checked)
                  }
                  className="accent-slate-900 cursor-pointer"
                />
                Include General Instructions
              </label>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 px-6 pb-5">
              <button
                onClick={continueWithoutInfo}
                className="rounded-full px-4 py-1.5 text-xs text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                Skip
              </button>
              <button
                onClick={async () => {
                  const imageUrl = await uploadImage();
                  console.log("imageUrl", imageUrl);
                  onSave({
                    ...data,
                    logo: imageUrl,
                  });
                }}
                className="rounded-full bg-slate-900 px-5 py-1.5 text-xs text-white hover:bg-slate-800 cursor-pointer"
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

/* ---------- Ultra-minimal Input ---------- */
const Input = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) => (
  <div className="space-y-1">
    <label className="text-[11px] font-medium text-slate-500">{label}</label>
    <input
      {...props}
      className="w-full rounded-xl border border-slate-200
                 bg-white px-3 py-2 text-sm
                 placeholder:text-slate-400
                 focus:border-slate-400 focus:outline-none"
    />
  </div>
);
