import React, { useState, useEffect } from "react";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import api from "./axiosBase";

const EditTaskModal = ({ show, onClose, taskId, refreshTasks }) => {
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    completed: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (taskId) {
      fetchTaskData();
    }
  }, [taskId]);

  const fetchTaskData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/todos/${taskId}`);
      if (response.data.success) {
        setTaskData(response.data.task);
      }
    } catch {
      setError("Failed to load task data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/todos/${taskId}`, taskData);
      if (response.data.success) {
        refreshTasks();
        onClose();
      }
    } catch {
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onClose={onClose} size="md">
      <Modal.Header>Edit Task</Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <Label htmlFor="taskName" value="Task Name" />
          <TextInput
            id="taskName"
            type="text"
            value={taskData.name}
            onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="taskDescription" value="Task Description" />
          <TextInput
            id="taskDescription"
            type="text"
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
          />
        </div>
        <div className="flex items-center mb-4">
          <Label htmlFor="taskCompleted" className="mr-2">
            Completed
          </Label>
          <input
            id="taskCompleted"
            type="checkbox"
            checked={taskData.completed}
            onChange={(e) =>
              setTaskData({ ...taskData, completed: e.target.checked })
            }
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave} disabled={loading}>
          Save
        </Button>
        <Button color="gray" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
