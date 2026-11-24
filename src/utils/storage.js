const STORAGE_KEY = "task-manager:v1";

export function loadTasks(fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    console.error("خواندن از localStorage ناموفق بود:", error);
    return fallback;
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("ذخیره در localStorage ناموفق بود:", error);
  }
}
