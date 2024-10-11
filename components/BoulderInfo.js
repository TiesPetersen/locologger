'use client'

import { useAuth } from '@/context/AuthContext'
import React, {useState} from 'react'
import ScoreButton from './SelectButton'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Button from './Button'
import { useRouter } from 'next/navigation'
import UserCard from './UserCard'
import { useEvent } from '@/context/EventContext'
import Loading from './Loading'
import Instruction from './Instruction'

export default function BoulderInfo(props) {
    const router = useRouter()
    const { boulderNumber } = props
    const { currentUser, userDataObj, setUserDataObj } = useAuth()
    const { event, setEvent, eventLoading } = useEvent()

    let noteTemp = ''
    if (event.boulders[boulderNumber]?.[userDataObj.name]?.note){
        noteTemp = event.boulders[boulderNumber]?.[userDataObj.name]?.note
    } 
    const [ noteField, setNoteField] = useState(noteTemp)

    async function handleScoreChange(type){
        try {
            const newEvent = {...event}
            if (!newEvent.boulders[boulderNumber]) {
                newEvent.boulders[boulderNumber] = {}
            }
            if (!newEvent.boulders[boulderNumber][userDataObj.name]) {
                newEvent.boulders[boulderNumber][userDataObj.name] = {}
            }
            if (!newEvent.boulders[boulderNumber][userDataObj.name].score) {
                newEvent.boulders[boulderNumber][userDataObj.name].score = ''
                newEvent.boulders[boulderNumber][userDataObj.name].category = ''
            }

            if (newEvent.boulders[boulderNumber][userDataObj.name].score === type) {
                newEvent.boulders[boulderNumber][userDataObj.name].score = ''
            } else {
                newEvent.boulders[boulderNumber][userDataObj.name].score = type
                newEvent.boulders[boulderNumber][userDataObj.name].category = userDataObj.category
            }
            
            // TODO what if you select TOP if you already have the flash?

            setEvent(newEvent)

            const docRef = doc(db, 'events', process.env.NEXT_PUBLIC_CURRENT_EVENT)
            console.log("WRITING events/event/boulders/num/name SCORE")
            const res = await setDoc(docRef, {
                boulders: {
                    [boulderNumber]: {
                        [userDataObj.name]: {
                            score: newEvent.boulders[boulderNumber][userDataObj.name].score,
                            category: newEvent.boulders[boulderNumber][userDataObj.name].category
                        }
                    }
                }
            }, { merge: true })            

            // Crossed off if T or F
            if ((type === 'F' || type === 'T') && !newEvent.boulders[boulderNumber][userDataObj.name].crossed) {
                handleCrossedChange(false)
            }

        } catch(err) {
            console.log('Failed to change score ', err.message)
        } 
    }

    async function handleDifficultyChange(number) {
        try {
            const newEvent = {...event}
            if (!newEvent.boulders[boulderNumber]) {
                newEvent.boulders[boulderNumber] = {}
            }
            if (!newEvent.boulders[boulderNumber][userDataObj.name]) {
                newEvent.boulders[boulderNumber][userDataObj.name] = {}
            }
            if (!newEvent.boulders[boulderNumber][userDataObj.name].difficulty) {
                newEvent.boulders[boulderNumber][userDataObj.name].difficulty = ''
            }

            if (newEvent.boulders[boulderNumber][userDataObj.name].difficulty === number) {
                newEvent.boulders[boulderNumber][userDataObj.name].difficulty = ''
            } else {
                newEvent.boulders[boulderNumber][userDataObj.name].difficulty = number
            }
            
            setEvent(newEvent)

            const docRef = doc(db, 'events', process.env.NEXT_PUBLIC_CURRENT_EVENT)
            console.log("WRITING events/event/boulders/num/name DIFFICULTY")
            const res = await setDoc(docRef, {
                boulders: {
                    [boulderNumber]: {
                        [userDataObj.name]: {
                            difficulty: newEvent.boulders[boulderNumber][userDataObj.name].difficulty
                        }
                    }
                }
            }, { merge: true })            

        } catch(err) {
            console.log('Failed to change difficulty ', err.message)
        } 
    }

    async function handleNoteChange() {
        try {
            const newEvent = {...event}
            if (!newEvent.boulders[boulderNumber]) {
                newEvent.boulders[boulderNumber] = {}
            }
            if (!newEvent.boulders[boulderNumber][userDataObj.name]) {
                newEvent.boulders[boulderNumber][userDataObj.name] = {}
            }
            if (!newEvent.boulders[boulderNumber][userDataObj.name].note) {
                newEvent.boulders[boulderNumber][userDataObj.name].note = ''
            }

            newEvent.boulders[boulderNumber][userDataObj.name].note = noteField

            setEvent(newEvent)

            const docRef = doc(db, 'events', process.env.NEXT_PUBLIC_CURRENT_EVENT)
            console.log("WRITING events/event/boulders/num/name NOTE")
            const res = await setDoc(docRef, {
                boulders: {
                    [boulderNumber]: {
                        [userDataObj.name]: {
                            note: newEvent.boulders[boulderNumber][userDataObj.name].note
                        }
                    }
                }
            }, { merge: true })            

        } catch(err) {
            console.log('Failed to change note ', err.message)
        } finally {
            router.push("/boulders")
        }
    }

    async function handleCrossedChange(redirect) {
        try {
            const newEvent = {...event}
            if (!newEvent.boulders[boulderNumber]) {
                newEvent.boulders[boulderNumber] = {}
            }
            if (!newEvent.boulders[boulderNumber][userDataObj.name]) {
                newEvent.boulders[boulderNumber][userDataObj.name] = {}
            }
            if (!newEvent.boulders[boulderNumber][userDataObj.name].crossed) {
                newEvent.boulders[boulderNumber][userDataObj.name].crossed = false
            }

            newEvent.boulders[boulderNumber][userDataObj.name].crossed = !newEvent.boulders[boulderNumber][userDataObj.name].crossed

            setEvent(newEvent)

            const docRef = doc(db, 'events', process.env.NEXT_PUBLIC_CURRENT_EVENT)
            console.log("WRITING events/event/boulders/num/name CROSSED")
            const res = await setDoc(docRef, {
                boulders: {
                    [boulderNumber]: {
                        [userDataObj.name]: {
                            crossed: newEvent.boulders[boulderNumber][userDataObj.name].crossed
                        }
                    }
                }
            }, { merge: true })            
        } catch(err) {
            console.log('Failed to change crossed ', err.message)
        } finally{
            if (redirect) {
                router.push("/boulders")
            }
        }
    }

    let noOther = true
    if (event.boulders[boulderNumber]){
        for (let i=0; i < Object.keys(event.boulders[boulderNumber]).length; i++){
            if (Object.keys(event.boulders[boulderNumber])[i] === userDataObj.name){
                continue
            }

            if (event.boulders[boulderNumber][Object.keys(event.boulders[boulderNumber])[i]].score.length > 0){
                noOther = false
            }
        }   
    }

    let userScoreElements = ''
    if (event.boulders[boulderNumber]?.[userDataObj.name]?.score) {
        if (event.boulders[boulderNumber]?.[userDataObj.name]?.score === 'F') {
            userScoreElements += 'F'
        }
        if (event.boulders[boulderNumber]?.[userDataObj.name]?.score === 'T' || event.boulders[boulderNumber]?.[userDataObj.name]?.score === 'F') {
            userScoreElements += 'T'
        }
        if (event.boulders[boulderNumber]?.[userDataObj.name]?.score === 'Z' || event.boulders[boulderNumber]?.[userDataObj.name]?.score === 'T' || event.boulders[boulderNumber]?.[userDataObj.name]?.score === 'F') {
            userScoreElements += 'Z'
        }
    }

    return (
        <div className={'flex flex-col flex-1 gap-4 p-3 rounded-lg pb-16'}>
            <Instruction id='topzoneflash' />
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-5xl'>{String(boulderNumber).padStart(2, '0')}</h1>
                <div className={'text-5xl flex flex-row justify-between w-full ' + (String(boulderNumber).split('1').length-1 === 1 ? ' ps-11 ' : '') + (String(boulderNumber).split('1').length-1 === 2 ? ' ps-14 ' : '') + (String(boulderNumber).split('1').length-1 === 0 ? ' ps-9 ' : '')}>
                    <ScoreButton clickHandler={() => handleScoreChange('T')} active={userScoreElements.includes('T') ? true : false} type='T'/>
                    <ScoreButton clickHandler={() => handleScoreChange('Z')} active={userScoreElements.includes('Z') ? true : false} type='Z'/>
                    <ScoreButton clickHandler={() => handleScoreChange('F')} active={userScoreElements.includes('F') ? true : false} type='F'/>
                </div>
            </div>
            <Instruction id='difficulty' />
            <div className='flex flex-row justify-between items-center text-lg'>
                <h1 className='pb-1'>difficulty</h1>
                <div className='flex flex-row flex-1 justify-between ps-6'>
                    <ScoreButton clickHandler={() => handleDifficultyChange(1)} active={event.boulders[boulderNumber]?.[userDataObj.name]?.difficulty === 1 ? true : false} type='1'/>
                    <ScoreButton clickHandler={() => handleDifficultyChange(2)} active={event.boulders[boulderNumber]?.[userDataObj.name]?.difficulty === 2 ? true : false} type='2'/>
                    <ScoreButton clickHandler={() => handleDifficultyChange(3)} active={event.boulders[boulderNumber]?.[userDataObj.name]?.difficulty === 3 ? true : false} type='3'/>
                    <ScoreButton clickHandler={() => handleDifficultyChange(4)} active={event.boulders[boulderNumber]?.[userDataObj.name]?.difficulty === 4 ? true : false} type='4'/>
                    <ScoreButton clickHandler={() => handleDifficultyChange(5)} active={event.boulders[boulderNumber]?.[userDataObj.name]?.difficulty === 5 ? true : false} type='5'/>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <Instruction id='note' />
                <div className='flex flex-row justify-between items-center text-lg'>
                    <div className='flex flex-col items-center'>
                        <h1 className=''>notes</h1>
                        <h1 className='text-xs font-light'>(private)</h1>
                    </div>
                    <div className='ps-4 w-full flex flex-col items-end	'>
                        <textarea type='text' className='bg-yellow-100 p-3 rounded-lg w-full h-48'  value={noteField} onChange={(e) => {
                            setNoteField(e.target.value)
                        }}/>
                    </div>
                </div>
                <Instruction id='mark' />
                <div className={'flex ' + (((noteField === event.boulders[boulderNumber]?.[userDataObj.name]?.note || (!event.boulders[boulderNumber]?.[userDataObj.name]?.note && !noteField))) ? ' flex-col ' : ' flex-row justify-between gap-2' )}>
                    <Button clickHandler={() => handleCrossedChange(true)} text={(event.boulders[boulderNumber]?.[userDataObj.name]?.crossed ? 'undo cross off.' : 'cross off.')}/>
                    {((noteField === event.boulders[boulderNumber]?.[userDataObj.name]?.note || (!event.boulders[boulderNumber]?.[userDataObj.name]?.note && !noteField))) ? '' : (
                        <Button clickHandler={handleNoteChange} text='save notes.' />
                    )}
                </div>

            </div>

            <div className='bg-slate-800 w-full h-0.5 rounded-full'></div>
            <Instruction id='others' />
            {noOther ?  (
                <h1 className='text-slate-400 text-center'>no other climbers managed to get points on the boulder.</h1>
            ) : (
                <div className='flex flex-col flex-1 gap-2'>
                {Object.keys(event.boulders[boulderNumber] || []).map((user, userIndex) => {
                    if (user === userDataObj.name || event.boulders[boulderNumber][user].score === '') {
                        return
                    }
                    let scoreText = ''

                    if (event.boulders[boulderNumber][user].score === 'F') {
                        scoreText = 'flash'
                    } else if (event.boulders[boulderNumber][user].score === 'T') {
                        scoreText = 'top'
                    } else if (event.boulders[boulderNumber][user].score === 'Z') {
                        scoreText = 'zone'
                    }

                    return (
                        <UserCard key={userIndex} content={scoreText} user={user}/>
                    )
                })}
            </div>
            )}
            
        </div>
    )
}
