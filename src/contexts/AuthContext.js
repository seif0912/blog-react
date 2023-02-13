import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { auth, db, provider } from '../firebase/firebase-conf'
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { updateProfile } from 'firebase/auth';

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    let [ currentUser, setCurrentUser ] = useState()
    let [loading, setLoading] = useState(true)


    function signup(email, password, name){
        createUserWithEmailAndPassword(auth, email, password)
        .then((user)=>{
            updateProfile(auth.currentUser, {
                displayName: name
              }).then((res) => {
                console.log(res)
              }).catch((error) => {
                console.log(error)
              });
            setDoc(doc(db, "users", user.user.uid), {email: user.user.email});
        }).catch(err=> console.error(err))
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function signInWithGoogle(){
        signInWithPopup(auth, provider)
        .then((user) => {
            setDoc(doc(db, "users", user.user.uid), {email: user.user.email});
        }).catch(err=> console.error(err))
    }

    function logout(){
        return auth.signOut()
    }

    useEffect(()=>{
        const unsubcsribe = onAuthStateChanged( auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubcsribe
    },[])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}
