import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qfjuqbuysawwhnvzmjta.supabase.co', // supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmanVxYnV5c2F3d2hudnptanRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NTU4NjQsImV4cCI6MjA1MjAzMTg2NH0.8ShCQpI4s8BQZbu4ausLCcp-9H6C4t3qy6oL9JnRJrc' // API Key 
);

function CreateGroup() {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // insert data into Supabase
    const { data, error } = await supabase
      .from('study_groups') // table name from supabase
      .insert([
        { name, class_name: className, location, time }
      ]);

    if (error) {
      console.error('Error inserting data:', error);
      return;
    }

    // go to the home page
    navigate('/');
    
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







