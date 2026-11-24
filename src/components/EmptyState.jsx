import { ClipboardList, SearchX } from "lucide-react";

export default function EmptyState({ hasTasks, onAdd, onReset }) {
  const Icon = hasTasks ? SearchX : ClipboardList;

  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 px-6 py-14 text-center">
      <Icon size={40} className="mx-auto text-slate-400" />
      <h3 className="mt-4 text-lg font-bold">
        {hasTasks ? "نتیجه‌ای پیدا نشد" : "هنوز کاری ثبت نکرده‌اید"}
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        {hasTasks
          ? "عبارت جست‌وجو یا فیلتر را تغییر دهید."
          : "با افزودن اولین کار، برنامه‌ریزی را شروع کنید."}
      </p>
      <button
        type="button"
        onClick={hasTasks ? onReset : onAdd}
        className="mt-5 rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
      >
        {hasTasks ? "پاک‌کردن جست‌وجو و فیلتر" : "افزودن کار"}
      </button>
    </div>
  );
}
