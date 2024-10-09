'use client'

import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import React, { useEffect } from 'react'

const MerijnEasterEggText = 'I wanna be yours i wanna be youuuurs (ronaldo voice)'

export default function BoulderCard(props) {
    const { refreshDataObj, currentUser, userDataObj, setUserDataObj } = useAuth()
    const { num } = props

    let scoreText = ''

    if (userDataObj.boulders?.[num]?.score) {
        if (userDataObj.boulders?.[num]?.score.includes('F')) {
            scoreText = 'flash'
        } else if (userDataObj.boulders?.[num]?.score.includes('T')) {
            scoreText = 'top'
        } else if (userDataObj.boulders?.[num]?.score.includes('Z')) {
            scoreText = 'zone'
        }
    }

    let merijnEasterEgg = false

    if (userDataObj.boulders?.[num]?.comment) {
        if (userDataObj.boulders?.[num]?.comment.toLowerCase().includes(MerijnEasterEggText.toLowerCase())) {
            merijnEasterEgg = true
        }
    }

    return (
        <Link href={'/boulders/' + num}>
            <div className={'flex flex-col flex-1 gap-2 p-3 rounded-lg hover:border hover:border-slate-800 ' + (merijnEasterEgg ? ' ronaldo ' : (userDataObj?.boulders?.[num]?.done ? ' bg-gray-100 ' : ' bg-yellow-300'))}>
                <div className='flex flex-row justify-between items-center text-center'>
                    <h1 className='text-3xl'>{String(num).padStart(2, '0')}</h1>
                    <div className='text-3xl flex-1 text-center'>{scoreText}</div>
                    <h1 className='pe-1 font-semibold text-base'>{userDataObj.boulders?.[num]?.difficulty}{userDataObj.boulders?.[num]?.difficulty ? '/5 ' : ''}{userDataObj.boulders?.[num]?.difficulty ? (
                         <i className="fa-solid fa-fire"></i>
                    ) : (<div className='w-10'></div>)}</h1>
                </div>
                {userDataObj.boulders?.[num]?.comment ? (
                    <p className={'p-2 rounded-lg text-wrap ' + (merijnEasterEgg ? ' ronaldonotes ' : (userDataObj?.boulders?.[num]?.done ? ' bg-gray-50 ' : ' bg-yellow-100'))}>{userDataObj.boulders?.[num]?.comment}</p>
                ) : ''}
            </div>
        </Link>
    )
}
