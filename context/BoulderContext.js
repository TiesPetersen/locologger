'use client'

import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import React, {useContext, useState, useEffect} from 'react'
import { useAuth } from './AuthContext'
import { db } from '@/firebase'
import { usePathname } from 'next/navigation'

const BoulderContext = React.createContext()

export function useBoulder() {
    return useContext(BoulderContext)
}

export function BoulderProvider({children}) {
    const { currentUser, loading } = useAuth()
    const [boulders, setBoulders] = useState(null)
    const [bouldersLoading, setBouldersLoading] = useState(true)
    const path = usePathname()

    useEffect(() => {
        async function fetchBoulders() {
            try {
                setBouldersLoading(true)

                let bouldersDict = {}

                const pathSplit = path.split('/')
                if (pathSplit.length === 3) {
                    // only get 1 boulder
                    const boulderNumber = parseInt(pathSplit[pathSplit.length - 1])
                    const docRef = doc(db, 'boulders', String(boulderNumber))
                    console.log("READING 1 boulder")
                    const docSnap = await getDoc(docRef)
                    bouldersDict = {[boulderNumber]: docSnap.data()}
                } else {
                    // get all boulders 
                    const docRef = collection(db, 'boulders')
                    console.log("READING 30 boulders")
                    const docSnap = await getDocs(docRef)
                    const docRes = docSnap.docs.map((doc) => (
                        bouldersDict[doc.id] = {...doc.data()}
                    ))
                }
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