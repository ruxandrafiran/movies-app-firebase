import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.scss"
import {getUsers} from "../firebase-users"
import { useContext } from 'react';
import Context from '../context';
import { setCookie } from '../handle-user-cookie';

function Login() {

  let navigate = useNavigate()

  let [user, setUser] = useContext(Context)

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [alert, setAlert] = useState({state: false, msg: ""})

  let style = {
    position: "absolute",
    color: "red",
    top: "30px", 
    left: "50%",
    transform: "translate(-50%)"
  } 

  let foundUser = null
  const checkUser = async () => {
    await getUsers().then((data) => data.map(user => {
      if(user.username === username) {
        foundUser = user
      }
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

     await checkUser()
         if(foundUser && foundUser.password === password) {
          setUser(foundUser)
           navigate("/")
           setCookie(foundUser.id)
         }
                else if(!username || !password) {
                  setAlert({state: true, msg: "All values must be provided!"})
                  setTimeout(() => {
                      setAlert(false)
                  }, 3000)
                }
                else if(foundUser && foundUser.password !== password) {
                    setAlert({state: true, msg: "Incorrect password!"})
                    setTimeout(() => {
                        setAlert(false)
                    }, 3000)
                }
                else if(!foundUser) {
                  setAlert({state: true, msg: "User does not exist!"})
                  setTimeout(() => {
                      setAlert(false)
                  }, 3000)
                }
  }

  return (
    <div className="bg">
      <div className="black"></div>
      <div className="auth">
        <div id="alert" style={style}>{alert.msg}</div>  
        <form>  
              <label>Username
              <input type="text" name="username" autoComplete="off" onChange={(e) => setUsername(e.target.value)} /></label>
              <label>Password
              <input type="password" name="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} /></label>
              <button type="submit" onClick={(e) => handleLogin(e)}>Login</button>
              <Link to="/register">Dont have an account? Sign up</Link>
      </form>
      </div>

    </div>
  )
}

export default Login