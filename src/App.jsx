import { Route, Routes } from 'react-router-dom'
import './App.css'
import {Login, SignUp, HomePage, Dashboard} from "./pages"
import { useDispatch } from 'react-redux'
import { checkIsLoggedIn } from './redux/ActionCreators/authActionsCreator'
import { useEffect } from 'react'
// import UploadFile from './components/DashboardComponents/Upload File/UploadFile'
import ReportMaintenance from './pages/Maintenance/ReportMaintenance'


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
        {/* <Route path='/Upload' element={<UploadFile/>}/>  */}
        <Route path='/Report Issue' element={<ReportMaintenance/>}/> 
        
      </Routes>

    </div>
  )
}

export default App