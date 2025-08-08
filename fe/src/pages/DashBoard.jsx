import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {setTasks,
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
  const { tasks, showModal } = useSelector(state => state.task);
  const filterPriority = useSelector(state => state.task.filterPriority); 

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
    <div>
      <h1 className='text-4xl  m-10 font-bold'>Task Manager</h1>
      <h2 className='text-4xl text-center m-10 font-bold'> Task Dashboard</h2>
      <div className='flex justify-end items-center m-4'>
        <button
          className='bg-blue-600 p-4 text-white rounded-3xl'
          onClick={() => {
            dispatch(setSelectedTask(null));
            dispatch(setEditMode(false));
            dispatch(setShowModal(true));
          }}
        >
          Add Task
        </button>
       
        <button  onClick={()=>{
          localStorage.removeItem('token');
          navigate('/')
        }} className='bg-blue-600 p-4 text-white rounded-3xl ml-4'>Log-out</button>
       
      </div>

      {showModal && <AddTaskModal refreshTasks={fetchTasks} />}

      <table className="min-w-full border border-gray-200 rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border-b">Title</th>
            <th className="text-left px-4 py-2 border-b">Description</th>
            <th className="text-left px-4 py-2 border-b">Priority</th>
            <th className="text-left px-4 py-2 border-b">Due Date</th>
            <th className="text-left px-4 py-2 border-b">Delete</th>
            <th className="text-left px-4 py-2 border-b">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{task.title}</td>
              <td className="px-4 py-2 border-b">{task.description}</td>
              <td className="px-4 py-2 border-b">{task.priority}</td>
              <td className="px-4 py-2 border-b">{task.dueDate?.substring(0, 10)}</td>
              <td className="px-4 py-2 border-b">
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </td>
              <td className="px-4 py-2 border-b">
                <button onClick={() => handleEdit(task)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ///////////////////////////////////////////////////////////////////////// */}



      {/* 🔽 Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2">Filter by Priority:</label>
        <select onChange={handleFilterChange} value={filterPriority} className="border p-2 rounded">
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* 🔁 Show filtered tasks */}
      {filteredTasks.map((task) => (
        <div key={task._id} className="p-4 mb-2 border rounded">
          <h2 className="text-lg font-semibold">{task.title}</h2>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
        </div>
      ))}

      

      {/* ///////////////////////////////////////////////////////////////////////// */}

      
    </div>
  );
};

export default DashBoard;
