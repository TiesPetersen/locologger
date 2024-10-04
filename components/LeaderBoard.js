'use client'

import React from 'react'
import UserCard from './UserCard'
import { useBoulder } from '@/context/BoulderContext'
import Loading from './Loading'

export default function LeaderBoard() {
    const { boulders, bouldersLoading } = useBoulder()

    if (bouldersLoading && !boulders) {
        return (
            <main className='flex-1 flex flex-col p-4 sm:p-8'>
                <Loading/>
            </main>  
        )
    }

    let userScores = {}
    Object.keys(boulders).map((boulder, boulderIndex) => {
        Object.keys(boulders[boulder]).map((user, userIndex) => {
            if (!userScores[user]) {
                userScores[user] = {tops: 0, zones: 0, flashes: 0}
            }

            if (boulders[boulder][user].includes('F')) {
                userScores[user]['flashes'] += 1
            }
            if (boulders[boulder][user].includes('T')) {
                userScores[user]['tops'] += 1
            }
            if (boulders[boulder][user].includes('Z')) {
                userScores[user]['zones'] += 1
            }

        })
    })

    function scoreToText(obj){
        return obj['tops'] + 't ' + obj['zones']+ 'z ' + obj['flashes'] + 'f'
    }

    console.log(userScores)

    let prevScore = ''
    let placement = 0
    let offset = 0
    Object.keys(userScores).sort((a,b) => {
        return userScores[b]['tops'] - userScores[a]['tops'] || userScores[b]['zones'] - userScores[a]['zones'] || userScores[b]['flashes'] - userScores[a]['flashes']
    }).map((user, userIndex) => {
        console.log(user)
        if (!(prevScore === scoreToText(userScores[user]))){
            placement++
            placement += offset
            offset = 0
            console.log('adding')
        } else {
            offset++
        }
        userScores[user]['placement'] = placement
        prevScore = scoreToText(userScores[user])
    })

    console.log(userScores)


    return (
        <div className='flex flex-col gap-2'>
            {Object.keys(userScores).sort((a,b) => {
                return userScores[b]['tops'] - userScores[a]['tops'] || userScores[b]['zones'] - userScores[a]['zones'] || userScores[b]['flashes'] - userScores[a]['flashes']
            }).map((user, userIndex) => {
                return (
                    <UserCard key={userIndex} content={scoreToText(userScores[user])} user={userScores[user]['placement'] + '. ' + user}/>
                )
            })}
        </div>
    )
}