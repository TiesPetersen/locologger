'use client'

import React from 'react'
import UserCard from './UserCard'
import { useBoulder } from '@/context/BoulderContext'
import Loading from './Loading'
import { useAuth } from '@/context/AuthContext'
import { useLeaderboard } from '@/context/LeaderboardContext'

export default function LeaderBoard() {
    const { leaderboard, leaderboardLoading, switchLeaderboard, currentCat } = useLeaderboard()
    const { userDataObj } = useAuth()

    if (leaderboardLoading) {
        return (
            <main className='flex-1 flex flex-col p-4 sm:p-8'>
                <Loading/>
            </main>  
        )
    }

    let userScores = leaderboard

    function scoreToText(obj){
        return obj['T'] + 't ' + obj['Z']+ 'z ' + obj['F'] + 'f'
    }

    let prevScore = ''
    let placement = 0
    let offset = 0
    Object.keys(userScores).sort((a,b) => {
        return userScores[b]['T'] - userScores[a]['T'] || userScores[b]['Z'] - userScores[a]['Z'] || userScores[b]['F'] - userScores[a]['F']
    }).map((user, userIndex) => {
        if (!(prevScore === scoreToText(userScores[user]))){
            placement++
            placement += offset
            offset = 0
        } else {
            offset++
        }
        userScores[user]['placement'] = placement
        prevScore = scoreToText(userScores[user])
    })

    return (
        <div className='flex flex-col gap-2'>
            <div className={'p-2 rounded-lg flex flex-row justify-between items-center bg-slate-800 text-yellow-300'}>
                <h1 className='ps-2 text-lg font-semibold'>
                    {currentCat}'s leaderboard
                </h1>
                <button onClick={() => {switchLeaderboard(); console.log(leaderboard)}} className='pe-2 text-bs'>
                    switch to {currentCat === 'men' ? 'women' : 'men'}'s
                </button>
            </div>
            {Object.keys(leaderboard).sort((a,b) => {
                return userScores[b]['T'] - userScores[a]['T'] || userScores[b]['Z'] - userScores[a]['Z'] || userScores[b]['F'] - userScores[a]['F']
            }).map((user, userIndex) => {
                return (
                    <UserCard border={user===userDataObj.name ? true : false} key={userIndex} content={scoreToText(userScores[user])} user={userScores[user]['placement'] + '. ' + user}/>
                )
            })}
        </div>
    )
}
