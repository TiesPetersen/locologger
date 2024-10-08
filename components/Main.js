'use client'

import { useAuth } from '@/context/AuthContext'
import { redirect, usePathname } from 'next/navigation'
import React , { useEffect, useState } from 'react'
import Loading from './Loading'
import { useRouter } from 'next/navigation'

export default function Main(props) {
    const {children} = props
    const { loading, currentUser, userDataObj} = useAuth()
    const pathname = usePathname()
    const router = useRouter()
    const [ lastHiddenTime, setLastHiddenTime ] = useState(null)
    const reloadThreshold = 60*1000; // in milliseconds
 
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                // User navigated away from the tab, store the time
                setLastHiddenTime(Date.now());
            } else if (document.visibilityState === 'visible') {
                // User came back to the tab, check how long they were away
                if (lastHiddenTime && Date.now() - lastHiddenTime > reloadThreshold) {
                    window.location.reload();
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
      
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [lastHiddenTime])


    // Load until user is loaded, expect on the landing page
    if (!(pathname === '/') && loading) {
        return (
            <main className='flex-1 flex flex-col p-4 sm:p-8'>
                <Loading/>
            </main>
        )
    }

    // Redirect when accessing userdependent pages after user is loaded and is not logged in
    if (!(pathname === '/login' || pathname === '/') && !loading && !currentUser) {
        redirect('/login')
    }

    if (pathname === '/login' && !loading && currentUser) {
        redirect('/boulders')
    }

    return (
        <main className='flex-1 flex flex-col p-4 sm:p-8'>
            {children}
        </main>
    )
}
