
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { useAuth } from '../../contexts/AuthContext'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const Chart = ({ aspect, title }) => {
  const db = firebase.firestore();
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);

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

  // Group expenses by month
  const expensesByMonth = expenses.reduce((acc, expense) => {
    const month = expense.date.toDate().getMonth();
    const year = expense.date.toDate().getFullYear();
    const key = `${year}-${month}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(expense);
    return acc;
  }, {});

  // Calculate total amount by month
  const totalsByMonth = Object.entries(expensesByMonth).reduce(
    (acc, [key, value]) => {
      const totalAmount = value.reduce((sum, expense) => {
        return sum + expense.amount;
      }, 0);
      const [year, month] = key.split("-");
      const date = new Date(year, month, 1);
      acc[date.toLocaleString("default", { month: "long" })] = totalAmount;
      return acc;
    },
    {}
  );

  const data = [
    { name: "January", Total: totalsByMonth["January"] || 0 },
    { name: "February", Total: totalsByMonth["February"] || 0 },
    { name: "March", Total: totalsByMonth["March"] || 0 },
    { name: "April", Total: totalsByMonth["April"] || 0 },
    { name: "May", Total: totalsByMonth["May"] || 0 },
    { name: "June", Total: totalsByMonth["June"] || 0 },
  ];

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="6%" stopColor="#8784d8" stopOpacity={0.7} />
              <stop offset="94%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3"
className="chartGrid"
/>
<Tooltip />
<Area
  type="monotone"
  dataKey="Total"
  stroke="#8884d8"
  fillOpacity={1}
  fill="url(#total)"
/>
</AreaChart>
</ResponsiveContainer>
</div>
);
};

export default Chart;