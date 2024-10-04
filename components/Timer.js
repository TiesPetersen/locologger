'use client'

import React from 'react'

export default function Timer() {
    const locoStart = Date.parse('4 Oct 2024 23:40+02:00')
    const locoEnd = Date.parse('5 Oct 2024 01:01+02:00')
    const nowUTC = new Date().getTime()
  
    const diff = new Date(locoEnd - nowUTC)
  
    let timerState = 'running'
    if (locoStart > nowUTC) {
      timerState = 'not started'
    }
    if (nowUTC > locoEnd) {
      timerState = 'ended'
    }

    return (
        <div>
            {timerState === 'not started' ? (
            <h1>loco hasn&apos;t started yet.</h1>
            ) : ''}
            {timerState === 'running' ? (
            <h1>
                {diff.getUTCHours()}h {diff.getUTCMinutes()}m left.
            </h1>
            ): ''}
            {timerState === 'ended' ? (
            <h1>loco has ended.</h1>
            ): ''}
      </div>
    )
}
