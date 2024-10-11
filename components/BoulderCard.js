'use client'

import { useAuth } from '@/context/AuthContext'
import { useEvent } from '@/context/EventContext'
import Link from 'next/link'
import React from 'react'

const MerijnEasterEggText = 'I wanna be yours i wanna be youuuurs (ronaldo voice)'

export default function BoulderCard(props) {
    const { event } = useEvent()
    const { userDataObj } = useAuth()
    const { num } = props

    let scoreText = ''

    if (event.boulders[num]?.[userDataObj.name]?.score) {
        if (event.boulders[num]?.[userDataObj.name]?.score === 'F') {
            scoreText = 'flash'
        } else if (event.boulders[num]?.[userDataObj.name]?.score === 'T') {
            scoreText = 'top'
        } else if (event.boulders[num]?.[userDataObj.name]?.score === 'Z') {
            scoreText = 'zone'
        }
    }

    let merijnEasterEgg = false

    if (event.boulders[num]?.[userDataObj.name]?.note) {
        if (event.boulders[num]?.[userDataObj.name]?.note.toLowerCase().includes(MerijnEasterEggText.toLowerCase())) {
            merijnEasterEgg = true
        }
    }

    return (
        <Link href={'/boulders/' + num}>
            <div className={'flex flex-col flex-1 gap-2 p-3 rounded-lg hover:border hover:border-slate-800 ' + (merijnEasterEgg ? ' ronaldo ' : (event.boulders[num]?.[userDataObj.name]?.crossed ? ' bg-gray-100 ' : ' bg-yellow-300'))}>
                <div className='flex flex-row justify-between items-center text-center'>
                    <h1 className='text-3xl'>{String(num).padStart(2, '0')}</h1>
                    <div className='text-3xl flex-1 text-center'>{scoreText}</div>
                    <h1 className='pe-1 font-semibold text-base'>{event.boulders[num]?.[userDataObj.name]?.difficulty}{event.boulders[num]?.[userDataObj.name]?.difficulty ? '/5 ' : ''}{event.boulders[num]?.[userDataObj.name]?.difficulty ? (
                         <i className="fa-solid fa-fire"></i>
                    ) : (<div className='w-10'></div>)}</h1>
                </div>
                {event.boulders[num]?.[userDataObj.name]?.note ? (
                    <p className={'p-2 rounded-lg text-wrap ' + (merijnEasterEgg ? ' ronaldonotes ' : (event.boulders[num]?.[userDataObj.name]?.crossed ? ' bg-gray-50 ' : ' bg-yellow-100'))}>{event.boulders[num]?.[userDataObj.name]?.note}</p>
                ) : ''}
            </div>
        </Link>
    )
}
