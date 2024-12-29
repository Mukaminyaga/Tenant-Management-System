import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Dashboard } from './pages';
import SignInPage from "./pages/Auth/Login/SignInPage";
import HowItWorks from "./pages/HowItWorks";
import UserTypeSelection from "./pages/UserTypeSelection";
import LandingPage from "./pages/LandingPage";
import LogoutPage from "./pages/LogoutPage";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import { useDispatch } from 'react-redux';
import { checkIsLoggedIn } from './redux/ActionCreators/authActionsCreator';
import { useEffect } from 'react';
import ReportMaintenance from './pages/Maintenance/ReportMaintenance'
import TenantDashboard from './pages/Dashboard/TenantDashboard';
import SignUpPage from './pages/Auth/SignUp/SignUpPage';
import SendAlert from './pages/Notices';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Login" element={<SignInPage />} />
        <Route path="/SignUp" element={<SignUpPage/>} />
        <Route path="/HowItWorks" element={<HowItWorks />} />
        <Route path="/UserTypeSelection" element={<UserTypeSelection />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/LogoutPage" element={<LogoutPage />} />
        <Route path="/ResetPasswordForm" element={<ResetPasswordForm />} />
        <Route path='/Report Issue' element={<ReportMaintenance/>}/> 
        <Route path='/Send Alert' element={<SendAlert/>} />
        <Route path='/Tenant Dashboard' element={<TenantDashboard/>}/> 

      </Routes>
    </div>
  );
};

export default App;
