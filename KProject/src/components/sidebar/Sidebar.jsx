import "./sidebar.scss";
import EmailIcon from '@mui/icons-material/Email';
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CarRentalIcon from '@mui/icons-material/CarRental';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HelpIcon from '@mui/icons-material/Help';
import SavingsIcon from '@mui/icons-material/Savings';
import WorkIcon from '@mui/icons-material/Work';

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link,useHistory } from "react-router-dom";

import { useContext } from "react";
import React,{useState} from 'react'

import {useAuth} from '../../contexts/AuthContext'


const Sidebar = () => {



  const [error,PE] = useState('')
  const {currentUser,signout}= useAuth()

  const history = useHistory()

  async function handlesignout(){
    PE('')

    try{
      await signout()
      history.push('/login')

    }
    catch{
      PE('Failed to log out')
    }

  }
 
  return (
    <div className="sidebar">
      <div className="top">
        
          <span className="logo">MoneyMate</span>
        
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>


          <Link to="/home" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>


          <p className="title">LISTS</p>
          
          
          <Link to="/accommodation" style={{ textDecoration: "none" }}>
          <li>
            <ApartmentIcon className="icon" />
            <span>Accomodation</span>
          </li>
          
          </Link>
          <Link to="/travel" style={{ textDecoration: "none" }}>
          <li>
          
            <CarRentalIcon className="icon" />
            <span>Travel</span>

          </li>
          </Link>

          <Link to="/freelance" style={{ textDecoration: "none" }}>
          <li>
          
            <WorkIcon className="icon" />
            <span>Freelance</span>

          </li>
          </Link>


          <p className="title">USEFUL</p>
          <Link to="/advice" style={{ textDecoration: "none" }}>
          <li>
            <HelpIcon className="icon" />
            <span>Advice</span>
          </li>
          </Link>
          

          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          
          <Link to="/contact" style={{ textDecoration: "none" }}>
          <li>
            <SupportAgentIcon className="icon" />
            <span>Contact</span>
          </li>
          </Link>

          <Link to="/updateemail" style={{ textDecoration: "none" }}>
          <li>
            <EmailIcon className="icon" />
            <span>update email & password</span>
          </li>
          </Link>

          <Link to="/expensespage" style={{ textDecoration: "none" }}>
          <li>
            <AttachMoneyIcon className="icon" />
            <span>expenses totals in months</span>
          </li>
          </Link>
          <Link to="/income" style={{ textDecoration: "none" }}>
          <li>
            <SavingsIcon className="icon" />
            <span>income</span>
          </li>
          </Link>
        
          
          
          <p className="title">USER</p>

          <Link to="/profile" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <div variant='link' onClick={handlesignout}>
          <li>
            <ExitToAppIcon className="icon" />
            <span >Logout</span>
          </li>
          </div>
        </ul>
      </div>
      
      
    </div>
  );
};

export default Sidebar;



