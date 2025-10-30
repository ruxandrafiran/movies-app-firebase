import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import "../styles/Login.scss"
import {db} from "../firebase-config"
import {getUsers, addUser} from "../firebase-users"


function Signup() {

  
    const [name, setName] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [confPassword, setConfPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const [alert, setAlert] = useState({state: false, msg: ""})

    //const [users, setUsers] = useState(getUsers())
    let foundUser = 0
    const checkUser = async () => {
        await getUsers().then((data) => data.map(user => {
          if(user.username == username) {
            foundUser = 1
          }
        }))
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        
        if (!name || !username || !password) {
            setAlert({state: true, msg: "All values must be provided!"})
            setTimeout(() => {
                setAlert(false)
              }, 3000)
              return
        }

        else if(name && username && password) {
            await checkUser()

            if(foundUser === 1) {
                console.log("user exists")
                    setAlert({state: true, msg: "This username already exists!"})
                    setTimeout(() => {
                        setAlert(false)
                    }, 3000)
                }
            }
            if (foundUser === 0) {
                console.log("create user")
                addUser(name, username, password)
                setAlert({state: true, msg: "User created!"})
                    setTimeout(() => {
                        setAlert(false)
                    }, 3000)
            }
        }
        
       

    let style = {
      position: "absolute",
      color: "red",
      top: "30px", 
      left: "50%",
      transform: "translate(-50%)"
    }

    return (
      <div className="bg">
      <div className="black"></div>
      <div className="auth">
        <div id="alert" style={style}>{alert.msg}</div>    
            <form action="api/register" method="POST">
                <label>Name
                <input type="text" name="name" autoComplete="off" onChange={(e) => setName(e.target.value)} /></label>
                <label>Username
                <input type="text" name="username" autoComplete="off" onChange={(e) => setUsername(e.target.value)} /></label>
                <label>Password
                <input type="password" name="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} /></label>
                <button type="submit" onClick={(e) => handleRegister(e)}>Register</button>
                <Link to="/login">Log in</Link>
            </form>
        </div>
        </div>
    )

}

export default Signup
