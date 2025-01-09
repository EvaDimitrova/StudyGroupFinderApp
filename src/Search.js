import React, { useState } from 'react';

function Search({ items }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search groups" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;