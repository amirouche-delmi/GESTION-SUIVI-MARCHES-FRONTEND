import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DiscussionPanel from './DiscussionPanel';
import SearchIcon from '@mui/icons-material/Search';
import './Messages.scss';
import { useSelector } from 'react-redux';

function Messages() {
  const userData = useSelector((state) => state.userReducer);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user`);
        setUsers(response.data.filter(user => user._id !== userData._id));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [filteredUsers]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredUsers = users.filter(user => user.nom.toLowerCase().includes(searchTerm));
    setFilteredUsers(filteredUsers);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className='messages-page'>
      <h2>Envoyer un Message</h2>
      <div className='content'>
        <div className="user-list">
          <h3>Utilisateurs</h3>
          <div className="search-input">
            <SearchIcon />
            <input type="text" placeholder="Rechercher un utilisateur..." onChange={handleSearch} />
          </div>  
          <ul>
            {searchTerm === '' ? (
              users.map(user => (
                <li key={user.id} onClick={() => handleUserClick(user)}>{user.nom}</li>
              ))
            ) : (
              filteredUsers.map(user => (
                <li key={user.id} onClick={() => handleUserClick(user)}>{user.nom}</li>
              ))
            )}
          </ul>        
        </div>
          <DiscussionPanel selectedUser={selectedUser} />
      </div>      
    </div>
  );
}

export default Messages;
