function TaskCard({ task, onUpdate, onDelete }) {
  const toggleStatus = async () => {
    const newStatus = task.status === "completed" ? "pending" : "completed";

    const res = await api.put(`/tasks/${task._id}`, {
      status: newStatus,
    });

    onUpdate(res.data.data);
  };

  return (
    <div className="bg-[#faf7f2] border border-[#e6dccf] rounded-lg p-4 flex justify-between items-start">
      <div className="flex gap-3">
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={toggleStatus}
          className="mt-1"
        />

        <div>
          <p
            className={`text-[#3b2f2f] ${
              task.status === "completed" ? "line-through text-[#7b6a58]" : ""
            }`}
          >
            {task.task}
          </p>

          <div className="text-xs text-[#7b6a58] mt-1 space-y-0.5">
            {task.dueDate && (
              <p>due: {new Date(task.dueDate).toLocaleDateString()}</p>
            )}

            {task.completedAt && (
              <p>
                completed: {new Date(task.completedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => onDelete(task._id)}
        className="text-[#7b6a58] hover:text-[#a14f3c]"
      >
        ×
      </button>
    </div>
  );
}

export default TaskCard;
