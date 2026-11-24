import { CalendarDays, Check, Pencil, Trash2 } from "lucide-react";
import { PRIORITIES } from "../utils/constants";
import { formatDueDate, isOverdue } from "../utils/taskHelpers";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const priority = PRIORITIES[task.priority];
  const overdue = isOverdue(task);

  return (
    <li className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-pressed={task.done}
        aria-label={
          task.done
            ? `علامت «انجام‌نشده» برای ${task.title}`
            : `علامت «انجام‌شده» برای ${task.title}`
        }
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          task.done
            ? "border-teal-600 bg-teal-600 text-white"
            : "border-slate-300 text-transparent hover:border-teal-600"
        }`}
      >
        <Check size={14} strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-bold ${
            task.done ? "text-slate-400 line-through" : "text-slate-900"
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p
            className={`mt-1 text-sm leading-6 ${
              task.done ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {task.description}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">
            {task.category}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 font-medium ring-1 ${priority.badge}`}
          >
            اولویت {priority.label}
          </span>
          {task.dueDate && (
            <span
              className={`inline-flex items-center gap-1 font-medium ${
                overdue ? "text-rose-600" : "text-slate-500"
              }`}
            >
              <CalendarDays size={14} />
              {formatDueDate(task.dueDate)}
              {overdue && " (گذشته)"}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-start gap-1">
        <button
          type="button"
          onClick={() => onEdit(task)}
          aria-label={`ویرایش ${task.title}`}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-teal-700"
        >
          <Pencil size={18} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(task)}
          aria-label={`حذف ${task.title}`}
          className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
}
