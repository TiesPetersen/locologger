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
            <div className="flex flex-row gap-4 justify-between bg-slate-900 p-3 my-3 mx-4 text-yellow-300 rounded-xl">
                <Link href={'/boulders'}><h1 className={'p-1 ms-2 border-2 rounded-lg w-20 sm:w-24 ' + (pathname === '/boulders' ? ' border-yellow-300 ' : ' border-slate-900')}>boulders</h1></Link>
                <Link href={'/leaderboard'}><h1 className={'p-1 px-2 border-2 rounded-lg ' + (pathname === '/leaderboard' ? ' border-yellow-300 ' : ' border-slate-900')}>leaderboard</h1></Link>
                <Link href={'/profile'}><h1 className={'p-1 me-2 border-2 rounded-lg w-20 sm:w-24' + (pathname === '/profile' ? ' border-yellow-300 ' : ' border-slate-900')}>info</h1></Link>
            </div>
    </footer>
    )
}
