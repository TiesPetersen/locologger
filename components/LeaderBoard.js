'use client'

import React, { useState} from 'react'
import UserCard from './UserCard'
import { useAuth } from '@/context/AuthContext'
import Instruction from './Instruction'
import { useEvent } from '@/context/EventContext'
import Loading from './Loading'

export default function LeaderBoard() {
    const { userDataObj } = useAuth()
    const [ currentCategory, setCurrentCategory ] = useState(null)
    const { event } = useEvent()

    if (userDataObj.category && !currentCategory) {
        setCurrentCategory(userDataObj.category)
    } 
    if (!userDataObj.category && !currentCategory) {
        return (
            <main className='flex-1 flex flex-col p-4 sm:p-8'>
                <Loading/>
            </main>
        )
    }

    function switchCategory() {
        if (currentCategory === 'men') {
            setCurrentCategory('women')
        } else if (currentCategory === 'women') {
            setCurrentCategory('men')
        }
    }

    let userScores = {}

    for (let boulderNumber=0; boulderNumber < Object.keys(event.boulders).length; boulderNumber++) {
        Object.keys(event.boulders[Object.keys(event.boulders)[boulderNumber]]).filter((user) => {
            if (event.boulders[Object.keys(event.boulders)[boulderNumber]][user].category === currentCategory) {
                return true
            } 
            return false
        }).map((user, userIndex) => {
            let newScore = {}
            if (userScores[user]) {
                newScore = userScores[user]
            } else {
                newScore = {F: 0, T: 0, Z: 0}
            }

            if (event.boulders[Object.keys(event.boulders)[boulderNumber]][user].score === 'F') {
                newScore['F'] += 1
                newScore['T'] += 1
                newScore['Z'] += 1
            } else if (event.boulders[Object.keys(event.boulders)[boulderNumber]][user].score === 'T') {
                newScore['T'] += 1
                newScore['Z'] += 1
            } else if (event.boulders[Object.keys(event.boulders)[boulderNumber]][user].score === 'Z') {
                newScore['Z'] += 1
            }

            if (userScores[user]) {
                userScores[user] = newScore
            } else {
                userScores[user] = {}
                userScores[user] = newScore
            }
        })
    }

    function scoreToText(obj){
        return obj['T'] + 't ' + obj['Z']+ 'z ' + obj['F'] + 'f'
    }

    // Add placement to userScores
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
            <Instruction id='leaderboard' />
            <div className={'p-2 rounded-lg flex flex-row justify-between items-center bg-slate-800 text-yellow-300'}>
                <h1 className='ps-2 text-lg font-semibold'>
                    {currentCategory}&apos;s leaderboard
                </h1>
                <button onClick={switchCategory} className='pe-2 text-bs'>
                    switch to {currentCategory === 'men' ? 'women' : 'men'}&apos;s
                </button>
            </div>
            {Object.keys(userScores).sort((a,b) => {
                return userScores[b]['T'] - userScores[a]['T'] || userScores[b]['Z'] - userScores[a]['Z'] || userScores[b]['F'] - userScores[a]['F']
            }).map((user, userIndex) => {
                return (
                    <UserCard border={user===userDataObj.name ? true : false} key={userIndex} content={scoreToText(userScores[user])} user={userScores[user]['placement'] + '. ' + user}/>
                )
            })}
        </div>
    )
}
