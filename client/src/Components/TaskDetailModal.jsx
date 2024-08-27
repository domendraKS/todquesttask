import React from "react";
import { Modal, Button } from "flowbite-react";
import { HiOutlineInformationCircle } from "react-icons/hi";

const TaskDetailModal = ({ show, onClose, task }) => {
  return (
    <Modal show={show} onClose={onClose} size="lg" className="rounded-lg">
      <Modal.Header className="border-b-2 border-gray-200">
        <div className="flex items-center gap-2">
          <HiOutlineInformationCircle className="text-blue-500 w-6 h-6" />
          <span className="text-xl font-semibold text-gray-700">
            Task Details
          </span>
        </div>
      </Modal.Header>
      <Modal.Body className="bg-gray-50">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-gray-600 font-medium">Task Name</h4>
            <p className="text-gray-800 text-lg">{task.name}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-gray-600 font-medium">Description</h4>
            <p className="text-gray-700 text-sm">
              {task.description || "No description available."}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-gray-600 font-medium">Status</h4>
            <p
              className={`text-lg font-semibold ${
                task.completed ? "text-green-500" : "text-red-500"
              }`}
            >
              {task.completed ? "Completed" : "Not Completed"}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-t-2 border-gray-200">
        <Button
          onClick={onClose}
          className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDetailModal;
