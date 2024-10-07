'use client'

import React, { useEffect } from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

export default function Profile() {
    const { logout, refreshDataObj, currentUser, userDataObj, setUserDataObj } = useAuth()

    function calcScore() {
        let tops = 0
        let zones = 0
        let flashes = 0

        for (let i = 1; i <= 30; i++) {
            let score = (userDataObj.boulders?.[i]?.score)
            if (!score) {continue}
            if (score.includes('T')) {
                tops++
            }

            if (score.includes('Z')) {
                zones++
            }

            if (score.includes('F')) {
                flashes++
            }
        }

        return {tops, zones, flashes}
    }

    const currentScore = calcScore()

    return (
        <div className='flex flex-col flex-1 gap-4 items-center'>
            <h1 className='text-xl'>
                name: {userDataObj.name}
            </h1>
            <h1 className='text-xl'>
                category: {userDataObj.cat}
            </h1>
            <h1 className='text-xl mt-5'>
                score: {currentScore.tops}t {currentScore.zones}z {currentScore.flashes}f
            </h1>
            <div className='w-full items-center flex flex-col pt-10'>
                <Button text='log out.' clickHandler={logout}/>
            </div>
        </div>
    )
}
