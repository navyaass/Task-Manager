
import './App.css'
import AddTaskModal from './Components/AddTaskModal'
import DashBoard from './pages/DashBoard'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes,Route } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute'

function App() {
  return (
    <>
    <Routes>
      <Route path = '/' element={<Login/>}/>
      <Route path = '/register' element={<Register/>}/>
    
         <Route path='/dashboard' element={
            <PrivateRoute>
              <DashBoard/>
            </PrivateRoute>
          }/>
     
     
      <Route path='/taskModal' element={<AddTaskModal/>}/>      
    </Routes>
    
   
    </>
  )
}

export default App
