import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import "../styles/AboutMovie.scss"
import {getUsers, updateUser} from "../firebase-users"
import Context from '../context';
//require("dotenv").config()

function AboutMovie(props) {

    const {movieID} = useParams()
    const [movie, setMovie] = useState()
    const [loading, setLoading] = useState(true)
    let navigate = props.navigate

    let [user, setUser] = useContext(Context)
    const [userState, setUserState] = useState(user)

    const getMovie = () => {
        fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_API_KEY}`).then(result => result.json()).then(data => {
            setMovie(data)
            setLoading(false)
        })
    }

    useEffect(() => {
        getMovie()
    }, [])
    
    if(props.reloadInfo) {
        getMovie()
        props.setReloadInfo(!props.reloadInfo)
    }

    const handleBackHome = (e) => {
        e.preventDefault()
        navigate("/")
    }

    const [alert, setAlert] = useState({state: true, msg: "\u00A0"})
    let style = {
        position: "absolute",
        color: "blue",
        top: "-35px", 
        left: "50%",
        transform: "translate(-50%)",
      } 

    const [input, setInput] = useState("")

    const handleSendMovie = async () => {
        let friend = null
        await getUsers().then(data => {
            data?.map(userFriend => {
                if(userFriend.username === input)  {
                    friend = userFriend
                }
            })
        })

        if(friend) {
            let alreadySent = 0
            friend?.receivedMovies?.map(receivedMovie => {
                if((receivedMovie.from == user.username) && (receivedMovie.movie.id == movieID)) {
                    alreadySent = 1
                }
            })
            if(alreadySent === 1) {
                console.log("already sent")
                setAlert({state: true, msg: "You already sent this movie to this friend!"})
                setTimeout(() => {
                    setAlert({state: true, msg: "\u00A0"})
                }, 3000)
            }
            else if(alreadySent === 0) {
                console.log("not sent yet")
                let date = new Date().toLocaleDateString()
                console.log(date)
                friend.receivedMovies.push({movie: movie, from: user.username, date: date})
                updateUser(friend.id, friend)
                user.sentMovies.push({movie: movie, to: friend.username, date: date})
                updateUser(user.id, user)
                setAlert({state: true, msg: "Sent successfully!"})
                setTimeout(() => {
                    setAlert({state: true, msg: "\u00A0"})
                }, 3000)
            }
        }
        //setInput("")
    }

    return (
        <>
        {!loading ? 
        <div className="pageAbMovie">
            <div className="movie">
            <img  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`} width="300px"/>
            <div className='movieInfo'>
            <h1>{movie && (movie?.title || movie?.name)}</h1>
            <h4>Release date: {movie?.release_date}</h4>  
            <p>{movie.overview}</p>
            
            {userState?.friends?.length > 0 ? 
            <div className="sendToFriend">
                <div id="alert" style={style}>{alert.msg}</div> 
                <p>Send this movie to a friend:</p>
                <form>
                    {userState?.friends.map((friend, index) => {
                        return (
                            <label key={index}><input onClick={() => setInput(friend)} type="radio" id={friend} name="friend" value={friend}></input>{friend}</label>
                        )
                    })}
                </form>
                <button className="sendMovie" onClick={() => handleSendMovie()}>Send movie</button>
            </div> : <p className="addFriendsFirst">Add friends to send them movies to!</p>}
            </div></div>
            <button className="backHome" onClick={(e) => handleBackHome(e)}>Go back</button>
        </div>
        : <h1>Loading...</h1>}
        </>
    )

}

export default AboutMovie