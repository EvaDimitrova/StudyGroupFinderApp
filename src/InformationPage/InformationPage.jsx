import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { createClient } from '@supabase/supabase-js';
import './InformationPage.css'; 

const supabase = createClient(
  'https://qfjuqbuysawwhnvzmjta.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmanVxYnV5c2F3d2hudnptanRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NTU4NjQsImV4cCI6MjA1MjAzMTg2NH0.8ShCQpI4s8BQZbu4ausLCcp-9H6C4t3qy6oL9JnRJrc' 
);

const InformationPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [isJoined, setIsJoined] = useState(false);

  // check if user has stored a name and display associated information
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      setMessage('Please set your name in the account page.');
    }

    fetchGroup();
    fetchAttendees();
  }, [groupId]);

  // check if user is already a member when userName changes
  useEffect(() => {
    if (userName) {
      checkIfUserJoined();
    }
  }, [userName, groupId]);

  // get information for a specific group
  const fetchGroup = async () => {
    const { data, error } = await supabase
      .from('study_groups')
      .select('*')
      .eq('id', groupId)
      .single();

    if (error) {
      console.error('Error fetching group data:', error);
    } else {
      setGroup(data);
    }
  };

  // get information on the people attending
  const fetchAttendees = async () => {
    const { data, error } = await supabase
      .from('members')
      .select('name')
      .eq('group_id', groupId);

    if (error) {
      console.error('Error fetching members:', error);
    } else {
      setAttendees(data);
    }
  };

  // check if user has already joined the group
  const checkIfUserJoined = async () => {
    const { data, error } = await supabase
      .from('members')
      .select('name')
      .eq('group_id', groupId)
      .eq('name', userName)
      .single();

    if (data) {
      setIsJoined(true);
    } else if (error) {
      console.error('Error checking if user is a member:', error);
    } else {
      setIsJoined(false);  // user not found, so set to false
    }
  };

  const handleJoinGroup = async () => {
    if (!userName.trim()) {
      setMessage('Please set your name in the account page.');
      return;
    }

    if (isJoined) {
      setMessage('You have already joined this group.');
      return;
    }

    const { error } = await supabase
      .from('members')
      .insert([{ name: userName, group_id: groupId }]);

    if (error) {
      setMessage('Error joining group: ' + error.message);
    } else {
      setMessage('You have successfully joined the group!');
      setIsJoined(true);
      fetchAttendees();
    }
  };

  // leave a group
  const handleLeaveGroup = async () => {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('group_id', groupId)
      .eq('name', userName);

    if (error) {
      setMessage('Error leaving group: ' + error.message);
    } else {
      setMessage('You have left the group.');
      setIsJoined(false);
      fetchAttendees();
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US');
  const formatTime = (time) => new Date(`1970-01-01T${time}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  if (!group) {
    return <p>Loading group information...</p>;
  }

  return (
    <div className="page-container">
      <div className="content-container">
        <h1>Group Information</h1>
        <h2>{group.class_name}</h2>
        <p><strong>Group Leader:</strong> {group.name}</p>
        <p><strong>Phone Number:</strong> {group.phone_number}</p>
        <p><strong>Location:</strong> {group.location}</p>
        <p><strong>Date:</strong> {formatDate(group.date)}</p>
        <p><strong>Time:</strong> {formatTime(group.time)}</p>

        <h3>People Attending</h3>
        {attendees.length > 0 ? (
          <ul>
            {attendees.map((attendee, index) => (
              <li key={index}>{attendee.name}</li>
            ))}
          </ul>
        ) : (
          <p>No one has joined yet.</p>
        )}

        {isJoined ? (
          <button onClick={handleLeaveGroup} className="leave-button">Leave Group</button>
        ) : (
          <>
            <h3>Join this Group</h3>
            <button onClick={handleJoinGroup} className="join-button">Join Group</button>
          </>
        )}

        {message && <p>{message}</p>}

        <button onClick={() => navigate('/')} className="back-button">Back to Home</button>
      </div>
    </div>
  );
};

export default InformationPage;





