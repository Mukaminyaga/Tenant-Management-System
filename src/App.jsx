import { Route, Routes } from 'react-router-dom'
import './App.css'
import {Login, SignUp, HomePage, Dashboard} from "./pages"
import { useDispatch } from 'react-redux'
import { checkIsLoggedIn } from './redux/ActionCreators/authActionsCreator'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  },[])
  return (
    <div className='App'>
      <Routes>

        <Route path='/' element={<HomePage/>}/> 
        <Route path='/Dashboard' element={<Dashboard/>}/> 
        <Route path='/Login' element={<Login/>}/> 
        <Route path='/Signup' element={<SignUp/>}/> 

      </Routes>

    </div>
  )
}

export default App