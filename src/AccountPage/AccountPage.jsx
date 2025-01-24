import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import './AccountPage.css';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qfjuqbuysawwhnvzmjta.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmanVxYnV5c2F3d2hudnptanRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NTU4NjQsImV4cCI6MjA1MjAzMTg2NH0.8ShCQpI4s8BQZbu4ausLCcp-9H6C4t3qy6oL9JnRJrc'  
);

const AccountPage = () => {
  const [name, setName] = useState('');  
  const [isEditing, setIsEditing] = useState(false);  
  const [userGroups, setUserGroups] = useState([]);
  const [attendeesCount, setAttendeesCount] = useState({});
  const navigate = useNavigate();

  // load saved name from local storage
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setName(savedName);
      fetchUserGroups(savedName); 
    }
  }, []);

  const fetchUserGroups = async (userName) => {
    const { data: groupIds } = await supabase
      .from('members')
      .select('group_id')
      .eq('name', userName);

    if (groupIds.length > 0) {
      const { data: groupData } = await supabase
        .from('study_groups')
        .select('*')
        .in('id', groupIds.map(item => item.group_id));

      setUserGroups(groupData);
      fetchAttendeeCounts(groupData);
    }
  };

  const fetchAttendeeCounts = async (groups) => {
    const counts = {};
    for (const group of groups) {
      const { data } = await supabase
        .from('members')
        .select('name')
        .eq('group_id', group.id);
      counts[group.id] = data.length;
    }
    setAttendeesCount(counts);
  };

  const handleNameChange = (e) => setName(e.target.value);

  const handleSaveName = () => {
    if (name.trim()) {
      localStorage.setItem('userName', name);
      setIsEditing(false);
    } else {
      alert("Please enter a valid name.");
    }
  };

  const handleLeaveGroup = async (groupId) => {
    await supabase
      .from('members')
      .delete()
      .eq('group_id', groupId)
      .eq('name', name);
    window.location.reload();
  };

  const toggleEditMode = () => setIsEditing(true);

  const goHome = () => navigate('/');  

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US');
  
  const formatTime = (time) => new Date(`1970-01-01T${time}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  return (
    <div className="account-page">
      <h1>Your Account</h1>

      <div className="name-display">
        {!isEditing ? (
          <>
            <p>Name: {name || "No name set"}</p>
            <button onClick={toggleEditMode} className="change-name-button">Change Name</button>
          </>
        ) : (
          <>
            <input type="text" value={name} onChange={handleNameChange} placeholder="Enter your name" className="name-input" />
            <button onClick={handleSaveName} className="save-name-button">Save</button>
          </>
        )}
      </div>

      <div className="user-groups">
        <h2>Your Groups</h2>
        {userGroups.length > 0 ? (
          <div className="grid-container">
            {userGroups.map((group) => (
              <div key={group.id} className="grid-item">
                <h3>{group.class_name}</h3>
                <p><strong>Location:</strong> {group.location}</p>
                <p><strong>Date:</strong> {formatDate(group.date)}</p>
                <p><strong>Time:</strong> {formatTime(group.time)}</p>
                <p><strong>People Attending:</strong> {attendeesCount[group.id] || 0}</p>
                <button onClick={() => handleLeaveGroup(group.id)} className="leave-group-button">Leave Group</button>
              </div>
            ))}
          </div>
        ) : (
          <p>You are not part of any groups yet.</p>
        )}
      </div>

      <button onClick={goHome} className="go-home-button">Back to Home</button>
    </div>
  );
};

export default AccountPage;




