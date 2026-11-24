const DAY = 24 * 60 * 60 * 1000;

export const sampleTasks = [
  {
    id: "1",
    title: "یادگیری ری اکت",
    description: "بخش پروژه‌ها و دورهٔ آموزشی اضافه شود.",
    category: "کاری",
    priority: "medium",
    dueDate: "",
    done: true,
    createdAt: Date.now() - 2 * DAY,
  },
  {
    id: "2",
    title: "خرید میوه",
    description: "",
    category: "خرید",
    priority: "low",
    dueDate: "",
    done: false,
    createdAt: Date.now() - 1 * DAY,
  },
];
