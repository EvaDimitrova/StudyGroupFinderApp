import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateGroup() {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // go to homepage and pass group data as state
    navigate('/', { state: { name, className, location, time } });

    // reset the form
    setName('');
    setClassName('');
    setLocation('');
    setTime('');
  };

  return (
    <div>
      <h1>Create a Study Group</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Class</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Group</button>
      </form>
    </div>
  );
}

export default CreateGroup;




