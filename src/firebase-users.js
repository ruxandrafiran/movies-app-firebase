import React from 'react'
import {getDocs, collection, addDoc, updateDoc, doc, getDoc} from "firebase/firestore"
import {db} from "./firebase-config"


const userCollectionRef = collection(db, "users")

export const getUsers = async () => {
    try {
        let data = await getDocs(userCollectionRef)
        data = data.docs.map((doc) => ({ 
            ...doc.data(), 
            id: doc.id }))
        return [...data]
    } catch (err) {
        console.log(err)
    }   
}

export const addUser = async (name, username, password) => {
    try {
        await addDoc(userCollectionRef, {
            name, username, password, friends: [], sentFriendReq: [], receivedFriendReq: [], sentMovies: [], receivedMovies: []
        })
    } catch (err) {
        console.log(err)
    }   
}

export const updateUser = async (id, user) => {
    try {
        let docRef = doc(db, "users", id)
        await updateDoc(docRef, {name: user.name, password: user.password, friends: user.friends, sentFriendReq: user.sentFriendReq, receivedFriendReq: user.receivedFriendReq, sentMovies: user.sentMovies, receivedMovies: user.receivedMovies})
    } catch (err) {
        console.log(err)
    }   
}

export const getUser = async (id) => {
    try {
        let docRef = doc(db, "users", id)
        let data = getDoc(docRef).then((doc) => doc = { 
            ...doc.data(), 
            id: doc.id })
        //console.log(data)
        return data
    } catch (err){
        console.log(err)
    }
}