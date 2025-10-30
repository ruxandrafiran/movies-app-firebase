import React, { useEffect, useState } from 'react'
import "../styles/Friends.scss"
import Friend from './pages-components/Friend'
import { getUsers, updateUser } from '../firebase-users'
import { useContext } from 'react';
import Context from '../context';
import AccFriend from './pages-components/AccFriend';
import RefreshButton from './pages-components/RefreshButton';

function Friends() {

  const [name,setName] = useState("")

  let [user, setUser] = useContext(Context)

  const [users, setUsers] = useState([])
  const [friends, setFriends] = useState(user.friends)
  const [friend, setFriend] = useState("")
  const [accFriends, setAccFriends] = useState(user.receivedFriendReq)

  const [alert, setAlert] = useState({state: true, msg: "\u00A0"})
  let style = {
      position: "absolute",
      color: "red",
      bottom: "55px", 
      left: "50%",
      transform: "translate(-50%)",
      fontSize: "18px"
    } 

  useEffect(() => {
    getUsers().then(data => {
      setUsers(data)
    })
  }, [])
  let userFriend = null

  const findFriend = async () => {
    await getUsers().then((data) => data.map(userFriendDB => {
      if(userFriendDB.username === friend) {
        userFriend = userFriendDB
      }
    }))
  }


  const handleFindFriend = async(e) => {
    e.preventDefault()
    if(friend !== "") {
      let foundFriend = 0
      // getUsers().then(data => {
      //   setUsers(data)
      // })
      await findFriend()
      //console.log(users)
      if(userFriend) {
      //users.map(userFriend => {
        if(friend === userFriend.username) {
          foundFriend = 1 
          let isOkToSendFriendReq = 1

          if(friend === user.username) {
            setAlert({state: true, msg: "This is you!"})
              setTimeout(() => {
                setAlert(false)
              }, 3000)
              isOkToSendFriendReq = 0
          }
          
          user.friends?.map(friendFromUser => {
            if(friendFromUser === userFriend.username && isOkToSendFriendReq === 1) {
              isOkToSendFriendReq = 0
              setAlert({state: true, msg: "This is already your friend!"})
              setTimeout(() => {
                setAlert(false)
              }, 3000)
            }
          })
          user.sentFriendReq?.map(sentFriendReq => {
            if(sentFriendReq === userFriend.username && isOkToSendFriendReq === 1) {
              isOkToSendFriendReq = 0
              setAlert({state: true, msg: "You already sent this user a friend request!"})
              setTimeout(() => {
                setAlert(false)
              }, 3000)
            }
          })
          user.receivedFriendReq?.map(receivedFriendReq => {
            if(receivedFriendReq === userFriend.username && isOkToSendFriendReq === 1) {
              isOkToSendFriendReq = 0
              setAlert({state: true, msg: "You received a friend request from this user!"})
              setTimeout(() => {
                setAlert(false)
              }, 3000)
            }
          })

          if(isOkToSendFriendReq === 1) {
            let newUser = user
            newUser.sentFriendReq?.push(userFriend.username)
           //user.sentFriendReq?.push(userFriend.username)
            let newUserFriend = userFriend
            //console.log(newUserFriend)
            updateUser(user.id, newUser)
            newUserFriend.receivedFriendReq?.push(user.username)
            //console.log(newUserFriend)
            userFriend = newUserFriend
            updateUser(userFriend.id, newUserFriend)
            setAlert({state: true, msg: "Friend request sent!"})
            setTimeout(() => {
              setAlert(false)
            }, 3000)
            //console.log(user, userFriend)
          }}
      //})
        }
      if(foundFriend === 0) {
        setAlert({state: true, msg: "User was not found!"})
        setTimeout(() => {
          setAlert(false)
        }, 3000)
      }
    }
  }
  

  return (
    <div className='pageFriends'>
      <span className='addFriend'>
      <div id="alert" style={style}>{alert.msg}</div>  
        <h3>Add friend:</h3>
        <input name="friend" value={friend} autoComplete="off" onChange={(e) => setFriend(e.target.value)} placeholder='Enter a username'/>
        <RefreshButton/>
        <button onClick={(e) => handleFindFriend(e)}>Send friend request</button>
      </span>
      <div className='friends'>
        {user.receivedFriendReq?.map(accFriend => {
          return (
            <AccFriend key={accFriend} accFriend={accFriend} setAccFriends={setAccFriends} setFriends={setFriends} friends={friends} setUser={setUser} changeName={value => setName(value)}/>
          )
        })}
        {user.friends?.map(friend => {
          return (
            <Friend key={friend} friend={friend} setUser={setUser} setFriends={setFriends} changeName={value => setName(value)}/>
          )
        })}
      </div>
    </div>
  )
}

export default Friends