import React, { useState } from 'react'
import "../../styles/Friends.scss"
import Context from '../../context';
import { useContext } from 'react';
import { updateUser, getUsers } from '../../firebase-users'
import { Link } from "react-router-dom";

function Friend(props) {

const [infoButton, setInfoButton] = useState(false)

let [user, setUser] = useContext(Context)
let friend = null

    const findFriend = async () => {
    await getUsers().then((data) => data.map(userFriend => {
      if(userFriend.username === props.friend) {
        friend = userFriend
      }
    }))
  }

    const handleDelete = async(e) => {
        e.preventDefault()
        await findFriend()
        //console.log(friend)
        props.changeName("1")
        let newFriends = user.friends?.filter(friend => {
           // console.log(friend, props.friend)
            if (friend != props.friend) {
                return friend
            }
        })
        let friendFriends = friend.friends?.filter(friend => {
            console.log(friend, user.username)
            if (friend != user.username) {
                return friend
            }
        })
        props.setFriends(newFriends)
        let newUser = user
        newUser.friends = newFriends
        setUser(newUser)
        let newFriend = friend
        newFriend.friends = friendFriends
        updateUser(user.id, newUser)
        updateUser(friend.id, newFriend)
        props.setUser(newUser)
    }

  return (
    <div className='friend'>
        <span className="initialInfo">
            <h2>{props.friend}</h2>
            <button onClick={() => setInfoButton(!infoButton)}>info</button>
            <button onClick={(e) => handleDelete(e)}>delete</button>
        </span>
        {infoButton ? 
            <div className='friendInfo'>
                {/* <p>Friends since:</p> */}
                Recommended you:
                <div className='linksInfo'>
                  {
                    user?.receivedMovies.map((receivedMovie, index) => {
                      if(receivedMovie.from == props.friend) {
                        return (
                            <Link key={index} to={`/movies/${receivedMovie.movie.id}`}>{receivedMovie.movie.title || receivedMovie.movie.original_title}</Link>
                        )
                      }
                    })
                  }
                  </div>
                
                You recommended them:
                <div className='linksInfo'>
                  {
                    user?.sentMovies.map((sentMovie, index) => {
                      if(sentMovie.to == props.friend) {
                        return (
                            <Link key={index} to={`/movies/${sentMovie.movie.id}`}>{sentMovie.movie.title || sentMovie.movie.original_title}</Link>
                        )
                      }
                    })
                  }
                  </div>
            </div>
        :null}
    </div>
  )
}

export default Friend