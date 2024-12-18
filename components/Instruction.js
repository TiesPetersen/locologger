'use client'

import { useAuth } from '@/context/AuthContext'
import { db } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'
import React from 'react'

const INSTRUCTIONS = {
    boulders: 'each loco boulder has a unique number. click on a number below to start logging your score for that boulder.',
    menuinfo: "click on 'info' in the menu on the bottom to get more info about LOCO and LOCO logger.",
    boulderInfo: 'on this page, you can track your score, rate the difficulty, add private notes, and see how others are doing.',
    topzoneflash: 'log your score by pressing T (top), Z (zone) or F (flash).',
    difficulty: '(optional) estimate the difficulty of the boulder and log it below. this helps you get a better idea of which boulders to tackle first.',
    note: "(optional) add private notes to the boulder below. it's a great way to remember key details about the boulder. don't forget to save the note using the button that appears when you start editing it.",
    others: 'check how other climbers are performing on this boulder below.',
    leaderboard: "keep track of fellow climbers' scores in the leaderboard below. switch between categories by pressing the button below.",
    info: "scroll down to find more information about LOCO.",
    score: "once loco is over, don't forget to write down your final score on a scorecard and hand it in at the bar!",
    mark: "(optional) cross off boulders to colour them grey. this makes it clear which boulders you still want to work on and which not. the boulder will automatically be crossed off if you topped it or flashed it."
}

export default function Instruction(props) {
    const { id } = props     
    const { userLoading, currentUser, userDataObj, setUserDataObj } = useAuth()

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

    if (userLoading) {
        return ''
    }

    if (userDataObj.instructions) {
        if (userDataObj.instructions.includes(id)) {
            return ''
        }
    }

    return (
        <div className={'p-2 rounded-lg flex flex-row justify-between items-center border-2 border-solid border-slate-800 w-full'}>
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
