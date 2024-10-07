'use client'

import { useAuth } from '@/context/AuthContext'
import { db } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'
import React from 'react'

const INSTRUCTIONS = {
    boulders: 'each loco boulder has a unique number. click on a number below to start logging your score for that boulder.',
    boulderInfo: 'on this page, you can track your score, rate the difficulty, add private notes, and see how others are doing.',
    topzoneflash: 'log your score by pressing T (top), Z (zone) or F (flash).',
    difficulty: '(optional) estimate the difficulty of the boulder and log it below. this helps you get a better idea of which boulders to tackle first.',
    comment: "(optional) add private notes to the boulder below. it's a great way to remember key details about the boulder.",
    others: 'check how other climbers are performing on this boulder below.',
    leaderboard: "keep track of fellow climbers' scores in the leaderboard below. switch between categories by pressing the button below.",
    info: "scroll down to find more information about LOCO.",
    score: "once loco is over, don't forget to write down your final score on a scorecard and hand it in at the bar!"
}

export default function Instruction(props) {
    const { id } = props     
    const { loading, currentUser, userDataObj, setUserDataObj } = useAuth()

    async function dismiss() {
        const newData = {...userDataObj}
        if (!newData?.instructions){
            newData['instructions'] = []
        }

        newData['instructions'].push(id)

        setUserDataObj(newData)

        const docRef = doc(db, 'users', currentUser.uid)
        console.log("WRITING users/instructions")
        const res = await setDoc(docRef, {
            instructions: newData['instructions']
        }, { merge: true })
    }

    if (loading) {
        return ''
    }

    if (userDataObj.instructions) {
        if (userDataObj.instructions.includes(id)) {
            return ''
        }
    }

    return (
        <div className={'p-2 rounded-lg flex flex-row justify-between items-center border-4 border-solid border-yellow-300'}>
            <div className='flex flex-row flex-1 items-center'>
                <i className="fa-solid fa-circle-info text-2xl ps-1"></i>
                <h1 className='text-sm text-wrap px-3 text-justify'>
                    {INSTRUCTIONS[id]}
                </h1>
            </div>
            <button className='pe-1' onClick={dismiss}>
                <i className="fa-solid fa-xmark text-3xl"></i>
            </button>
        </div>
    )
}