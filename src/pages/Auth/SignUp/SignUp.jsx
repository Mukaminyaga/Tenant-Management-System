import React from 'react'
import SignUpForm from '../../../components/AuthComponents/SignUpForm'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='Container-fluid'>
    <h1 className='display-1 my-5 text-center'>Sign Up</h1>
    <div className='row'>
         <div className='col-md-5 mx-auto'>
             <SignUpForm/>
              <Link to='/Login' className='small ms-auto'>Login</Link>
         </div>
    </div>
    </div>
  )
}

export default SignUp