'use client'

import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import React, {useContext, useState, useEffect} from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [userDataObj, setUserDataObj] = useState(null)
    const [loading, setLoading] = useState(true)
 
    // AUTH HANDLERS
    function signup(email, password) {
        console.log("SIGNUP")
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        console.log("LOGIN")
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        console.log("LOGOUT")
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    async function refreshDataObj() {
        const docRef = doc(db, 'users', currentUser.uid)
        console.log("READING users/uid")
        const docSnap = await getDoc(docRef)

        let firebaseData = {}
        
        if (docSnap.exists()) {
            firebaseData = docSnap.data()
        }
        setUserDataObj(firebaseData)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                // Set the user to our local context state
                setLoading(true)
                setCurrentUser(user)
                if (!user) {
                    setLoading(false)
                    return
                }
                
                // if user exists, fetch data from firestore database
                const docRef = doc(db, 'users', user.uid)
                console.log("READING, users/uid")
                const docSnap = await getDoc(docRef)

                let firebaseData = {}
                
                if (docSnap.exists()) {
                    firebaseData = docSnap.data()
                }
                setUserDataObj(firebaseData)
            } catch(err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        })

        return unsubscribe
    }, [])

    const value = {
        loading,
        currentUser,
        userDataObj,
        setUserDataObj,
        refreshDataObj,
        signup,
        logout,
        login
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}