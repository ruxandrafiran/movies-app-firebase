import React, { useContext } from 'react'
import { GrRefresh } from "react-icons/gr"
import { getUser } from '../../firebase-users'
import Context from "../../context";

function RefreshButton() {

  let [user, setUser] = useContext(Context)

  const handleRefresh = () => {

    getUser(user.id).then(data => setUser(data))
    //setUser(user)
  }

  return (
    <button onClick={() => handleRefresh()}><GrRefresh/></button>
  )
}

export default RefreshButton