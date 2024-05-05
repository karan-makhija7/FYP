import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";


import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuth } from '../../contexts/AuthContext'
import { BrowserRouter as Router, Route, Switch,Redirect,Link } from 'react-router-dom'

const Widget = ({ type }) => {



  const [expenses, setExpenses] = useState([]);
  const [inflows, setInflows] = useState([]);
  const [name, setName] = useState("");
  const [name1, setName1] = useState("");

  const [paymentmethod, setPaymentMethod] = useState("");
  const [amount1, setAmount1] = useState("");
  const [balance, setBalance] = useState(null);
  const [newBalance, setNewBalance] = useState("");




  const db = firebase.firestore();
  const { currentUser } = useAuth();
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
    const unsubscribe = db
      .collection("expenses")
      .where("userId", "==", currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const expensesData = [];
        querySnapshot.forEach((doc) => {
          expensesData.push({ id: doc.id, ...doc.data() });
        });
        setExpenses(expensesData);
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


  const totalExpenses = expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

 const totalInflows = inflows.reduce((total, inflow) => {
    return total + inflow.amount1;
  }, 0);

  const remainingBalance = totalInflows - totalExpenses;








  let data;
  let amount;

  switch (type) {
    case "user":
      data = {
        title: "USER",
        isMoney: false,
        change: true,
        
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      amount = users.length;
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        change: false,
        link: <Link to="/expensespage">Add expense</Link>,
        
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      amount = remainingBalance;
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "£"} {amount}
        </span>
        
          <span>
        {data.link}
          </span>
         
    

        
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {data.change}
        </div>
        {data.icon}
      </div>
    </div>
  );
};
export default Widget;






