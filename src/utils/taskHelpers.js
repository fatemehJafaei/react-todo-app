export function todayString() {
  return new Date().toLocaleDateString("en-CA");
}

export function isOverdue(task) {
  return !task.done && task.dueDate !== "" && task.dueDate < todayString();
}

export function formatDueDate(dueDate) {
  return new Date(`${dueDate}T00:00:00`).toLocaleDateString("fa-IR");
}

export function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function filterAndSortTasks(tasks, { query, filter, sort }) {
  const q = query.trim().toLowerCase();

  const result = tasks.filter((task) => {
    const matchesQuery =
      q === "" ||
      task.title.toLowerCase().includes(q) ||
      task.description.toLowerCase().includes(q);

    let matchesFilter = true;
    if (filter === "done") matchesFilter = task.done;
    else if (filter === "todo") matchesFilter = !task.done;
    else if (filter !== "all") matchesFilter = task.priority === filter;

    return matchesQuery && matchesFilter;
  });

  result.sort((a, b) => {
    if (sort === "oldest") return a.createdAt - b.createdAt;
    if (sort === "due") {
      if (!a.dueDate && !b.dueDate) return b.createdAt - a.createdAt;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    }
    return b.createdAt - a.createdAt;
  });

  return result;
}
