import React from 'react'
import LoginForm from '../../../components/AuthComponents/LoginForm'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='Container-fluid'>
        <h1 className='display-1 my-5 text-center'>Login</h1>
        <div className='row'>
            <div className='col-md-5 mx-auto'>
                <LoginForm />
                <Link to='/Signup' className='small ms-auto'>Sign Up</Link>
            </div>
        </div>
    </div>
  )
}

export default Login