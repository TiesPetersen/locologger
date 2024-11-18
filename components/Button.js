import React from 'react'

export default function Button(props) {
    const {text, dark, clickHandler} = props

    return (
        <button onClick={clickHandler} className={'rounded-xl overflow-hidden duration-200 hover:opacity-70 border-4 border-solid border-yellow-300 ' + (dark ? 'bg-yellow-300 ' : ' ')}>
            <p className='px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 font-semibold text-base'>{text}</p>
        </button>
    )
}
