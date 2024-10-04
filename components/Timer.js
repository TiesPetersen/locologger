'use client'

import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'


export default function Timer() {
    const [diff, setDiff] = useState(0)
    const [nowT, setNowT] = useState(new Date())
    const [timerState, setTimerState] = useState('running')
    const pathname = usePathname()

    function updateTimer() {
        const locoStart = Date.parse('4 Oct 2024 23:40+02:00')
        const locoEnd = Date.parse('5 Oct 2024 02:00+02:00')
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
            {diff},
            {nowT.toTimeString()},
            {nowT.getUTCHours()}
      </div>
    )
}
