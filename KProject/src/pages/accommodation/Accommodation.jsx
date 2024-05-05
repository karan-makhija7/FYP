
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material'
import { Redirect } from 'react-router-dom';

import Sidebar from "../../components/sidebar/Sidebar";



import { upload } from '../../firebase'
import { Photo } from '@mui/icons-material';

const Accomodation = () => {
  const { currentUser } = useAuth();
  const db = firebase.firestore();
  const [message, setMessage] = useState('');

  // variable location, rent andtype looking for are used to describe the accommodation post
  const [location, setLocation] = useState('');
  const [rent , setRent]= useState('');
  const [ lookingFor, setLookingFor]= useState('Flat');

  const [ photo, setPhoto]=useState('');
  
  const [messages, setMessages] = useState([]);
  const [lastPostId, setLastPostId] = useState('');


  useEffect(() => {
    const unsubscribe = db.collection('messages').orderBy('rent', 'desc').onSnapshot(snapshot => {
      const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesData);
      if (messagesData.length > 0) {
        setLastPostId(messagesData[0].id);
      }
    });
    return unsubscribe;
  }, [db]);
  
  
  
  const handlePost = async (e) => {
  e.preventDefault();
  try {
  const userProfileRef = db.collection('userProfiles').doc(currentUser.uid);
  const userProfile = await userProfileRef.get();
  const userName = userProfile.get('name');
  await db.collection('messages').add({
    userId: currentUser.uid,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    location: location,
    rent: parseFloat(rent), // Convert rent to a number
    lookingFor: lookingFor,
    message: message,
    userName: userName
  });
  
  setMessage('');
  window.location.reload(); 
  } catch (error) {
  console.error(error);
  }
  };
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <p></p>
      <h1>ACCOMMODATION</h1>
      <p></p>
      <form onSubmit={handlePost}>
        <TextField
          variant="outlined"
          label="Post a message"
          fullWidth
          multiline
          rows={4}
          value={message}
          style={{ width: '50%' }}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p></p>
        <TextField
          variant="outlined"
          label="Location"
         
          multiline
          rows={1}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <p></p>
   <TextField
  type="number"
  variant="outlined"
  label="Rent"
  rows={1}
  value={rent}
  step="1"
  onChange={(e) => setRent(e.target.value)}
/>
<p></p>


<label >Looking for:</label>
&nbsp;
<select id="lookingFor" value={lookingFor} onChange={(e) => setLookingFor(e.target.value)}>
  <p></p>
          <option value="Roommate">Roommate</option>
          <option value="Flat">Flat</option>
          </select>


<p></p>
        <Button variant="contained" color="primary" type="submit">
          Post
        </Button>
      </form>
      <p></p>
     
&nbsp; Note: You must create a profile before posting anything


      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Rent</TableCell>
              <TableCell>Looking for</TableCell>
              <TableCell>Message</TableCell>
              

            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.date.toDate().toLocaleString()}</TableCell>
                <TableCell>{message.userName}</TableCell>
                <TableCell>{message.location}</TableCell>
                <TableCell>{message.rent}</TableCell>
                <TableCell>{message.lookingFor}</TableCell>
                <TableCell>{message.message}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div >
        <div id={lastPostId} />
      </div>
    </div>
    </div>
  );
};

export default Accomodation;