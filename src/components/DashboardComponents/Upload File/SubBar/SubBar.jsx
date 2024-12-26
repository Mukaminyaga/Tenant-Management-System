import React from 'react'
import './SubBar.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

const SubBar = (setIsUploadFileModalOpen) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (link, id) => {
    navigate(link);
    dispatch(changeFolder(id));
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-white px-4 mt-2'>
        <p className='small'>filters</p>

        <ul className='navbar-nav ms-auto'>
            <li className='nav-item mx-2'>
            <button 
              className='btn btn-outline-dark mx-2'
              onClick={() => setIsUploadFileModalOpen(true)}>
                Upload File
            </button>
            </li>
        </ul>
    </nav>
  )
}

export default SubBar