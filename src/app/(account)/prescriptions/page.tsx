"use client";

import { useState } from "react";
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Trash2, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  X
} from "lucide-react";
import { toast } from "sonner";

interface PrescriptionItem {
  id: string;
  title: string;
  doctor: string;
  date: string;
  status: "verified" | "reviewing";
  fileUrl?: string;
  genericMatches: string[];
}

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>([
    {
      id: "rx-1",
      title: "Chest & Respiratory Prescription",
      doctor: "Dr. S. Mehta (MD Pulmonology)",
      date: "20 Sep 2026",
      status: "verified",
      genericMatches: ["AZATRA-500 (Azithromycin)", "PANTODAC-40 (Pantoprazole)"]
    },
    {
      id: "rx-2",
      title: "Diabetes & Routine Checkup",
      doctor: "Dr. A. Sharma (MBBS, DNB)",
      date: "14 Sep 2026",
      status: "reviewing",
      genericMatches: ["METFOR-500 (Metformin)", "GLIME-2 (Glimepiride)"]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) {
      toast.error("Please select a prescription document or image");
      return;
    }

    const newRx: PrescriptionItem = {
      id: `rx-${Date.now()}`,
      title: `${patientName || "Family Member"}'s Prescription`,
      doctor: "Dr. Verified Partner Pharmacist",
      date: "Just now",
      status: "reviewing",
      genericMatches: ["Generic matching in progress..."]
    };

    setPrescriptions([newRx, ...prescriptions]);
    setIsModalOpen(false);
    setFileName("");
    setPatientName("");
    toast.success("Prescription uploaded! A licensed pharmacist is reviewing your salts.");
  };

  const handleDelete = (id: string) => {
    setPrescriptions(prescriptions.filter((p) => p.id !== id));
    toast.info("Prescription removed from records.");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-black text-slate-900">My Prescriptions</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Securely stored Rx documents verified by registered pharmacists
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-2xl font-bold hover:bg-primary-dark transition shadow-md active:scale-95 text-xs sm:text-sm"
          >
            <Upload size={16} />
            Upload New Prescription
          </button>
        </div>

        {/* Benefits banner */}
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-emerald-900 font-semibold">
            <Sparkles size={18} className="text-primary shrink-0" />
            <span>Our pharmacists automatically substitute costly brands with identical WHO-GMP generics, saving you up to 80%.</span>
          </div>
          <span className="text-primary font-bold whitespace-nowrap">100% Free Verification</span>
        </div>

        {/* List of Prescriptions */}
        <div className="grid md:grid-cols-2 gap-4">
          {prescriptions.map((rx) => (
            <div 
              key={rx.id} 
              className="border border-slate-200 rounded-2xl p-5 hover:border-primary/40 transition-all bg-white shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-50 text-primary rounded-xl flex items-center justify-center shrink-0 border border-green-100">
                      <FileText size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {rx.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{rx.doctor}</p>
                    </div>
                  </div>
                  
                  {rx.status === "verified" ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 shrink-0">
                      <Clock size={12} /> Under Review
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-500 mb-4 pl-1">
                  Uploaded on: <strong className="text-slate-700">{rx.date}</strong>
                </div>

                {/* Generic Substitutes Found */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Identified Generic Substitutes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {rx.genericMatches.map((match, i) => (
                      <span key={i} className="text-xs font-semibold bg-white border border-slate-200 text-slate-800 px-2 py-0.5 rounded-lg shadow-2xs">
                        {match}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <button 
                  onClick={() => toast.info("Opening secure document viewer...")}
                  className="font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <Eye size={14} /> View Document
                </button>
                <button 
                  onClick={() => handleDelete(rx.id)}
                  className="text-slate-400 hover:text-red-500 transition flex items-center gap-1 font-semibold"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1 flex items-center gap-2">
              <Upload className="text-primary" /> Upload Doctor&apos;s Prescription
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Upload a photo or scanned copy of your prescription. Valid prescription is required for Schedule H medicines.
            </p>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Patient Full Name</label>
                <input 
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Ayaz Khan"
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-primary focus:bg-white"
                />
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files[0]) {
                    setFileName(e.dataTransfer.files[0].name);
                  }
                }}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                  isDragging ? "border-primary bg-green-50" : "border-slate-300 hover:border-slate-400 bg-slate-50/50"
                }`}
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 text-primary shadow-2xs border border-slate-200">
                  <Upload size={22} />
                </div>
                {fileName ? (
                  <p className="text-xs font-bold text-green-700">
                    Selected file: <span className="underline">{fileName}</span>
                  </p>
                ) : (
                  <>
                    <p className="text-xs font-bold text-slate-800 mb-1">
                      Drag & drop your prescription here or <span className="text-primary cursor-pointer">browse files</span>
                    </p>
                    <p className="text-[11px] text-slate-400">Supports JPG, PNG, PDF up to 10MB</p>
                  </>
                )}
                <input 
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                  className="mt-3 text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary-dark cursor-pointer"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
                <AlertCircle size={15} className="shrink-0 mt-0.5 text-amber-600" />
                <span>Make sure the Doctor&apos;s name, patient name, date, and medicines are clearly visible in the image.</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-dark transition shadow-md"
                >
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
