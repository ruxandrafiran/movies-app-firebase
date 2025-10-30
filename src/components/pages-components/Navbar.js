import React, { useEffect, useState, useContext } from "react";
import { AiOutlineSearch, AiOutlineStar } from "react-icons/ai"
import { Link } from "react-router-dom";
import "../../styles/Navbar.scss"
import Context from "../../context";
import { setCookie } from "../../handle-user-cookie";
import Cookies from "js-cookie";


function  Navbar(props) {

  let [user, setUser] = useContext(Context)
 // let [userProfile, setUserProfile] = useContext(Context)

  const [width, setWidth] = useState(null)
  const [userProfile, setUserProfile] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [search, setSearch] = useState("")

  const logout = async () => {
    try {
        setUser(null)
        Cookies.remove('id')
    } catch(err) {
        console.log(err)
    }
}

  function getWindowDimensions() {
    const { innerWidth: width } = window
    if(width > 650) setWidth(true)
    else setWidth(false)
  }
  useEffect(() => {
    getWindowDimensions()
    window.addEventListener('resize', getWindowDimensions)
    // getUser(user.id).then(data => {
    //   setUsername(data.name)
    // })
    
  }, [])

  useEffect(() => {
    if(userProfile === true) {
      setNotifications(false)
    }
  }, [userProfile])

  const style = {
    color: "white",
    cursor: "pointer",

  } 

  const [moviesSearch, setMoviesSearch] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    let input = e.target.value
    if(input?.length === 0) {
      setMoviesSearch([])
    }
    if(input?.length > 0) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${search}`).then(response => response.json()).then(data => {
        data = data.results
        setMoviesSearch([])
        let moviesArray = []
        data.map(movie => {
          if(moviesArray.length <= 6) {
            if(movie.title.toLowerCase().startsWith(input.toLowerCase()) || movie.original_title.toLowerCase().startsWith(input.toLowerCase())) {
              moviesArray.push(movie)
              setMoviesSearch(moviesArray)
            }
          }
        })
      })


    }
  }

  return (
    <div className="navbar">

    {width ? <button className="logo"><Link to="/">M</Link></button> : null}

      <span className="search">
        <input name="search" value={search} autoComplete="off" onChange={(e) => {
          setSearch(e.target.value)
          handleSearch(e)
          
          }} placeholder="Search..."></input>
        <button><AiOutlineSearch /></button>
      </span>
      <span className={(moviesSearch?.length > 0) ? "moviesList" : null}>
        {moviesSearch.map((movie, index) => {
          return (
            <div className="movieList" key={index}>
              <Link onClick={() => {
                props.setReloadInfo(!props.reloadInfo)
                setSearch("")
                setMoviesSearch([])
              }} to={`/movies/${movie.id}`}>
                <p>{movie.title || movie.original_title} {`(${movie.release_date.substring(0,4)})`}</p>
              </Link>
            </div>
          )
        })}
      </span>

      <Link to="/notifications" ><AiOutlineStar style={style} /></Link>
      {/* <span className="notif" onClick={() => setNotifications(!notifications)}>
          <AiOutlineStar style={style} />
          </span>
          {notifications ? 
            <div className="dropdownNotif">
              <ul>
                <li>notif1</li>
                <li>notif2</li>
                <li>notif3</li>
              </ul>
            </div>
          :null} */}
      
<span className="entireProfile" onMouseLeave={() => setUserProfile(false)} >
    <span className="userProfile"  onMouseEnter={() => setUserProfile(true)} >
      {width ? <p className="username">{user?.name}</p> : null}
      <div className="imgProfile"></div>
    </span>
    { userProfile ?
      <div className="dropdownMenu">
        <ul>
          {!width ? <li><Link to="/">Home page</Link></li> : null}
          <li><Link to="/editProfile">Edit Profile</Link></li>
          <li><Link to="/friends">Friends</Link></li>
          <li onClick={logout}><Link to="/login">Log out</Link></li>
        </ul>
      </div>
      
    : null}
    </span>
     
    </div>
  )
}

export default Navbar