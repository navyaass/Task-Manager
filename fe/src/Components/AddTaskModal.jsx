
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddTaskModal = ({ onClose, isEdit, taskData, refreshTasks }) => {
  const [priorityData, setPriorityData] = useState([]);
  const [taskInfo, setTaskInfo] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: ""
  });

  //////////// priority options/////////////////////
  useEffect(() => {
    axios.get('http://localhost:8000/api/task/getPriorityOptions')
      .then((res) => setPriorityData(res.data))
      .catch(error => console.log("Error loading priorities", error));
  }, []);

  ////////////////Pre-fill form if in edit mode/////////////
  useEffect(() => {
    if (isEdit && taskData) {
      setTaskInfo({
        title: taskData.title || "",
        description: taskData.description || "",
        priority: taskData.priority || "",
        dueDate: taskData.dueDate?.substring(0, 10) || ""  
      });
    }
  }, [isEdit, taskData]);

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        //////////////////// Edit task///////////////////
        await axios.put(`http://localhost:8000/api/task/updateTask/${taskData._id}`, taskInfo);
        alert("Task updated successfully!");
      } else {
        ///////////// Add new task//////////////////
        await axios.post('http://localhost:8000/api/task/addTask', taskInfo);
        alert("Task added successfully!");
      }

      refreshTasks();    // re-fetch tasks in dashboard
      onClose();         // close modal
    } catch (error) {
      console.log("Error saving task", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[600px] rounded-3xl p-8 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          X
        </button>

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isEdit ? "Edit Task" : "Create New Task"}
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Title</label>
            <input
              type="text"
              value={taskInfo.title}
              onChange={(e) => setTaskInfo({ ...taskInfo, title: e.target.value })}
              className="border border-gray-300 p-3 rounded-lg"
              placeholder="Enter task title"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Description</label>
            <textarea
              rows="4"
              value={taskInfo.description}
              onChange={(e) => setTaskInfo({ ...taskInfo, description: e.target.value })}
              className="border border-gray-300 p-3 rounded-lg resize-none"
              placeholder="Enter task description"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Priority</label>
            <select
              value={taskInfo.priority}
              onChange={(e) => setTaskInfo({ ...taskInfo, priority: e.target.value })}
              className="border border-gray-300 p-3 rounded-lg"
            >
              <option value="">-- Select Priority --</option>
              {priorityData.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Due Date</label>
            <input
              type="date"
              value={taskInfo.dueDate}
              onChange={(e) => setTaskInfo({ ...taskInfo, dueDate: e.target.value })}
              className="border border-gray-300 p-3 rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg"
          >
            {isEdit ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
