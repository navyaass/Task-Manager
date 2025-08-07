import React, { useEffect, useState } from 'react'
import AddTaskModal from '../Components/AddTaskModal'
import axios from 'axios'
import { Link } from 'react-router-dom'

const DashBoard = () => {
  const [showModal, setShowModal] = useState(false)
  const [getTask,setGetTask] = useState([]);
  const [isEditOn, setEditOn] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)


  useEffect(()=>{
    axios.get('http://localhost:8000/api/task/getTask')
    .then((res)=>setGetTask(res.data.task))
    .catch(error=>{console.error("error occured",error)})
  },[])

  
  const deleteTask = async(taskId)=>{
    try{
      await axios.delete(`http://localhost:8000/api/task/deleteTask/${taskId}`)

      let res = await axios.get('http://localhost:8000/api/task/getTask')
      setGetTask(res.data.task)
    }catch(error){
      console.log("error occured",error)
    }

  }
  return (
    <div>
      <h1 className='text-4xl  m-10 font-bold'>Task Manager</h1>
      <h2 className='text-4xl text-center m-10 font-bold'> Task Dashboard</h2>
      <div className='flex justify-end items-center m-4'>
              <button className='bg-blue-600 p-4 text-white rounded-3xl' onClick={()=>setShowModal(true)}>Add Task</button>
              <Link to='/'>
              <button className='bg-blue-600 p-4 text-white rounded-3xl m-2' >Log-Out</button>
              </Link>
      </div>
      {/* if showModal is true render AddTaskmodal, else do nothing */}
      {/* {showModal && <AddTaskModal onClose={()=>setShowModal(false)}/> }   */}

      {showModal && (
  <AddTaskModal
    onClose={() => {
      setShowModal(false);
      setEditOn(false);
      setSelectedTask(null);
    }}
    isEdit={isEditOn}
    taskData={selectedTask}
    refreshTasks={() => {
      axios.get('http://localhost:8000/api/task/getTask')
        .then((res) => setGetTask(res.data.task))
        .catch((error) => console.error("error occurred", error));
    }}
  />
)}



       <table className="min-w-full border border-gray-200 rounded overflow-hidden">
  <thead className="bg-gray-100">
    <tr>
      <th className="text-left px-4 py-2 border-b">Title</th>
      <th className="text-left px-4 py-2 border-b">Description</th>
      <th className="text-left px-4 py-2 border-b">Priority</th>
      <th className="text-left px-4 py-2 border-b">Due Date</th>
      <th className="text-left px-4 py-2 border-b">delete</th>
      <th className="text-left px-4 py-2 border-b">edit</th>

    </tr>
  </thead>
  <tbody>
    {getTask.map((task) => (
      <tr key={task.id} className="hover:bg-gray-50">
        <td className="px-4 py-2 border-b">{task.title}</td>
        <td className="px-4 py-2 border-b">{task.description}</td>
        <td className="px-4 py-2 border-b">{task.priority}</td>
        <td className="px-4 py-2 border-b">{task.dueDate}</td>
        <td className="px-4 py-2 border-b"><button onClick={()=>{deleteTask(task._id)}}>Delete</button></td>
        <td className="px-4 py-2 border-b"><button onClick={ ()=>{
           setSelectedTask(task);
      setEditOn(true);
      setShowModal(true);
        }}>Edit</button></td>
      </tr>
    ))}
  </tbody>
</table>
 
    </div>
  )
}

export default DashBoard
