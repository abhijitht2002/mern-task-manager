import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import {
  addTask,
  deleteTask,
  getAllTasksByUser,
  updateTask,
} from "../api/api-helper";

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

  const handleAddTask = async (task) => {
    try {
      const res = await addTask(task);
      console.log("Added task:", res.data);
      fetchTasks();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleUpdateTask = async (id, data) => {
    const res = await updateTask(id, data);
    console.log("Edit customer response:", res);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6">
        <TaskForm onSubmit={handleAddTask} />

        <div className="space-y-3">
          {loading ? (
            <p>Loading...</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={handleUpdateTask}
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
