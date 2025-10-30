import React, {useState, useContext} from 'react'
import Context from '../../context';
import { updateUser, getUsers } from '../../firebase-users';

function AccFriend(props) {

    let [user, setUser] = useContext(Context)
    let friends = props.friends
    let friend = null
    let accFriends = []
    let accFriendsForFriend = []

    const findAccFriend = async () => {
        await getUsers().then((data) => data.map(userFriend => {
          if(userFriend.username === props.accFriend) {
            friend = userFriend
          }
        }))
      }

    const handleAccept = async (e) => {
        e.preventDefault()
        props.changeName("1")
        await findAccFriend()
       // console.log(friend)
        accFriends = user.receivedFriendReq?.filter(accFriend => {
            if (accFriend !== props.accFriend) {
                return accFriend
            }
        })
        accFriendsForFriend = friend.sentFriendReq?.filter(accFriend => {
            if (user.username !== accFriend) {
                return accFriend
            }
        })
       /// console.log(accFriends, accFriendsForFriend) //// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        props.setAccFriends(accFriends)
        let newUser = user
        newUser.receivedFriendReq = accFriends
        newUser.friends.push(friend.username)
        setUser(newUser)
        props.setFriends(user.friends)
        let newFriend = friend
        newFriend.sentFriendReq = accFriendsForFriend
        newFriend.friends.push(user.username)
        updateUser(user.id, newUser)
        updateUser(friend.id, newFriend)
        props.setUser(newUser)

      //  console.log(user, friend)
    }

  return (
    <div className='accFriend'>
        <h2>{props.accFriend}</h2>
        <button onClick={(e) => handleAccept(e)}>Accept</button>
    </div>
  )
}

export default AccFriend