import React from 'react'
import SignUpForm from '../../../components/AuthComponents/SignUpForm'
import { Link } from 'react-router-dom'
import "./Signup.css"

const SignUp = () => {
  return (
    <div className='Container-fluid'>
    <Link className='text-light mx-5' to="/">Home</Link>
    <h1 className='display-1 text-center'>Sign Up</h1>
    <div className='row'>
         <div className='col-md-5 mx-auto'>
             <SignUpForm/>
              <Link to='/Login' className='small mx-4'>Already have an account? Login here.</Link>
         </div>
    </div>
    </div>
  )
}

export default SignUp