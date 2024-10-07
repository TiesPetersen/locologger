import React from 'react'
import Button from './Button'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className='py-4 sm:py-6s flex flex-col gap-2 sm:gap-8'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl text-center mb-6'>track your tops, follow your rivals and rise on the leaderboard with <span className='font-semibold'>LOCO logger</span>.</h1>
        <p className='text-base sm:text-xl text-center w-full mx-auto'>tired of carrying around a <span className='font-semibold'>scorecard and pencil</span> during LOCO? </p>
        <p className='text-base sm:text-xl text-center w-full mx-auto mb-6'>the solution is right here: with <span className='font-semibold'>LOCO logger</span>, you can easily <span className='font-semibold'>log every top</span>, see how your <span className='font-semibold'>rivals</span> are doing, and watch the <span className='font-semibold'>live leaderboard</span> as you climb your way to victory. no more paper, no more pencils—just pure climbing performance, right at your fingertips.</p>
        <div className='flex flex-col items-center'>
            <Link href={'/login'}>
                <Button text='get started now.' dark />
            </Link>
        </div>
    </div>
  )
}
