export default function StatsPanel({ total, done }) {
  const remaining = total - done;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const items = [
    { label: "کل کارها", value: total },
    { label: "انجام‌شده", value: done },
    { label: "باقی‌مانده", value: remaining },
  ];

  return (
    <section
      aria-label="خلاصهٔ وضعیت"
      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
    >
      <dl className="grid grid-cols-3 divide-x divide-x-reverse divide-slate-200 text-center">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col-reverse px-2">
            <dt className="mt-1 text-sm text-slate-500">{item.label}</dt>
            <dd className="text-3xl font-bold text-slate-900">
              {item.value.toLocaleString("fa-IR")}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-5">
        <div className="mb-1.5 flex justify-between text-xs text-slate-500">
          <span>پیشرفت</span>
          <span>{percent.toLocaleString("fa-IR")}٪</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="درصد کارهای انجام‌شده"
          className="h-2 overflow-hidden rounded-full bg-slate-100"
        >
          <div
            className="h-full rounded-full bg-teal-600 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </section>
  );
}
