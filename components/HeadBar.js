'use client'

import Link from 'next/link'
import React from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const Timer = dynamic(()=> import("@/components/Timer"), {ssr: false})

export default function HeadBar() {
    const path = usePathname()

    return (
        <header className='p-4 sm:p-6 flex items-center justify-between gap-4 bg-yellow-300 m-3 rounded-xl'>
            {path.includes('/boulders/') ? (
                <Link href='\boulders' className='ms-1'>
                    <i className="fa-solid fa-chevron-left text-2xl"></i>
                </Link>
            ) : (
                <Link href={'/'}>
                    <h1 className='font-bold text-lg sm:text-xl '>LOCO logger.</h1>
                </Link>
            )}
            <Timer />
    </header>
    )
}
