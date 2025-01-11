import React, { useState } from 'react';
import JoinGroupButton from './JoinGroupButton';

function Search({ items }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter((item) => {
    return (
      item.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||    
      item.time.toLowerCase().includes(searchTerm.toLowerCase())           
    );
  });

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search groups" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      {filteredItems.length > 0 ? (
        <ul>
          {filteredItems.map((item) => (
            <li key={item.id}>
              <h3>{item.class_name}</h3>
              <p><strong>People Attending:</strong> {item.name}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Time:</strong> {item.time}</p>
              <JoinGroupButton groupId = {item.id}/>
            </li>
          ))}
        </ul>
      ) : (
        <p>No study groups found for your search</p>
      )}
    </div>
  );
}

export default Search;


