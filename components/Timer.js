'use client'

import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'


export default function Timer() {
    const [diff, setDiff] = useState(0)
    const [timerState, setTimerState] = useState('running')
    const pathname = usePathname()

    function updateTimer() {
        const locoStart = Date.UTC(2024, 9, 12, 11, 0, 0) // in UTC
        const locoEnd = Date.UTC(2024, 9, 12, 16, 30, 0) // in UTC
        const nowUTC = new Date().getTime()
      
        let difference = new Date(locoEnd - nowUTC).getTime()
      
        let timerStateNew = 'running'
        if (locoStart > nowUTC) {
            timerStateNew = 'not started'
        }
        if (nowUTC > locoEnd) {
            timerStateNew = 'ended'
        }

        setDiff(difference)
        setTimerState(timerStateNew)
    }

    useEffect(() => {
        updateTimer()
    }, [pathname])


    return (
        <div>
            {timerState === 'not started' ? (
            <h1>loco hasn&apos;t started yet.</h1>
            ) : ''}
            {timerState === 'running' ? (
            <h1>
                {Math.floor(diff/(60000*60)) % 60}h {Math.floor(diff/(60000)) % 60}m left.
            </h1>
            ): ''}
            {timerState === 'ended' ? (
            <h1>loco has ended.</h1>
            ): ''}
      </div>
    )
}
