import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./axiosBase";
import { Button, Label, TextInput, Textarea } from "flowbite-react";

const AddTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    name: "",
    description: "",
    completed: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/todos", task);

      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response from server");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-700">
        Add New Task
      </h2>
      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <Label htmlFor="name" value="Task Name" />
          <TextInput
            id="name"
            name="name"
            value={task.name}
            onChange={handleChange}
            placeholder="Enter task name"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="description" value="Task Description" />
          <Textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows={4}
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            id="completed"
            name="completed"
            type="checkbox"
            checked={task.completed}
            onChange={(e) =>
              setTask((prevTask) => ({
                ...prevTask,
                completed: e.target.checked,
              }))
            }
            className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
          />
          <Label htmlFor="completed" className="ml-2 text-sm text-gray-700">
            Mark as completed
          </Label>
        </div>
        <div className="flex flex-col-reverse sm:flex-row gap-4 justify-end">
          <Button
            className="w-full sm:w-auto bg-gray-400 text-white"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
            {loading ? "Adding..." : "Add Task"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
