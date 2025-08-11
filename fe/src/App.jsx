
import './App.css'
import AddTaskModal from './Components/AddTaskModal'
import DashBoard from './pages/DashBoard'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes,Route } from 'react-router-dom'

function App() {
  return (
    <>
    <Routes>
      <Route path = '/' element={<Login/>}/>
      <Route path = '/register' element={<Register/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
      <Route path='/taskModal' element={<AddTaskModal/>}/>      
    </Routes>
    
   
    </>
  )
}

export default App
