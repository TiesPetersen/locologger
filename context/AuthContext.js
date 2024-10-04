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
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    async function refreshDataObj() {
        console.log("Fetching user data")
        const docRef = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(docRef)

        let firebaseData = {}
        
        if (docSnap.exists()) {
            console.log('Found user data')
            firebaseData = docSnap.data()
            console.log(firebaseData)
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
                    console.log("No user found")
                    setLoading(false)
                    return
                }
                
                // if user exists, fetch data from firestore database
                console.log("Fetching user data")
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)

                let firebaseData = {}
                
                if (docSnap.exists()) {
                    console.log('Found user data')
                    firebaseData = docSnap.data()
                    console.log(firebaseData)
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