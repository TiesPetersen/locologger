'use client'

import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import React, {useContext, useState, useEffect} from 'react'
import { useAuth } from './AuthContext'
import { db } from '@/firebase'
import { usePathname } from 'next/navigation'


const EventContext = React.createContext()

export function useEvent() {
    return useContext(EventContext)
}

export function EventProvider({children}) {
    const { currentUser, userLoading } = useAuth()
    const [event, setEvent] = useState(null)
    const [eventLoading, setEventLoading] = useState(true)
    const path = usePathname()

    useEffect(() => {
        async function fetchEvent() {
            try {
                setEventLoading(true)

                // get event
                const docRef = doc(db, 'events', process.env.NEXT_PUBLIC_CURRENT_EVENT)
                console.log("READING events/event")
                const docSnap = await getDoc(docRef)
                const eventData = docSnap.data()

                setEvent(eventData)
            } catch(err) {
                console.log(err.message)
            } finally {
                setEventLoading(false)
            }
        }

        if (!event) {
            fetchEvent()
        } else if ((path.includes('/boulders/') || path === '/leaderboard') && event) {
            fetchEvent()
        }

    }, [path])

    const value = {
        event,
        eventLoading,
        setEvent
    }

    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    )
}