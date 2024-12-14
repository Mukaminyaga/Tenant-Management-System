import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const isLoggedIn = useSelector( state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  //Restric user access
  useEffect(() => {
    if (!isLoggedIn){
      navigate("/Login");
    }
  },[])

  return (
    <h1 className='display-1'>Welcome to Tenant Hub</h1>
  )
}

export default Dashboard