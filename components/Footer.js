'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Footer() {
    const pathname = usePathname()

    if (pathname === '/' || pathname === '/login') {
        return (
            <div className='p-4 sm:p-8 grid place-items-center'>
                <p>made by Ties Petersen.</p>
            </div>
        )
    }

    return (
        <footer className='fixed bottom-0 inset-x-0 text-center sm:text-lg max-w-[600px] mx-auto'>
            <div className="grid grid-cols-3 gap-4 bg-slate-900 p-4 my-3 mx-4 text-yellow-300 rounded-xl">
                <Link href={'/boulders'}><h1>boulders</h1></Link>
                <Link href={'/leaderboard'}><h1>leaderboard</h1></Link>
                <Link href={'/profile'}><h1>info</h1></Link>
            </div>
    </footer>
    )
}
