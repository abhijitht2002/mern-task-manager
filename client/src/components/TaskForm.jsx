import { useState } from "react";

function TaskForm({ onAdd }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const res = await api.post("/tasks", {
      task,
      dueDate: dueDate || undefined,
    });

    onAdd(res.data.data);
    setTask("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="new task..."
        className="flex-1 p-2 rounded-md bg-[#f2ede4] outline-none"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2 rounded-md bg-[#f2ede4]"
      />

      <button className="px-4 bg-[#3b2f2f] text-[#faf7f2] rounded-md">
        add
      </button>
    </form>
  );
}

export default TaskForm;
