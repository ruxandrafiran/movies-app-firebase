import React, {useContext, useEffect, useState} from 'react'
import Context from '../context';
import "../styles/Notifications.scss"
import { Link } from "react-router-dom";
import RefreshButton from './pages-components/RefreshButton';

function Notifications() {

  let [user, setUser] = useContext(Context)
  const [notifications, setNotifications] = useState([])
  
  useEffect(() => {
    setNotifications(user?.receivedMovies)
  })
  

  return (
    <div className="notifPage">
      <h2>History of received movies <RefreshButton/></h2>
      {notifications ? notifications?.reverse().map((notif, index) => {
        return (
          <div className="notification" key={index}>
            <p>{notif.date}</p> 
            <Link to={`/movies/${notif.movie.id}`}>{notif.movie.title || notif.movie.original_title}</Link>
            <p> from {notif.from}</p>
          </div>
        )
      }) : <h3>Empty...</h3>}
    </div>
  )
}

export default Notifications