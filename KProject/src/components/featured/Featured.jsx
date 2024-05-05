import "./featured.scss";
import firebase from "firebase/compat/app";


import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

import "firebase/compat/firestore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const Featured = () => {
  const db = firebase.firestore();
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [expensesToday, setExpensesToday] = useState([]);

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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const expensesData = expenses.filter((expense) => {
      const expenseDate = expense.date.toDate();
      return expenseDate >= today && expenseDate < tomorrow;
    });

    setExpensesToday(expensesData);
  }, [expenses]);

  const totalExpensesToday = expensesToday.reduce((sum, expense) => {
    return sum + parseFloat(expense.amount);
  }, 0);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Expense<MoreVertIcon fontSize="5px" /></h1>
        
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={totalExpensesToday}
            text={`$${totalExpensesToday}`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total expense made today</p>
        <p className="amount">${totalExpensesToday}</p>
        <p className="desc"></p>
      </div>
    </div>
  );
};

export default Featured;
