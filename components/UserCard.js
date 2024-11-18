import React from 'react'

export default function UserCard(props) { 
    const { content, user, border } = props

    let podium = false
    if (user.includes('1. ') || user.includes('2. ') || user.includes('3. ') || !user.includes('.')) {
        podium = true
    }

    return (
        <div className={'p-2 rounded-lg flex flex-row justify-between items-center ' + (podium ? 'bg-yellow-300' : 'bg-yellow-200') + (border ? ' border border-2 border-slate-800 ' : '')}>
            <h1 className='ps-2 text-lg font-semibold'>
                {user}
            </h1>
            <h1 className='pe-2 text-lg'>
                {content}
            </h1>
        </div>
    )
}
