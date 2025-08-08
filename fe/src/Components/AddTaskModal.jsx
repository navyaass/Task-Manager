import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setShowModal, setEditMode, setSelectedTask } from '../redux/taskSlice';

const AddTaskModal = ({ refreshTasks }) => {
  const dispatch = useDispatch();
  const isEdit = useSelector(state => state.task.isEditMode);
  const taskData = useSelector(state => state.task.selectedTask);
  const [priorityData, setPriorityData] = useState([]);

  const [taskInfo, setTaskInfo] = useState({
    title: '',
    description: '',
    priority: '',
    dueDate: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/task/getPriorityOptions')
      .then(res => setPriorityData(res.data))
      .catch(err => console.log("Error getting priorities", err));
  }, []);

  useEffect(() => {
    if (isEdit && taskData) {
      setTaskInfo({
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        dueDate: taskData.dueDate?.substring(0, 10)
      });
    }
  }, [isEdit, taskData]);

  const handleClose = () => {
    dispatch(setShowModal(false));
    dispatch(setEditMode(false));
    dispatch(setSelectedTask(null));
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axios.put(`http://localhost:8000/api/task/updateTask/${taskData._id}`, taskInfo);
        alert("Task updated!");
      } else {
        await axios.post('http://localhost:8000/api/task/addTask', taskInfo);
        alert("Task added!");
      }
      refreshTasks();
      handleClose();
    } catch (err) {
      console.log("Error saving task", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[600px] rounded-3xl p-8 shadow-lg relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          X
        </button>
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isEdit ? "Edit Task" : "Create New Task"}
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={taskInfo.title}
            onChange={(e) => setTaskInfo({ ...taskInfo, title: e.target.value })}
            className="border p-3 w-full rounded-lg"
          />
          <textarea
            rows="3"
            placeholder="Description"
            value={taskInfo.description}
            onChange={(e) => setTaskInfo({ ...taskInfo, description: e.target.value })}
            className="border p-3 w-full rounded-lg"
          />
          <select
            value={taskInfo.priority}
            onChange={(e) => setTaskInfo({ ...taskInfo, priority: e.target.value })}
            className="border p-3 w-full rounded-lg"
          >
            <option value="">-- Select Priority --</option>
            {priorityData.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <input
            type="date"
            value={taskInfo.dueDate}
            onChange={(e) => setTaskInfo({ ...taskInfo, dueDate: e.target.value })}
            className="border p-3 w-full rounded-lg"
          />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button onClick={handleClose} className="bg-gray-300 px-5 py-2 rounded-lg">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-5 py-2 rounded-lg">
            {isEdit ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
