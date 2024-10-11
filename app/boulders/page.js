'use client'

import BoulderCard from "@/components/BoulderCard"
import Instruction from "@/components/Instruction"
import Loading from "@/components/Loading"
import Main from "@/components/Main"
import { useEvent } from "@/context/EventContext"

export default function Boulders() {
    const { event, eventLoading } = useEvent()

    let boulderCount = []

    if (!eventLoading && event) {
        boulderCount = [...Array(event.numberOfBoulders).keys()].map(i => i+1)
    } else {
        return (
            <main className='flex-1 flex flex-col p-4 sm:p-8'>
                <Loading/>
            </main>
        )
    }


    return (
        <Main>
            <div className='flex flex-col flex-1 gap-2 pb-16'>
                <Instruction id='boulders' />
                <Instruction id='menuinfo' />
                {boulderCount.map((boulderNumber, boulderNumberIndex) => {
                    return (
                        <BoulderCard key={boulderNumber} num={boulderNumber}/>
                    )
                })}
            </div>
        </Main>
  )
}
