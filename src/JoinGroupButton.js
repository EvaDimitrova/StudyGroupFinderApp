import React from 'react';
import { Link } from 'react-router-dom';

function JoinGroupButton({ groupId }) {
  return (
    <Link to={`/InformationPage/${groupId}`}>
      <button>Join</button>
    </Link>
  );
}

export default JoinGroupButton;
