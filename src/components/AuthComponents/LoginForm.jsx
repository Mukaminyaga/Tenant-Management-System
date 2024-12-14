// src/components/LoginForm/LoginForm.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../redux/ActionCreators/authActionsCreator';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const [success, setSuccess] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    // Dispatch sign-in action
    dispatch(signInUser(email, password, setSuccess));
  };

  React.useEffect(() => {
    if (success) {
      navigate("/dashboard");  // Navigate to the Dashboard after successful login
    }
  }, [success, navigate]);

  return (
    <form onSubmit={handleSubmit}>
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
      <button type='submit' className='btn btn-primary my-2 form-control'>Login</button>
    </form>
  );
};

export default LoginForm;
