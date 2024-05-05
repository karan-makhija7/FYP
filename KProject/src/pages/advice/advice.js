
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuth } from '../../contexts/AuthContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material'

const Advice = () => {
  const { currentUser } = useAuth();
  const db = firebase.firestore();

  const [question, setQuestion] = useState('');

  const [answer, setAnswer] = useState('');
  
  
  const [messages, setMessages] = useState([]);
  const [lastPostId, setLastPostId] = useState('');
  const [editing, setEditing] = useState({ status: false, messageId: null });

  useEffect(() => {
    const unsub = db.collection('Advice').orderBy('date', 'desc').onSnapshot(snapshot => {
      const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesData);
      if (messagesData.length > 0) {
        setLastPostId(messagesData[0].id);
      }
    });
    return unsub;
  }, [db]);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const userProfileRef = db.collection('userProfiles').doc(currentUser.uid);
      const userProfile = await userProfileRef.get();
      const userName = userProfile.get('name');

      if (editing.status) {
        await db.collection('Advice').doc(editing.messageId).update({
          answer: answer,
          editedBy: currentUser.uid
        });
        setAnswer('');
        setEditing({ status: false, messageId: null });
      } else {
        await db.collection('Advice').add({
          userId: currentUser.uid,
          date: firebase.firestore.FieldValue.serverTimestamp(),
          question: question,
          answer: answer,
          userName: userName
        });
        setAnswer('');
        setQuestion('');
        window.location.reload(); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (messageId, currentMessage) => {
    setEditing({ status: true, messageId: messageId });
    setAnswer(currentMessage);
  };


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">

      <h1>ADVICE</h1>
      <form onSubmit={handlePost}>
        <TextField
          variant="outlined"
          label="Ask a question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <p></p>
        

    

      <p></p>

        <Button variant="contained" color="primary" type="submit">
          Post
        </Button>
      </form>
      <p></p>
      &nbsp; Create a profile before posting a question
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Question</TableCell>
              
              <TableCell>Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
      {messages.map((messageData) => (
        <TableRow key={messageData.id}>
          <TableCell>{messageData.date.toDate().toLocaleString()}</TableCell>
          <TableCell>{messageData.userName}</TableCell>
          <TableCell>{messageData.question}</TableCell>
          <TableCell>
            {editing.status && editing.messageId === messageData.id ? (
              <TextField
                variant="outlined"
                label="Edit Message"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            ) : (
              messageData.answer
            )}
          </TableCell>
          <TableCell>
            {editing.status && editing.messageId === messageData.id ? (
     <Button variant="contained" color="primary" onClick={handlePost}>
     Save
   </Button>
   ) : (
     <Button variant="contained" color="primary" onClick={() => handleEdit(messageData.id, messageData.answer)}>
       Post/Edit
     </Button>
   )}
   </TableCell>
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
   
   export default Advice;
   



