import { useState } from "react";
import { Plus } from "lucide-react";
import useTasks from "./hooks/useTasks";
import { filterAndSortTasks } from "./utils/taskHelpers";
import StatsPanel from "./components/StatsPanel";
import Toolbar from "./components/Toolbar";
import TaskList from "./components/TaskList";
import EmptyState from "./components/EmptyState";
import TaskForm from "./components/TaskForm";
import ConfirmDialog from "./components/ConfirmDialog";

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  const [formTask, setFormTask] = useState(undefined);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const visibleTasks = filterAndSortTasks(tasks, { query, filter, sort });

  const doneCount = tasks.filter((task) => task.done).length;

  const handleSave = (data) => {
    if (formTask) updateTask(formTask.id, data);
    else addTask(data);
    setFormTask(undefined);
  };

  const handleConfirmDelete = () => {
    deleteTask(taskToDelete.id);
    setTaskToDelete(null);
  };

  const resetSearch = () => {
    setQuery("");
    setFilter("all");
  };

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-8 sm:py-12">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">مدیریت کارها</h1>
          <p className="mt-1 text-sm text-slate-500">
            کارهای روزانه‌تان را ثبت و پیگیری کنید.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormTask(null)}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-teal-800"
        >
          <Plus size={18} />
          افزودن کار
        </button>
      </header>

      <StatsPanel total={tasks.length} done={doneCount} />

      <main className="mt-6 space-y-5">
        <Toolbar
          query={query}
          onQueryChange={setQuery}
          filter={filter}
          onFilterChange={setFilter}
          sort={sort}
          onSortChange={setSort}
        />

        {visibleTasks.length === 0 ? (
          <EmptyState
            hasTasks={tasks.length > 0}
            onAdd={() => setFormTask(null)}
            onReset={resetSearch}
          />
        ) : (
          <TaskList
            tasks={visibleTasks}
            onToggle={toggleTask}
            onEdit={setFormTask}
            onDelete={setTaskToDelete}
          />
        )}
      </main>

      {formTask !== undefined && (
        <TaskForm
          task={formTask}
          onSave={handleSave}
          onClose={() => setFormTask(undefined)}
        />
      )}

      {taskToDelete && (
        <ConfirmDialog
          task={taskToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  );
}
