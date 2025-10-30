import React, {useState} from 'react'
import "../styles/EditProfile.scss"
import { updateUser, getUser } from '../firebase-users'
import { useContext } from 'react';
import Context from '../context';

function EditProfile(props) {

  let [user, setUser] = useContext(Context)

  const [name, setName] = useState(user.name)
  const [password, setPassword] = useState(user.password)
  const [modify, setModify] = useState(false)
  const [alert, setAlert] = useState({state: false, msg: '\u00A0'})


  const handleModify = (e) => {
     e.preventDefault()
     setModify(!modify)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    props.changeName(name)
    let currUser = user
    currUser.name = name
    currUser.password = password
    setUser(currUser)
    updateUser(user.id, user)
    setModify(!modify)
    setAlert({state: true, msg: "Changes have been saved!"})
    setTimeout(() => {
      setAlert(false)
    }, 3000)
 }

  let style = {
    position: "absolute",
    color: "green",
    fontSize: "24px",
    top: "30px", 
    left: "50%",
    transform: "translate(-50%)"
  } 

  return (
    <div className='pageEditProfile'>
      <div className='editProfile'>
      <div id="alert" style={style}>{alert.msg}</div>  
      <h1>Your Profile:</h1>
      <form>
          <label>Name
          <input type="text" readOnly={!modify} name="name" value={name} autoComplete="off" onChange={(e) => setName(e.target.value)} /></label>
          <label>Password
          <input type="password" readOnly={!modify} name="password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)} /></label>
          {!modify ?
            <button className='modifyButton' onClick={(e) => handleModify(e)}>MODIFY</button>
            :
          <span className='buttons'>
            <button className='cancelButton' onClick={(e) => handleModify(e)}>CANCEL</button>
            <button className='saveButton' onClick={(e) => handleSave(e)}>SAVE</button>
          </span>}
      </form>
    </div>
    </div>
  )
}

export default EditProfile