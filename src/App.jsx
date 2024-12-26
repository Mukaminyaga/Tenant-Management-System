import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login, SignUp, HomePage, Dashboard, SignUpTenant } from './pages';
import SignUpManager from './pages/SignUpManager'; 
import SignInPage from "./pages/SignInPage";
import HowItWorks from "./pages/HowItWorks";
import UserTypeSelection from "./pages/UserTypeSelection";
import LandingPage from "./pages/LandingPage";
import LogoutPage from "./pages/LogoutPage";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import { useDispatch } from 'react-redux';
import { checkIsLoggedIn } from './redux/ActionCreators/authActionsCreator';
import { useEffect } from 'react';
import ReportMaintenance from './pages/Maintenance/ReportMaintenance'

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
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/SignUpTenant" element={<SignUpTenant />} />
        <Route path="/SignUpManager" element={<SignUpManager />} />
        <Route path="/SignInPage" element={<SignInPage />} />
        <Route path="/HowItWorks" element={<HowItWorks />} />
        <Route path="/UserTypeSelection" element={<UserTypeSelection />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/LogoutPage" element={<LogoutPage />} />
        <Route path="/ResetPasswordForm" element={<ResetPasswordForm />} />
        <Route path='/Report Issue' element={<ReportMaintenance/>}/> 
      </Routes>
    </div>
  );
};

export default App;
