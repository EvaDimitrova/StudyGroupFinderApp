import React from 'react';
import { Link } from 'react-router-dom';

function JoinGroupButton({ groupId }) {
  return (
    <Link to={`/information/${groupId}`}>
      <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Join
      </button>
    </Link>
  );
}

export default JoinGroupButton;



