import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useLocation, Link } from 'react-router-dom';
import Search from './Search';
import CreateNewButton from './CreateNewButton';

const items = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  
];

function HomePage() {
  // store the groups in state
  const [groups, setGroups] = useState([]);

  const location = useLocation();
  const { name, className, location: groupLocation, time } = location.state || {};

  // when the location state changes, add to array
  useEffect(() => {
    if (name && className && groupLocation && time) {
      setGroups((prevGroups) => [
        ...prevGroups,
        { name, className, groupLocation, time },
      ]);
    }
  }, [name, className, groupLocation, time]);

  return (
    <div className="title-container">
      <h1>Search for Study Groups</h1>
      <Search items={items} />

      {groups.length > 0 ? (
        <div>
          <h2>Available Study Groups:</h2>
          {groups.map((group, index) => (
            <div key={index}>
              <h3>{group.className}</h3>
              <p><strong>People Attending:</strong> {group.name}</p>
              <p><strong>Location:</strong> {group.groupLocation}</p>
              <p><strong>Time:</strong> {group.time}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No study groups currently available</p>
      )}

      <CreateNewButton />
    </div>
  );
}

export default HomePage;








  
