export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-full animate-pulse p-4">
      <div className="w-full pt-[90%] bg-slate-200 rounded-xl mb-4" />
      <div className="h-3 w-1/3 bg-slate-200 rounded mb-2" />
      <div className="h-4 w-4/5 bg-slate-200 rounded mb-2" />
      <div className="h-3 w-2/3 bg-slate-200 rounded mb-4" />
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="h-5 w-16 bg-slate-200 rounded" />
        <div className="h-9 w-24 bg-slate-200 rounded-full" />
      </div>
    </div>
  );
}
