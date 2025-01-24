import React, { useState, useEffect } from 'react';
import JoinGroupButton from './JoinGroupButton';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qfjuqbuysawwhnvzmjta.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmanVxYnV5c2F3d2hudnptanRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NTU4NjQsImV4cCI6MjA1MjAzMTg2NH0.8ShCQpI4s8BQZbu4ausLCcp-9H6C4t3qy6oL9JnRJrc' 
);

function Search({ items }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [attendeesCount, setAttendeesCount] = useState({});

  // function to get the number of attendees for a group
  const fetchAttendeeCount = async (groupId) => {
    const { data, error } = await supabase
      .from('members')
      .select('name')
      .eq('group_id', groupId);

    if (error) {
      console.error('Error fetching attendees:', error);
      return 0; 
    }

    return data.length;
  };

  useEffect(() => {
    const fetchCounts = async () => {
      const counts = {};
      for (const group of items) {
        const count = await fetchAttendeeCount(group.id);
        counts[group.id] = count; 
      }
      setAttendeesCount(counts); 
    };

    if (items.length > 0) {
      fetchCounts(); 
    }
  }, [items]); 

  const filteredItems = items.filter((item) => {
    return (
      item.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.date && item.date.toLowerCase().includes(searchTerm.toLowerCase())) 
    );
  });

  // format date
  const formatDate = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('en-US');
  };

  // format time
  const formatTime = (time) => {
    if (!time) return '';
    const formattedTime = new Date(`1970-01-01T${time}:00`);
    return formattedTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search groups..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px', width: '70%' }}
      />

      {filteredItems.length > 0 ? (
        <div className="grid-container">
          {filteredItems.map((item) => (
            <div key={item.id} className="grid-item">
              <h3>{item.class_name}</h3>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Date:</strong> {formatDate(item.date)}</p>
              <p><strong>Time:</strong> {formatTime(item.time)}</p>

              <p>
                <strong>People Attending:</strong> {attendeesCount[item.id] + 1|| 0}
              </p>

              <JoinGroupButton groupId={item.id} />
            </div>
          ))}
        </div>
      ) : (
        <p>No study groups found for your search</p>
      )}
    </div>
  );
}

export default Search;






