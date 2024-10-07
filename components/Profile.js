'use client'

import React, { useEffect } from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'
import Instruction from './Instruction'

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
            <Instruction id='info' />
            <Instruction id='score' />
            <div className={'p-4 rounded-lg flex flex-col w-full gap-4 justify-between bg-yellow-300'}>
                <h1 className='text-xl'>
                    name: <span className='font-semibold'>{userDataObj.name}</span>
                </h1>
                <h1 className='text-xl'>
                    category: <span className='font-semibold'>{userDataObj.cat}</span>
                </h1>
                <h1 className='text-xl'>
                    your score: <span className='font-semibold'>{currentScore.tops}t {currentScore.zones}z {currentScore.flashes}f</span>
                </h1>
            </div>
            <div className={'p-4 rounded-lg flex flex-col w-full gap-4 justify-between bg-yellow-300'}>
                <h1 className='text-xl font-semibold'>
                    ready to crush some boulders?
                </h1>
                <p>
                    you&apos;ve signed up, and now it&apos;s time to climb hard and log your progress. 
                    LOCO brings you 30 fresh boulders ranging from 4 to 8A. 
                    whether you&apos;re aiming to top them all or just grabbing zones, every attempt counts!
                </p>
                <h1 className='text-xl font-semibold'>
                    your climbing, your score
                </h1>
                <p>
                    log every top, zone, and flash right here. see how you stack up against the competition, and keep an eye on the leaderboard to stay motivated. 
                    with LOCO logger, tracking your progress has never been easier—no more lost scorecards or missing pencils.
                </p>
                <h1 className='text-xl font-semibold'>
                    follow the action
                </h1>
                <p>
                    want to know how your rivals are doing? check out the live leaderboard to see who&apos;s making moves. 
                    every top and zone brings you closer to the top!
                </p>
                <h1 className='text-xl font-semibold'>
                    stay for the prices!
                </h1>
                <p>
                    after all the climbing, don&apos;t forget: there&apos;s a raffle during the award ceremony. 
                    hand in your scorecard to be in with a chance to win. 
                    but remember, you&apos;ve got to be present to collect your prize!
                </p>
            </div>
            
            <div className='w-full flex flex-col pb-16'>
                <Button text='log out.' clickHandler={logout}/>
            </div>
        </div>
    )
}
