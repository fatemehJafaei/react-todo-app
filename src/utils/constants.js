export const CATEGORIES = ['کاری', 'شخصی', 'یادگیری', 'خرید'];

export const PRIORITIES = {
  high: { label: 'بالا', badge: 'bg-rose-50 text-rose-700 ring-rose-200' },
  medium: { label: 'متوسط', badge: 'bg-amber-50 text-amber-700 ring-amber-200' },
  low: { label: 'پایین', badge: 'bg-sky-50 text-sky-700 ring-sky-200' },
};

export const STATUS_FILTERS = [
  { value: 'all', label: 'همه' },
  { value: 'todo', label: 'انجام‌نشده' },
  { value: 'done', label: 'انجام‌شده' },
  { value: 'high', label: 'اولویت بالا' },
  { value: 'medium', label: 'اولویت متوسط' },
  { value: 'low', label: 'اولویت پایین' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'جدیدترین' },
  { value: 'oldest', label: 'قدیمی‌ترین' },
  { value: 'due', label: 'نزدیک‌ترین موعد' },
];
