import React from 'react'
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/ActionCreators/authActionsCreator';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [confirmPassword,setConfirmPassword] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if(!name || !email || !password || !confirmPassword){
      alert ("Please fill in all fields!");
      return;}
  
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }      

      dispatch(signUpUser(name,email,password, setSuccess));
    };
    React.useEffect(() => {
      if (success){
        navigate("/Dashboard")
      }
    },[success])
  return (
    <form onSubmit={handleSubmit}>
    <div className='form-group my-2'>
      <input 
        type='text' 
        name='name' 
        className='form-control' 
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div className='form-group my-2'>
      <input 
        type='email' 
        name='email' 
        className='form-control' 
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className='form-group my-2'>
    <input 
      type='password' 
      name='password' 
      className='form-control' 
      placeholder='Password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    </div>
    <div className='form-group my-2'>
      <input 
        type='password' 
        name='confirmPassword' 
        className='form-control' 
        placeholder='Confirm Password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
  <button type='submit' className='btn btn-primary my-2 form-control'>Sign Up</button>
  </form>
  )
}

export default SignUpForm