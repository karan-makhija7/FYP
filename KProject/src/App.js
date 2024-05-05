import React, { useState,useEffect } from 'react'

import {Container} from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import Home from '../src/pages/home/Home'
import Login from '../src/pages/login/login'
import SignUp from '../src/pages/signup/signup'
import Profile from '../src/pages/profile/profile'
import Contact from '../src/pages/contact/contact'
import Advice from './pages/advice/advice'
import Income from './pages/income/income'
import Freelance from './pages/freelance/freelance';



import { useContext } from 'react';
import PrivateRoute from './components/PrivateRoute'
import ExpensesPage from './pages/expense/ExpensesPage';
import Accommodation from './pages/accommodation/Accommodation';
import Travel from './pages/travel/travel'

import ForgotPassword from './components/ForgotPassword';
import UpdateEfire from './pages/update/UpdateEfire';


function App() {


  return(
    <div className="app">



       <Router>
    <AuthProvider>
      <Switch>
      <Route exact path="/">  
<Login/>
          </Route> 
        
          <PrivateRoute exact path="/profile">  
          <Profile />
          </PrivateRoute>
          <Route exact path="/login">  
          <Login />
          </Route>
          <PrivateRoute exact path="/home">  
          <Home />
          </PrivateRoute> 


          <Route exact path="/signup">
          <SignUp />
          </Route>

          <PrivateRoute exact path="/freelance">
          <Freelance />
          </PrivateRoute>

         
          <PrivateRoute exact path="/contact">
          <Contact />

          </PrivateRoute>    
             
          <PrivateRoute exact path="/expensespage">
          <ExpensesPage/>
          </PrivateRoute>   
   

<PrivateRoute exact path="/accommodation">
<Accommodation/>
</PrivateRoute> 

<PrivateRoute exact path="/income">
<Income/>
</PrivateRoute> 


<PrivateRoute exact path="/travel">
<Travel/>
</PrivateRoute>   

<PrivateRoute exact path="/advice">
<Advice/>
</PrivateRoute>   


<Route exact path="/forgot-password">
<ForgotPassword/>
</Route>   


{/* Test page has expenses grouped into months */}
<PrivateRoute exact path="/UpdateEmail"> 
<UpdateEfire/>
</PrivateRoute>    

          </Switch>
    </AuthProvider>
      </Router>
      </div>
    
  
  )}
export default App;

