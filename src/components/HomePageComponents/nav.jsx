import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutUser } from '../../redux/ActionCreators/authActionsCreator';
import "./nav.css";

const NavigationComponent = () => {

  const {isAuthenticated , user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return <nav className='navbar navbar-expand-lg'>
    <Link className='navTitle ms-5' to='/'>TENANT HUB</Link>

    <ul className='navbar-nav ms-auto me-5'>
      {isAuthenticated ? (
        <>
        <li className='navItem'>
          <p className='my-0 mt-1 mx-2'>
          <span>Welcome, </span> 
          <span className='username'>{user.displayName}</span> 
          </p>
        </li>
        <li className='navItem'>
          <Link className='btn btn-primary btn-sm mx-2' to='/Dashboard'>Dashboard</Link>
        </li>
        <li>
          <button className='btn btn-secondary btn-sm' onClick={() => dispatch(signOutUser())}>Logout</button>
        </li>
        </>
      ) : (<>
            <li className='navItem'>
            <Link className='btn btn-primary btn-sm mx-2' to='/Login'>Login</Link>
          </li>
          <li>
            <Link className='btn btn-success btn-sm' to='/UserTypeSelection'>Sign Up</Link>

          </li>
          </>)
      }
    </ul>
  </nav>
}

export default NavigationComponent;