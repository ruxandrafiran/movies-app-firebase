import React, { useParams, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./pages-components/Footer"
import Navbar from "./pages-components/Navbar"
import Homepage from "./Homepage";
import About from "./About"
import Register from "./Register"
import Login from "./Login"
import EditProfile from "./EditProfile"
import Friends from "./Friends"
import PageNotFound from "./PageNotFound";
import Context from "../context";
import PrivateRoutes from "../PrivateRoutes"
import PrivateRoutesLogged from "../PrivateRoutesLogged"
import {getCookie} from "../handle-user-cookie"
import { getUser } from "../firebase-users";
import AboutMovie from "./AboutMovie";
import Notifications from "./Notifications"

function App() {

  const [user, setUser] = useState(null)
  const [name, setName] = useState("")
  //const [userProfile, setUserProfile] = useState(false)
  
  const id = getCookie()
  const asyncGetUserCookie = async () => {
      if(id) {
        const foundUser = await getUser(id)
        if(foundUser) {
          setUser(foundUser)
        }
      }
    }
  useEffect(() => {
    
    asyncGetUserCookie()
  }, [])
  let navigate = useNavigate()

  //let reloadInfo = 0
  const [reloadInfo, setReloadInfo] = useState(false)

  return (
     <Context.Provider value={[user, setUser]}>
    <div className="container">
      {user && <Navbar setReloadInfo={setReloadInfo} reloadInfo={reloadInfo}/>}
        <Routes>
          <Route path="/about" element={<About/>}></Route>
          <Route element={<PrivateRoutes/>}>
            <Route exact path="/" element={<Homepage/>}></Route>
            <Route path="/editProfile" element={<EditProfile changeName={value => setName(value)} />}></Route>
            <Route path="/friends" element={<Friends/>}></Route>
            <Route path="/notifications" element={<Notifications/>}></Route>
            <Route path="/movies/:movieID" element={<AboutMovie navigate={navigate} reloadInfo={reloadInfo} setReloadInfo={setReloadInfo}/>}></Route>
            <Route path="*" element={<PageNotFound/>} />
          </Route>
          <Route element={<PrivateRoutesLogged/>}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register/>}></Route>
          </Route>
        </Routes>
      {user && <Footer />}
    </div>
     </Context.Provider>
  );
}

export default App;
