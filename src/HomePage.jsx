import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useLocation, Link } from 'react-router-dom';  
import Search from './HomePage/Search';
import CreateNewButton from './CreateNewButton';
import { createClient } from '@supabase/supabase-js';
import { CiSearch } from "react-icons/ci";

const supabase = createClient(
  'https://qfjuqbuysawwhnvzmjta.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmanVxYnV5c2F3d2hudnptanRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NTU4NjQsImV4cCI6MjA1MjAzMTg2NH0.8ShCQpI4s8BQZbu4ausLCcp-9H6C4t3qy6oL9JnRJrc' 
);

function HomePage() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const fetchGroups = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('study_groups')
      .select('*');

    if (error) {
      console.error('Error fetching groups:', error);
    } else {
      setGroups(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="title-container">
      <Link to="/account">
        <button className="account-button">Account</button>
      </Link>
      <h1>Search for Study Groups</h1>
      
      <Search items={groups} />

      {groups.length > 0 ? (
        <div>{}</div>
      ) : (
        <p>No study groups currently available</p>
      )}

      <CreateNewButton />
    </div>
  );
}

export default HomePage;















  
