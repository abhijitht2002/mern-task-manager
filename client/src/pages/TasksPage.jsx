import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { deleteTask, getAllTasksByUser } from "../api/api-helper";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const data = await getAllTasksByUser();
      console.log("Fetched tasks:", data.data);
      setTasks(data.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const updateTask = (updated) => {
    setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6">
        <TaskForm onAdd={addTask} />

        <div className="space-y-3">
          {loading ? (
            <p>Loading...</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={updateTask}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default TasksPage;
