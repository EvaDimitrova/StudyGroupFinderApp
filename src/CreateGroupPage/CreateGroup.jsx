import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './CreateGroup.css'; 

const supabase = createClient(
  'https://qfjuqbuysawwhnvzmjta.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmanVxYnV5c2F3d2hudnptanRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NTU4NjQsImV4cCI6MjA1MjAzMTg2NH0.8ShCQpI4s8BQZbu4ausLCcp-9H6C4t3qy6oL9JnRJrc' 
);

function CreateGroup() {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate input from user
    if (!name || !className || !location || !time || !date || !phoneNumber) {
      alert('Please fill in all fields.');
      return;
    }

    // insert data into Supabase
    const { data, error } = await supabase
      .from('study_groups') // table name from supabase
      .insert([
        { name, class_name: className, location, time, date, phone_number: phoneNumber }
      ]);

    if (error) {
      console.error('Error inserting data:', error);
      return;
    }

    // go to the home page after group creation
    navigate('/');
    
    // reset the form
    setName('');
    setClassName('');
    setLocation('');
    setTime('');
    setDate('');
    setPhoneNumber('');
  };

  return (
    <div className="create-group-container">
      <h1>Create a Study Group</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="form-input"
            placeholder=" +1 123-456-7890"
          />
        </div>

        <div className="form-group">
          <label>Class</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Group Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
            type="time"   
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">Create Group</button>
      </form>

      
      <button 
        onClick={() => navigate('/')}
        className="blue-button"
      >
        Back to Home
      </button>
    </div>
  );
}

export default CreateGroup;










