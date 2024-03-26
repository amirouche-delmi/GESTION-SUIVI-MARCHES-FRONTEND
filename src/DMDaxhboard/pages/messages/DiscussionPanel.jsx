import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; 
import SendIcon from '@mui/icons-material/Send';
import { formatDate } from '../../../utils/utils';
import DeleteIcon from '@mui/icons-material/Delete';

const DiscussionPanel = ({ selectedUser }) => {
  const [room, setRoom] = useState({});
  const userData = useSelector((state) => state.userReducer);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); 

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/room`, {
          user1ID: userData._id,
          user2ID: selectedUser._id
        });
        setRoom(response.data);
        if (response.data.messages) {
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };
  
    const interval = setInterval(fetchRoom, 1000); 
  
    return () => clearInterval(interval);
  }, [userData._id, selectedUser._id]);
  

  const handleMessageChange = (event) => {
    setMessageInput(event.target.value);
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/room/message`, {
        roomID: room._id,
        senderID: userData._id,
        receiverID: selectedUser._id,
        content: messageInput
      });
      setMessages(response.data.room.messages);
      setMessageInput('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  const deleteMessage = async (messageId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/room/message/${messageId}`,  {
        data: { roomId: room._id }
      });
      if (response.status === 200) {
        setMessages(messages.filter(message => message._id !== messageId));
        scrollToBottom();
      } else {
        console.error('Error deleting message:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  useEffect(() => {
    scrollToBottom(); 
  }, [messages]);
  
  return (
    <div className='discussion-panel'>
      <h3>Discussion avec {selectedUser.nom}</h3>
      <div className='messages-container'>
        <ul className='messages-list'>
            {messages.map((message) => (
                <li key={message._id} className={`message ${message.senderID === userData._id ? 'sent' : 'received'}`}>
                {message.senderID === userData._id && (
                    <button onClick={() => deleteMessage(message._id)}><DeleteIcon className='delete-button'/></button>
                )}
                <div className="message-container">
                    <span className='message-timestamp'>{formatDate(new Date(message.timestamp))}</span>
                    <div className="message-content-wrapper">
                    {message.senderID === userData._id ? <FaArrowRight className='message-icon' /> : <FaArrowLeft className='message-icon' />}
                    <span className='message-content'>{message.content}</span>
                    </div>
                </div>
                </li>
            ))}
            <div ref={messagesEndRef} />
        </ul>
        <div className='message-input-container'>
          <input
            type="text"
            placeholder="Tapez votre message..."
            value={messageInput}
            onChange={handleMessageChange}
            onKeyPress={(event) => event.key === 'Enter' && sendMessage()}
            className='message-input'
          />
          <button onClick={sendMessage} className='send-button'><SendIcon className='message-icon'/></button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPanel;
