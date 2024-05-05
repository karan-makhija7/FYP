import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext"
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function List() {
  const db = firebase.firestore();
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);

  function changeFormat(date){
    return date.substring(4, 10)+", "+ date.substring(11, 15);
   }
  useEffect(() => {
    // Retrieve the user's expenses from Firestore
    const unsubscribe = db
      .collection("expenses")
      .where("userId", "==", currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const expensesData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          expensesData.push({
            id: doc.id,
            name: data.name,
            amount: data.amount,
            date: data.date.toDate().toString(), // convert timestamp to string
            paymentmethod: data.paymentmethod
          });
        });
        setExpenses(expensesData);
      });
  
    return unsubscribe;
  }, [currentUser, db]);
  const handleDeleteExpense = async (id) => {
    try {
      // Delete the expense from Firestore
      await db.collection("expenses").doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
  
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Date</TableCell>
                <TableCell className="tableCell">Expense name</TableCell>
                <TableCell className="tableCell">Amount</TableCell>
                <TableCell className="tableCell">Payment Method</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
<TableCell className="tableCell">{changeFormat(expense.date)}</TableCell>
                  <TableCell className="tableCell">{expense.name}</TableCell>
                  <TableCell className="tableCell">£{expense.amount}</TableCell>
                  <TableCell className="tableCell">{expense.paymentmethod}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

    </>
  );
}

export default List;