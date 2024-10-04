'use client'

import { useAuth } from '@/context/AuthContext'
import { redirect, usePathname } from 'next/navigation'
import React from 'react'
import Loading from './Loading'


export default function Main(props) {
    const {children} = props
    const { loading, currentUser, userDataObj} = useAuth()
    const pathname = usePathname()

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
