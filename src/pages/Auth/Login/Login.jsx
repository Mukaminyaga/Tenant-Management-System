import React from 'react'
import LoginForm from '../../../components/AuthComponents/LoginForm'
import { Link } from 'react-router-dom'
import "./Login.css"

const Login = () => {
  return (
    <div className='Container-fluid'>
      <Link className='mx-5' to="/">Home</Link>
        <h1 className='display-1 text-center'>Login</h1>
        <div className='row'>
            <div className='col-md-5 mx-auto'>
                <LoginForm />
                <Link to='/Signup' className='small mx-4'>Don't have an account yet? Sign Up</Link>
            </div>
        </div>
    </div>
  )
}

export default Login