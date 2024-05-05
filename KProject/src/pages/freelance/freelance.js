import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuth } from '../../contexts/AuthContext'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material'

const Freelance = () => {
  const { currentUser } = useAuth();
  const db = firebase.firestore();
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');

  const [role, setRole] = useState('');
  const [pay,setPay] = useState('');
  const [time, setTime] = useState('');
  const [unit, setUnit] = useState('Hours');
  const [messages, setMessages] = useState([]);
  const [lastPostId, setLastPostId] = useState('');
  

  useEffect(() => {
    const removeUser = db.collection('Freelance').orderBy('date', 'desc').onSnapshot(snapshot => {
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
      console.log('Submitting form'); // Add this line
      const userProfileRef = db.collection('userProfiles').doc(currentUser.uid);
      const userProfile = await userProfileRef.get();
      const userName = userProfile.get('name');
      console.log('User profile fetched:', userName); // Add this line
      const newDoc = {
        userName: userName,
        userId: currentUser.uid,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        role: role,
        pay: pay,
        time: time,
        unit:unit,
        message:message,
      };
      console.log('New document:', newDoc); // Add this line
      await db.collection('Freelance').add(newDoc);
  
      setMessage('');
      setPay('');
      setTime('');
      setUnit('');
      setRole('');

    } catch (error) {
      console.error('Error submitting form:', error); // Add this line
    }
  };
  
 


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">

      <h1>FREELANCING</h1>
      <form onSubmit={handlePost}>
        <TextField
          variant="outlined"
          label="Role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        
        <p></p>
        
        <TextField
          variant="outlined"
          label="Total Pay"
          type="number"
          required
          InputProps={{
            inputProps: { min: 0, step: 0.01 },
            startAdornment:<div>£&nbsp;</div>// Add this line
          }}
          value={pay}
          onChange={(e) => setPay(e.target.value)}
        />
        

      <p></p>
      
      <TextField
          variant="outlined"
          label="time"
          type="number"
          value={time}
          
          onChange={(e) => setTime(e.target.value)}
        />
        &nbsp;
        <select  value={unit} onChange={(e) => setUnit(e.target.value)} >
  
          <option value="Hours">Hour</option>
          <option value="Days">Days</option>
          </select>
          <p></p>
          
          <TextField
          variant="outlined"
          label="Job description"
          type="text"
          value={message}
          
          onChange={(e) => setMessage(e.target.value)}
        />
        <p></p>
        <Button variant="contained" color="primary" type="submit">
          Post
        </Button>
      </form>

      <p></p>
      &nbsp; Note: You must create a profile before posting a question.
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Total Pay</TableCell>
              <TableCell>Contract length</TableCell>
              <TableCell>Job description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {messages.map((message) => (
    <TableRow key={message.id}>
      <TableCell>{message.userName}</TableCell>
      <TableCell>{message.date.toDate().toLocaleString()}</TableCell>
      <TableCell>{message.role}</TableCell>
      <TableCell>£{message.pay}</TableCell> {/* Add the "£" symbol here */}
      <TableCell>{message.time} {message.unit}</TableCell>
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
   
   
   export default Freelance;
   


