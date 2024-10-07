'use client'

import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import React, {useContext, useState, useEffect} from 'react'
import { useAuth } from './AuthContext'
import { db } from '@/firebase'
import { usePathname } from 'next/navigation'

const LeaderboardContext= React.createContext()

export function useLeaderboard() {
    return useContext(LeaderboardContext)
}

export function LeaderboardProvider({children}) {
    const { currentUser, loading, userDataObj } = useAuth()
    const [leaderboard, setLeaderboard] = useState(null)
    const [leaderboardLoading, setLeaderboardLoading] = useState(true)
    const [currentCat, setCurrentCat] = useState(null)

    async function switchLeaderboard() {
        try {
            setLeaderboardLoading(true)

            let newCat = ''
            if (currentCat === 'men') {
                newCat = 'women'
            } else if (currentCat === 'women') {
                newCat = 'men'
            }  

            const docRef = doc(db, 'leaderboards', newCat)
            console.log("READING leaderboard")
            const docSnap = await getDoc(docRef)

            setLeaderboard(docSnap.data())
            setCurrentCat(newCat)
        } catch(err) {
            console.log(err.message)
        } finally {
            setLeaderboardLoading(false)
        }
    }

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                setLeaderboardLoading(true)

                const docRef = doc(db, 'leaderboards', userDataObj.cat)
                console.log("READING leaderboard")
                const docSnap = await getDoc(docRef)

                setLeaderboard(docSnap.data())
                setCurrentCat(userDataObj.cat)
            } catch(err) {
                console.log(err.message)
            } finally {
                setLeaderboardLoading(false)
            }
        }

        if (!loading && currentUser) {
            fetchLeaderboard()
        }
        if (!loading && !currentUser) {
            setLeaderboardLoading(false)
        }

    }, [loading, currentUser])

    const value = {
        leaderboard,
        leaderboardLoading,
        setLeaderboard,
        switchLeaderboard,
        currentCat
    }

    return (
        <LeaderboardContext.Provider value={value}>
            {children}
        </LeaderboardContext.Provider>
    )
}