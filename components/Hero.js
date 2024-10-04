import React from 'react'
import Button from './Button'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className='py-4 sm:py-6s flex flex-col gap-8 sm:gap-8'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl text-center'>track your tops, follow your rivals and rise on the leaderboard with <span className='font-semibold'>loco logger</span>.</h1>
        <p className='text-base sm:text-xl text-center w-full mx-auto'>with loco logger, you can easily track your <span className='font-semibold'>personal score</span> during loco while keeping an eye on the performance of <span className='font-semibold'>fellow climbers</span>. follow <span className='font-semibold'>live rankings</span> to stay motivated and push yourself to new heights.</p>
        <div className='flex flex-col items-center'>
            <Link href={'/login'}>
                <Button text='get started.' dark />
            </Link>
        </div>
    </div>
  )
}
