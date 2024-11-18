import React, {useState} from 'react'

export default function SelectButton(props) {
    const {active, type, clickHandler } = props

    return (
        <button onClick={clickHandler} className={'border border-slate-900 px-3 py-2 rounded-lg ' + (active ? ' bg-slate-900 text-yellow-300 ' : '')}>
            {type}
        </button>
    )
}
