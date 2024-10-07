'use client'

import { useAuth } from '@/context/AuthContext'
import Button from './Button'
import React, {useState} from 'react'
import { redirect } from 'next/navigation'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export default function Login() {
    const [cat, setCat] = useState('men')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registering, setRegistering] = useState(true)
    const [authenticating, setAuthenticating] = useState(0)
    // 0 -> false
    // 1 -> true
    // 10 -> username fail
    // 11 -> email fail
    // 12 -> password fail

    const {signup, login, currentUser} = useAuth()

    async function handleSumbit() {
        setAuthenticating(1)

        if (registering && (!username || username.length>40 || username.length<6)) {
            setAuthenticating(10)
            return
        }

        if (registering && (!cat)) {
            setAuthenticating(13)
            return
        }

        if (!email || email.length<6 || email.length>40){
            setAuthenticating(11)
            return
        }

        if (!password || password.length<6 || password.length>40) {
            setAuthenticating(12)
            return
        }
    
        try {
            if (registering) {
                const newUser = await signup(email, password)

                const docRef = doc(db, 'users', newUser.user.uid)
                console.log("WRITING users/uid NEW DOC")
                const res = await setDoc(docRef, {name: username, cat: cat})
            } else {
                await login(email, password)
            }
        } catch(err) {
            console.log(err.message)
        } finally {
            setAuthenticating(0)
        }
        
      }

    return (
        <div className='flex flex-col flex-1 justify-center items-center gap-4'>
            <div>
                <h3 className='text-4xl sm:text-5xl md:text-6xl text-center'>{registering ? 'register.' : 'log in.'}</h3>
                <p className='py-1'>{registering ? 'be precise, this info cannot be changed afterwards.' : ''}</p>
            </div>
            {registering ? (
                <select onChange={(e) => {
                    setCat(e.target.value)
                }} name='cat' className={'w-full text-base max-w-[400px] mx-auto px-3 duration-200 focus:border-slate-800 py-2 sm:py-3 border border-solid rounded-lg outline-none ' + (authenticating === 13 ? ' border-red-600 ' : ' border-yellow-300 ')}>
                    <option value='men'>i will participate in the men's category</option>
                    <option value='women'>i will participate in the women's category</option>
                </select>
            ) : ''}
            {registering ? (
                <input value={username} onChange={(e) => {
                    setUsername(e.target.value.replace(/[^a-zA-Z ]/, "").toLowerCase())
                }} type='text' className={'text-base w-full max-w-[400px] mx-auto px-3 duration-200 focus:border-slate-800 py-2 sm:py-3 border border-solid rounded-lg outline-none' + (authenticating === 10 ? ' border-red-600 ' : ' border-yellow-300 ')} placeholder='full name' />) : ''}
            <input value={email} onChange={(e) => {
                setEmail(e.target.value)
            }} className={'text-base w-full max-w-[400px] mx-auto px-3 duration-200 focus:border-slate-800 py-2 sm:py-3 border border-solid rounded-lg outline-none' + (authenticating === 11 ? ' border-red-600 ' : ' border-yellow-300 ')} placeholder='email' />
            <input value={password} onChange={(e) => {
                setPassword(e.target.value)
            }} className={'text-base w-full max-w-[400px] mx-auto px-3 duration-200 focus:border-slate-800 py-2 sm:py-3 border border-solid rounded-lg outline-none ' + (authenticating === 12 ? ' border-red-600 ' : ' border-yellow-300 ')} placeholder='password' type='password'/>
            {registering ? (
                <p className='text-slate-400 font-light' >minimum length of each field is 6.</p>
            ): ''}
            <Button text={authenticating === 1 ? 'submitting.' : 'submit.'} clickHandler={handleSumbit}/>
            <p className='text-center' >{registering ? 'already have an account? ' : "don't have an account? "} <button onClick={() => setRegistering(!registering)}><span className='font-bold'>{registering ? 'log in.' : 'register.'}</span></button></p>
        </div>
    )
}
