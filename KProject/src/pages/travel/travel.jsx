import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuth } from '../../contexts/AuthContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material'
import { Redirect } from 'react-router-dom';
import './travel.css'

const Travel = () => {
const { currentUser } = useAuth();
const db = firebase.firestore();
const [message, setMessage] = useState('');
const [date, setDate] = useState('');
const [pickUpLocation, setPickUpLocation] = useState('');
const [dropLocation, setDropLocation] = useState('');
const [messages, setMessages] = useState([]);
const [lastPostId, setLastPostId] = useState('');

useEffect(() => {
const removeUser = db.collection('Travel').orderBy('date', 'desc').onSnapshot(snapshot => {
   const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
   setMessages(messagesData);
   if (messagesData.length > 0) {
   setLastPostId(messagesData[0].id);
   }
   });
   return removeUser;
}, [db]);

 const handlePost = async (e) => {
   e.preventDefault();
   try {
   const userProfileRef = db.collection('userProfiles').doc(currentUser.uid);
   const userProfile = await userProfileRef.get();
   const userName = userProfile.get('name');
   await db.collection('Travel').add({
   serId: currentUser.uid,
   date: firebase.firestore.Timestamp.fromDate(new Date(date)),

   pickUpLocation: pickUpLocation,
   dropLocation: dropLocation,
   message: message,
   userName: userName
   });
   setMessage('');
   setDate('');
   setPickUpLocation('');
   setDropLocation('');
   window.location.reload();
   } catch (error) {
   console.error(error);
   }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer" >
<p></p>
<h1>TRAVEL</h1>
<form onSubmit={handlePost}>
<TextField
variant="outlined"
label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
/>
<p></p>

       <TextField
       variant="outlined"
       label="Pick up location"
       value={pickUpLocation}
       onChange={(e) => setPickUpLocation(e.target.value)}
       />
       <p></p>
   <TextField
       variant="outlined"
       label="Drop location"
       value={dropLocation}
       onChange={(e) => setDropLocation(e.target.value)}
       />

      <p></p>

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

      
  <Button variant="contained" color="primary" type="submit">
    Post
  </Button>
  <p></p>
Note: You must create a profile before posting anything
      </form>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date of travel</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Pick up location</TableCell>
              <TableCell>Drop location</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{new Date(message.date.toDate()).toLocaleDateString()}</TableCell>
<TableCell>{message.userName}</TableCell>
<TableCell>{message.pickUpLocation}</TableCell>
<TableCell>{message.dropLocation}</TableCell>
<TableCell>{message.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'none' }}>
        <div id={lastPostId} />
      </div>
    </div>
  </div>
);
};

export default Travel;

