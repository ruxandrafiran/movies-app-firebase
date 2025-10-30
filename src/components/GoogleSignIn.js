import React, { useEffect } from 'react'
import "../styles/Login.scss"
import {auth, googleProvider} from "../firebase-config"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from 'react-router'

const Register = () => {

     let currentUser = auth?.currentUser

    useEffect(() => {
        if(auth) {
            navigate(`/`)
        }
    })

    let navigate = useNavigate()

    const registerWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            currentUser = auth.currentUser
            console.log(currentUser)

        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="bg">
            <div className="black"></div>
            <div className="auth">
                <div className='googleSignIn'>
                    <button onClick={registerWithGoogle}>Sign In with Google</button>
                </div>
            </div>
        </div>
    )
}

export default Register