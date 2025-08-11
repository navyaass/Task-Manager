
import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTasks,
  deleteTask as deleteTaskAction,
  setShowModal,
  setEditMode,
  setSelectedTask,
  setFilterPriority
} from '../redux/taskSlice';
import AddTaskModal from '../Components/AddTaskModal';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks, showModal, filterPriority } = useSelector(state => state.task);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/');
    }
  },
  [])
 


  const handleFilterChange = (e) => {
    dispatch(setFilterPriority(e.target.value));
  };

  const filteredTasks = filterPriority
    ? tasks.filter(task => task.priority === filterPriority)
    : tasks;

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/task/getTask');
      dispatch(setTasks(res.data.task));
    } catch (error) {
      console.log("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/api/task/deleteTask/${taskId}`);
      dispatch(deleteTaskAction(taskId));
    } catch (error) {
      console.log("Error deleting task", error);
    }
  };

  const handleEdit = (task) => {
    dispatch(setSelectedTask(task));
    dispatch(setEditMode(true));
    dispatch(setShowModal(true));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Task Dashboard</h1>

      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-600 px-4 py-2 text-white rounded-lg hover:bg-blue-700"
          onClick={() => {
            dispatch(setSelectedTask(null));
            dispatch(setEditMode(false));
            dispatch(setShowModal(true));
          }}
        >
          Add Task
        </button>

        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}
          className="bg-red-600 px-4 py-2 text-white rounded-lg hover:bg-red-700"
        >
         Log-out
        </button>
      </div>

      
      <div className="mb-4 flex items-center">
        <label className="mr-2 font-medium">Filter by Priority:</label>
        <select
          onChange={handleFilterChange}
          value={filterPriority}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="High" >High</option>
          <option value="Medium" >Medium</option>
          <option value="Low" >Low</option>
        </select>
      </div>

      <div className="overflow-x-auto  rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-4 py-3 text-left font-semibold">Description</th>
              <th className="px-4 py-3 text-left font-semibold">Priority</th>
              <th className="px-4 py-3 text-left font-semibold">Due Date</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <tr
                  key={task._id}
                  className="hover:bg-gray-50 border-t border-gray-200"
                >
                  <td className="px-4 py-3">{task.title}</td>
                  <td className="px-4 py-3">{task.description}</td>
                  <td >
                    {task.priority}
                  </td>
                  <td className="px-4 py-3">{task.dueDate?.substring(0, 10)}</td>
                  <td className="px-4 py-3 flex space-x-3">
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && <AddTaskModal refreshTasks={fetchTasks} />}
    </div>
  );
};

export default DashBoard;
