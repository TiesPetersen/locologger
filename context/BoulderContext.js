'use client'

import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import React, {useContext, useState, useEffect} from 'react'
import { useAuth } from './AuthContext'
import { db } from '@/firebase'

const BoulderContext = React.createContext()

export function useBoulder() {
    return useContext(BoulderContext)
}

export function BoulderProvider({children}) {
    const { currentUser, loading } = useAuth()
    const [boulders, setBoulders] = useState(null)
    const [bouldersLoading, setBouldersLoading] = useState(true)

    useEffect(() => {
        async function fetchBoulders() {
            try {
                // Set the user to our local context state
                setBouldersLoading(true)
    
                const docRef = collection(db, 'boulders')
                console.log("READING boulders")
                const docSnap = await getDocs(docRef)
                let bouldersDict = {}
                const docRes = docSnap.docs.map((doc) => (
                    bouldersDict[doc.id] = {...doc.data()}
                ))
    
    
                setBoulders(bouldersDict)
            } catch(err) {
                console.log(err.message)
            } finally {
                setBouldersLoading(false)
            }
        }

        if (!loading && currentUser) {
            fetchBoulders()
        }
        if (!loading && !currentUser) {
            setBouldersLoading(false)
        }

    }, [loading, currentUser])

    const value = {
        boulders,
        bouldersLoading,
        setBoulders
    }

    return (
        <BoulderContext.Provider value={value}>
            {children}
        </BoulderContext.Provider>
    )
}