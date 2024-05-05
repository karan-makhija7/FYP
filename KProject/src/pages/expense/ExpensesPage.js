import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext"

import firebase from "firebase/compat/app"
import 'firebase/compat/firestore'
import './expense.css'
import Sidebar from "../../components/sidebar/Sidebar";
import { Form, Button, Card, Alert } from "react-bootstrap"




function ExpensesPage() {
  
const db = firebase.firestore();
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [inflows, setInflows] = useState([]);
  const [name, setName] = useState("");
  const [name1, setName1] = useState("");
  const [amount, setAmount] = useState("");

  const [amount1, setAmount1] = useState("");
  const [balance, setBalance] = useState(null);
  const [newBalance, setNewBalance] = useState("");
  const [paymentmethod, setPaymentMethod] = useState("debit card");

  useEffect(() => {
    // Retrieve the user's balance from Firestore
    const unsub = db
      .collection("balances")
      .doc(currentUser.uid)
      .onSnapshot((doc) => {
        setBalance(doc.data()?.balance);
      });

    return unsub;
  }, [currentUser]);

  useEffect(() => {
    // Retrieve the user's expenses from Firestore
    const unsub = db
      .collection("expenses")
      .where("userId", "==", currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const expensesData = [];
        querySnapshot.forEach((doc) => {
          expensesData.push({ id: doc.id, ...doc.data() });
        });
        setExpenses(expensesData);
      });

    return unsub;
  }, [currentUser]);

  useEffect(() => {
    // Retrieve the user's expenses from Firestore
    const unsub = db
      .collection("expenses")
      .where("userId", "==", currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const inflowData = [];
        querySnapshot.forEach((doc) => {
          inflowData.push({ id: doc.id, ...doc.data() });
        });
        setInflows(inflowData);
      });

    return unsub;
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
    return total + parseFloat(expense.amount);
  }, 0);
  
  const totalInflows = inflows.reduce((total, inflow) => {
    return total + parseFloat(inflow.amount1);
  }, 0);
  

  const remainingBalance = totalInflows - totalExpenses;

  console.log(totalExpenses)
  console.log(remainingBalance)


















  const [users, setUsers] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    // Retrieve the users and total balance from Firestore
    const unsubscribeUsers = db.collection("userProfiles").onSnapshot((snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });
    const unsubscribeBalance = db.collection("balances").doc(currentUser.uid).onSnapshot((doc) => {
      const balanceData = doc.data();
      if (balanceData) {
        setTotalBalance(balanceData.totalBalance);
      }
    });
  
    return () => {
      unsubscribeUsers();
      unsubscribeBalance();
    };
  }, [db, currentUser.uid]);
  




  useEffect(() => {
    // Retrieve the user's expenses from Firestore
    const unsub = db
      .collection("expenses")
      .where("userId", "==", currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const expensesData = [];
        querySnapshot.forEach((doc) => {
          expensesData.push({ id: doc.id, ...doc.data() });
        });
        setExpenses(expensesData);
      });

    return unsub;
  }, [currentUser]);

  useEffect(() => {
    // Retrieve the user's expenses from Firestore
    const unsub = db
      .collection("inflows")
      .where("userId", "==", currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const inflowData = [];
        querySnapshot.forEach((doc) => {
          inflowData.push({ id: doc.id, ...doc.data() });
        });
        setInflows(inflowData);
      });

    return unsub;
  }, [currentUser]);




  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer" id="expense">
        <div class="flex-container">
          <div class="flex-child">
            <div>
              {/* Change this line */}
              <h2>Balance: £{remainingBalance.toFixed(2)}</h2>
            </div>
            <p></p>
            <div>
              <Card >
                <Card.Body>
                  <h1>Expenses</h1>
                  <form onSubmit={handleFormSubmit}>
                    <label htmlFor="name">Name:&nbsp;&nbsp;&nbsp;</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                    <p></p>
                    <div>
                      <label htmlFor="amount">Amount:</label>
                      <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                      />
                    </div>
                    <p></p>
                    <div>
                      <label htmlFor="paymentmethod">Payment Method:</label>
                      <select
                        id="paymentmethod"
                        value={paymentmethod}
                        onChange={(event) =>
                          setPaymentMethod(event.target.value)
                        }
                      >
                        <option value="debit card">Debit Card</option>
                        <option value="credit card">Credit Card</option>
                        <option value="cash">Cash</option>
                      </select>
                      <br></br>
                      <p></p>
                      <button type="submit">Add Expense</button>
                    </div>
                  </form>
                </Card.Body>
              </Card>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  
}

export default ExpensesPage;