'use client'

import { useAuth } from '@/context/AuthContext'
import React, {useState} from 'react'
import ScoreButton from './SelectButton'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Button from './Button'
import { useRouter } from 'next/navigation'
import UserCard from './UserCard'
import { useBoulder } from '@/context/BoulderContext'
import Loading from './Loading'

export default function BoulderInfo(props) {
    const router = useRouter()
    const { boulderNumber } = props
    const { refreshDataObj, currentUser, userDataObj, setUserDataObj } = useAuth()
    const { boulders, setBoulders, bouldersLoading } = useBoulder()
    let commentTemp = ''
    if (userDataObj.boulders?.[boulderNumber]?.comment){
        commentTemp = userDataObj.boulders?.[boulderNumber]?.comment
    } 
    const [ commentField, setCommentField] = useState(commentTemp)

    async function handleScoreChange(type){
        try {
            const newData = {...userDataObj}
            if (!newData?.boulders){
                newData['boulders'] = {}
            }
            if (!newData?.boulders?.[boulderNumber]){
                newData['boulders'][boulderNumber] = {}
            }
            if (!newData?.boulders?.[boulderNumber]?.score){
                newData['boulders'][boulderNumber]['score'] = ''
            }

            if (newData['boulders'][boulderNumber]['score'].includes(type)) {
                newData['boulders'][boulderNumber]['score'] = newData['boulders'][boulderNumber]['score'].replace(type, '')
            } else {
                newData['boulders'][boulderNumber]['score'] += type
            }

            if (newData['boulders'][boulderNumber]['score'].includes('T') && !newData['boulders'][boulderNumber]['score'].includes('Z')) {
                newData['boulders'][boulderNumber]['score'] += 'Z'
            }
            if (newData['boulders'][boulderNumber]['score'].includes('F') && !newData['boulders'][boulderNumber]['score'].includes('T')) {
                newData['boulders'][boulderNumber]['score'] += 'T'
            }
            if (newData['boulders'][boulderNumber]['score'].includes('F') && !newData['boulders'][boulderNumber]['score'].includes('Z')) {
                newData['boulders'][boulderNumber]['score'] += 'Z'
            }

            setUserDataObj(newData)
            
            const docRef = doc(db, 'users', currentUser.uid)
            const res = await setDoc(docRef, {
                boulders: {
                    [boulderNumber]: {
                        score: newData['boulders'][boulderNumber]['score']
                    }
                }
            }, { merge: true })

            const newBoulders = {...boulders}
            if (!newBoulders?.[boulderNumber]){
                newBoulders[boulderNumber] = {}
            }
            if (!newBoulders?.[boulderNumber]?.[userDataObj.name]) {
                newBoulders[boulderNumber][userDataObj.name] = ''
            }

            newBoulders[boulderNumber][userDataObj.name] = newData['boulders'][boulderNumber]['score']

            setBoulders(newBoulders)

            const docRef2 = doc(db, 'boulders', String(boulderNumber))
            console.log(newBoulders[boulderNumber][userDataObj.name])
            const res2 = await setDoc(docRef2, {
                [userDataObj.name]: newBoulders[boulderNumber][userDataObj.name]
            }, { merge: true })

        } catch(err) {
            console.log('Failed to change score', err.message)
        } 
    }

    async function handleDifficultyChange(number) {
        try {
            const newData = {...userDataObj}
            if (!newData?.boulders){
                newData['boulders'] = {}
            }
            if (!newData?.boulders?.[boulderNumber]){
                newData['boulders'][boulderNumber] = {}
            }
            if (!newData?.boulders?.[boulderNumber]?.difficulty){
                newData['boulders'][boulderNumber]['difficulty'] = ''
            }

            if (newData?.boulders?.[boulderNumber]?.difficulty == number){
                newData['boulders'][boulderNumber]['difficulty'] = ''
            } else {
                newData['boulders'][boulderNumber]['difficulty'] = number
            }

            setUserDataObj(newData)
            
            const docRef = doc(db, 'users', currentUser.uid)
            const res = await setDoc(docRef, {
                boulders: {
                    [boulderNumber]: {
                        difficulty: newData['boulders'][boulderNumber]['difficulty']
                    }
                }
            }, { merge: true })
        } catch(err) {
            console.log('Failed to change difficulty ', err.message)
        } 
    }

    async function handleCommentChange() {
        try {
            const newData = {...userDataObj}
            if (!newData?.boulders){
                newData['boulders'] = {}
            }
            if (!newData?.boulders?.[boulderNumber]){
                newData['boulders'][boulderNumber] = {}
            }
            if (!newData?.boulders?.[boulderNumber]?.comment){
                newData['boulders'][boulderNumber]['comment'] = ''
            }

            newData['boulders'][boulderNumber]['comment'] = commentField

            setUserDataObj(newData)
            
            const docRef = doc(db, 'users', currentUser.uid)
            const res = await setDoc(docRef, {
                boulders: {
                    [boulderNumber]: {
                        comment: newData['boulders'][boulderNumber]['comment']
                    }
                }
            }, { merge: true })
        } catch(err) {
            console.log('Failed to change comment ', err.message)
        } finally{
            router.push("/boulders")
        }
    }

    if (bouldersLoading && !boulders) {
        return (
            <main className='flex-1 flex flex-col p-4 sm:p-8'>
                <Loading/>
            </main>  
        )
    }

    let noOther = true
    if (boulders?.[boulderNumber]){
        for (let i=0; i < Object.keys(boulders?.[boulderNumber]).length; i++){
            if (Object.keys(boulders?.[boulderNumber])[i] === userDataObj.name){
                continue
            }

            if (boulders?.[boulderNumber][Object.keys(boulders?.[boulderNumber])[i]].length > 0){
                noOther = false
            }
        }   
    }

    return (
        <div className={'flex flex-col flex-1 gap-8 p-3 rounded-lg pb-16'}>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-5xl'>{String(boulderNumber).padStart(2, '0')}</h1>
                <div className={'text-5xl flex flex-row justify-between w-full ' + (String(boulderNumber).split('1').length-1 === 1 ? ' ps-11 ' : '') + (String(boulderNumber).split('1').length-1 === 2 ? ' ps-14 ' : '') + ' ps-9'}>
                    <ScoreButton clickHandler={() => handleScoreChange('T')} active={userDataObj.boulders?.[boulderNumber]?.score?.includes('T') ? true : false} type='T'/>
                    <ScoreButton clickHandler={() => handleScoreChange('Z')} active={userDataObj.boulders?.[boulderNumber]?.score?.includes('Z') ? true : false} type='Z'/>
                    <ScoreButton clickHandler={() => handleScoreChange('F')} active={userDataObj.boulders?.[boulderNumber]?.score?.includes('F') ? true : false} type='F'/>
                </div>
                
            </div>
            <div className='flex flex-row justify-between items-center text-lg'>
                <h1 className='pb-1'>difficulty</h1>
                <div className='flex flex-row flex-1 justify-between ps-6'>
                    <ScoreButton clickHandler={() => handleDifficultyChange(1)} active={userDataObj.boulders?.[boulderNumber]?.difficulty === 1 ? true : false} type='1'/>
                    <ScoreButton clickHandler={() => handleDifficultyChange(2)} active={userDataObj.boulders?.[boulderNumber]?.difficulty === 2 ? true : false} type='2'/>
                    <ScoreButton clickHandler={() => handleDifficultyChange(3)} active={userDataObj.boulders?.[boulderNumber]?.difficulty === 3 ? true : false} type='3'/>
                    <ScoreButton clickHandler={() => handleDifficultyChange(4)} active={userDataObj.boulders?.[boulderNumber]?.difficulty === 4 ? true : false} type='4'/>
                    <ScoreButton clickHandler={() => handleDifficultyChange(5)} active={userDataObj.boulders?.[boulderNumber]?.difficulty === 5 ? true : false} type='5'/>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-row justify-between items-center text-lg'>
                    <div className='flex flex-col items-center'>
                        <h1 className=''>comment</h1>
                        <h1 className='text-xs font-light'>(private)</h1>
                    </div>
                    <div className='ps-4 w-full flex flex-col items-end	'>
                        <textarea type='text' className='bg-yellow-100 p-3 rounded-lg w-full h-48'  value={commentField} onChange={(e) => {
                            setCommentField(e.target.value)
                        }}/>
                    </div>
                </div>
                {(commentField === userDataObj?.boulders?.[boulderNumber]?.comment || (!userDataObj?.boulders?.[boulderNumber]?.comment && !commentField)) ? '' : (
                <div className='flex flex-col items-end'>
                    <Button clickHandler={handleCommentChange} text='save comment.'/>
                </div>
                )}

            </div>

            <div className='bg-slate-800 w-full h-0.5 rounded-full'></div>
            {noOther ?  (
                <h1 className='text-slate-400 text-center'>no other climbers managed to get points on the boulder.</h1>
            ) : (
                <div className='flex flex-col flex-1 gap-2'>
                {Object.keys(boulders?.[boulderNumber] || []).map((user, userIndex) => {
                    if (user === userDataObj.name || boulders?.[boulderNumber][user] === '') {
                        return
                    }
                    let scoreText = ''

                    if (boulders?.[boulderNumber][user].includes('F')) {
                        scoreText = 'flash'
                    } else if (boulders?.[boulderNumber][user].includes('T')) {
                        scoreText = 'top'
                    } else if (boulders?.[boulderNumber][user].includes('Z')) {
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
