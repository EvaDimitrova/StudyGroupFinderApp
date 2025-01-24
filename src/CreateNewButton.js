import React from 'react';
import { Link } from 'react-router-dom'; 

function CreateNewButton() {
  return (
    <Link to="/CreateGroup">
      <button
      type="submit"
      style={{
       backgroundColor: '#3385D6', 
       color: 'white', 
       border: 'none',
       padding: '10px 20px', 
       textAlign: 'center',
       fontSize: '16px',
       borderRadius: '5px', 
       cursor: 'pointer', 
       width: '15%', 
     }}
     onMouseOver={(e) => e.target.style.backgroundColor = '#004282'} 
     onMouseOut={(e) => e.target.style.backgroundColor = '#3385D6'} 
      >
        Create New Group
      </button>
    </Link>
  );
}

export default CreateNewButton;
