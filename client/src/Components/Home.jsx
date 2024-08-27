import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "./axiosBase";
import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import TaskDetailModal from "./TaskDetailModal";
import EditTaskModal from "./EditTaskModal";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    getAllTask();
  }, []);

  const getAllTask = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await api.get("/todos");

      if (response.data.success) {
        setTasks(response.data.tasks);
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

  if (error) {
    return <p>{error}</p>;
  }

  const handleTaskDelete = async () => {
    setShowDeleteModel(false);

    try {
      const response = await api.delete(`/todos/${deleteId}`);

      if (response.data.success) {
        setTasks((prev) => prev.filter((task) => task._id !== deleteId));
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
      setDeleteId(null);
    }
  };

  const handleShowModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const openEditModal = (taskId) => {
    setEditTaskId(taskId);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditTaskId(null);
  };

  const refreshTasks = () => {
    getAllTask();
  };

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between my-2">
          <div className="self-center whitespace-nowrap text-sm font-semibold  px-2 py-1 bg-gradient-to-b from-cyan-500 via-yellow-400 to-cyan-500 rounded-lg text-white">
            All Tasks
          </div>
          <Link
            to="/addTask"
            className="border py-1 px-2 rounded-lg cursor-pointer text-white text-sm hover:shadow-md bg-cyan-500 hover:bg-cyan-600"
          >
            Add Task
          </Link>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-full bg-white" striped>
            <Table.Head>
              <Table.HeadCell className="text-xs sm:text-sm md:text-md">
                S.No.
              </Table.HeadCell>
              <Table.HeadCell className="text-xs sm:text-sm md:text-md">
                Name
              </Table.HeadCell>
              <Table.HeadCell className="text-xs sm:text-sm md:text-md">
                Description
              </Table.HeadCell>
              <Table.HeadCell className="text-xs sm:text-sm md:text-md">
                Completed
              </Table.HeadCell>
              <Table.HeadCell className="text-xs sm:text-sm md:text-md">
                Action
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="text-xs sm:text-sm md:text-md divide-y">
              {tasks &&
                tasks.map((task, index) => (
                  <Table.Row
                    key={task._id}
                    className="font-semibold text-black"
                  >
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{task.name}</Table.Cell>
                    <Table.Cell>
                      {task.description ? (
                        <span>
                          {task.description.length > 50
                            ? `${task.description.substring(0, 25)}...`
                            : task.description}
                        </span>
                      ) : (
                        <span className="text-xs text-center text-gray-400">
                          ---NA---
                        </span>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {task.completed ? (
                        <span className="bg-green-500 text-white py-1 px-2 rounded-lg text-xs">
                          Yes
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white py-1 px-2 rounded-lg text-xs">
                          No
                        </span>
                      )}
                    </Table.Cell>
                    <Table.Cell className="flex gap-1">
                      <Button
                        outline
                        gradientMonochrome="success"
                        size="xs"
                        onClick={() => handleShowModal(task)}
                      >
                        View
                      </Button>
                      <Button
                        outline
                        size="xs"
                        onClick={() => openEditModal(task._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="xs"
                        outline
                        color="failure"
                        onClick={() => {
                          setShowDeleteModel(true), setDeleteId(task._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <Modal
        show={showDeleteModel}
        onClose={() => setShowDeleteModel(false)}
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 mb-4 mx-auto text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this task?
            </h3>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-4">
            <Button
              className="w-full sm:w-auto bg-gray-400 text-white"
              onClick={() => setShowDeleteModel(false)}
            >
              Cancel
            </Button>
            <Button
              color="failure"
              onClick={handleTaskDelete}
              className="w-full sm:w-auto"
            >
              Yes, I'm sure
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {selectedTask && (
        <TaskDetailModal
          show={showModal}
          onClose={handleCloseModal}
          task={selectedTask}
        />
      )}

      {editTaskId && (
        <EditTaskModal
          show={showEditModal}
          onClose={closeEditModal}
          taskId={editTaskId}
          refreshTasks={refreshTasks}
        />
      )}
    </>
  );
};

export default Home;
