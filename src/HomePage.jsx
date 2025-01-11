import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useLocation } from 'react-router-dom';
import Search from './Search';
import CreateNewButton from './CreateNewButton';
import { createClient } from '@supabase/supabase-js';

// initialize Supabase client
const supabase = createClient(
  'https://qfjuqbuysawwhnvzmjta.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmanVxYnV5c2F3d2hudnptanRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NTU4NjQsImV4cCI6MjA1MjAzMTg2NH0.8ShCQpI4s8BQZbu4ausLCcp-9H6C4t3qy6oL9JnRJrc' 
);

function HomePage() {
  const [groups, setGroups] = useState([]);
  const location = useLocation();

  // get data from supabase
  const fetchGroups = async () => {
    const { data, error } = await supabase
      .from('study_groups') // table name
      .select('*'); // Select all columns
      

    if (error) {
      console.error('Error fetching groups:', error);
      return;
    }

    // set the data as a state
    setGroups(data);
  };

  useEffect(() => {
    fetchGroups(); // command to retrieve the data
  }, []); 

  // if location state has group data, it means a new group was created
  useEffect(() => {
    if (location.state) {
      // add the new created group directly to the list
      setGroups((prevGroups) => [
        ...prevGroups,
        {
          name: location.state.name,
          class_name: location.state.className,
          location: location.state.location,
          time: location.state.time,
        },
      ]);
    }
  }, [location.state]); // run this effect only when the location state changes

  const handleJoinGroup = async (groupId) => {
    console.log('You have joined a group');
  };


  return (
    <div className="title-container"> 
      <h1>Search for Study Groups</h1> 
      <Search items={groups} /> {} 
      {groups.length > 0 ? (
        <div>
          
        </div>
      ) : (
        <p>No study groups currently available</p>
      )}

      <CreateNewButton />
    </div>
  );
}

export default HomePage;












  
