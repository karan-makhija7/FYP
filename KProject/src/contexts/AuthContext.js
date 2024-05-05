import React, {useContext,useState,useEffect} from 'react'
import {auth} from '../firebase'

const AuthContext=React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}


export  function AuthProvider({children}) {
const [currentUser,PCU]=useState()
const [loading,PL]=useState(true)



function signin(email,password){
  return auth.signInWithEmailAndPassword(email,password)
}
function signup(email,password)
{
    return auth.createUserWithEmailAndPassword(email,password)
}


function signout(){
  return auth.signOut()
}



function upemail(email){
  return currentUser.updateEmail(email)
}

function password_reset_to_email(email){
  return auth.sendPasswordResetEmail(email)
}

function uppass (password){
  return currentUser.updatePassword(password)
}

useEffect(()=>{
    const AD= auth.onAuthStateChanged(user=>{
      PCU(user)
      PL(false)  

    })

    return AD

},[])

  const value = { 
    currentUser,
    signin,
    signup,
    signout,
    password_reset_to_email,
    upemail,
    uppass,
}
  return (
    <div>      
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    </div>
  )
}
