import React, { useState, useEffect } from 'react';

function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch('http://localhost:5000/members');
      const data = await response.json();
      setMembers(data);
      setLoading(false);
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Members List</h2>
      <ul>
        {members.map((member) => (
          <li key={member.m_id}>
            {member.m_name} - {member.email} - Joined: {member.joinedyear}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Members;
