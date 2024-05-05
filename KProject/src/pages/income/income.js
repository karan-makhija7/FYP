import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext"

import firebase from "firebase/compat/app"
import 'firebase/compat/firestore'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material'
import './income.css'
import Sidebar from "../../components/sidebar/Sidebar";






function Income() {
const db = firebase.firestore();
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [inflows, setInflows] = useState([]);
  const [name, setName] = useState("");
  const [name1, setName1] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentmethod, setPaymentMethod] = useState("");
  const [amount1, setAmount1] = useState("");
  const [balance, setBalance] = useState(null);
  const [newBalance, setNewBalance] = useState("");





  useEffect(() => {
    // Retrieve the user's balance from Firestore
    const unsubscribe = db
      .collection("balances")
      .doc(currentUser.uid)
      .onSnapshot((doc) => {
        setBalance(doc.data()?.balance);
      });

    return unsubscribe;
  }, [currentUser]);

  

  useEffect(() => {
    // Retrieve the user's expenses from Firestore
    const unsubscribe = db
      .collection("inflows")
      .where("userId", "==", currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const inflowData = [];
        querySnapshot.forEach((doc) => {
          inflowData.push({ id: doc.id, ...doc.data() });
        });
        setInflows(inflowData);
      });

    return unsubscribe;
  }, [currentUser]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add the expense to Firestore
      await db.collection("expenses").add({
        userId: currentUser.uid,
        name,
        amount: Number(amount),
        date: firebase.firestore.Timestamp.fromDate(new Date()), // add the current date
        paymentmethod // set the payment method to "Cash" - you can change this to a variable or input field if you want

      });
setPaymentMethod("")
      setName("");
      setAmount("");
    } catch (error) {
      console.log(error);
    }
  };


  const handleFormSubmit2 = async (event) => {
    event.preventDefault();

    try {
      // Add the expense to Firestore
      await db.collection("inflows").add({
        userId: currentUser.uid,
        name1,
        amount1: Number(amount1),
      });

      setName1("");
      setAmount1("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit1 = async (event) => {
    event.preventDefault();

    try {
      // Update the user's balance in Firestore
      await db.collection("balances").doc(currentUser.uid).set(
        {
          balance: Number(newBalance),
        },
        { merge: true }
      );
      
      setNewBalance("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      // Delete the expense from Firestore
      await db.collection("expenses").doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDeleteExpense1 = async (id) => {
    try {
      // Delete the expense from Firestore
      await db.collection("inflows").doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };


  const totalExpenses = expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

 const totalInflows = inflows.reduce((total, inflow) => {
    return total + inflow.amount1;
  }, 0);

  const remainingBalance = totalInflows - totalExpenses;

  //console.log(totalExpenses)
  //console.log(remainingBalance)




  return (
  <div className="home">
      
    <Sidebar />

    <div className="homeContainer" >
    <h2 id="balance">Balance: £{remainingBalance}</h2>
      <div className="income">
        
    <div className="container1">
    <h1>Enter Your Income</h1>
    <p></p>
    <form>
      <label for="income">Source of Income:</label>
      <input 
      type="text"
      id="income"
      />
      <p></p>
      <label for="amount">Amount:</label>
      <input
      type="number" id="incomeAmount"
      name="income"
     min="0" 
      step="0.01"
      />
      <p></p>

      <button type="submit">Submit</button>
    </form>

  </div>
  </div>
 
  <TableContainer component={Paper} style= {{ marginTop: '20px', width: '50%', margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Source of income</TableCell>
              <TableCell>Amount</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
  {inflows.map((inflow) => (
    <TableRow key={inflow.id}>
      <TableCell>{inflow.name1} </TableCell>
      <TableCell>£{inflow.amount1} </TableCell>
    </TableRow>
  ))}
</TableBody>


   </Table>
   </TableContainer>
 
  </div>
  
</div>




  )
}

export default Income;