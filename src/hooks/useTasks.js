import { useEffect, useState } from 'react';
import { sampleTasks } from '../data/sampleTasks';
import { loadTasks, saveTasks } from '../utils/storage';
import { createId } from '../utils/taskHelpers';

export default function useTasks() {
  const [tasks, setTasks] = useState(() => loadTasks(sampleTasks));

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (data) => {
    const newTask = { ...data, id: createId(), done: false, createdAt: Date.now() };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id, data) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return { tasks, addTask, updateTask, deleteTask, toggleTask };
}
