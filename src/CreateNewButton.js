import React from 'react';
import { Link } from 'react-router-dom'; 

function CreateNewButton() {
  return (
    <Link to="/CreateGroup">
      <button>Create New Group</button>
    </Link>
  );
}
export default CreateNewButton;
