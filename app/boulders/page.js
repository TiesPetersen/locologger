import BoulderCard from "@/components/BoulderCard"
import Main from "@/components/Main"

export default function Boulders() {

    const boulderCount = [...Array(30).keys()].map(i => i+1)

    return (
        <Main>
            <div className='flex flex-col flex-1 gap-2 pb-16'>
                {boulderCount.map((boulderNumber, boulderNumberIndex) => {
                    return (
                        <BoulderCard key={boulderNumber} num={boulderNumber}/>
                    )
                })}
            </div>
        </Main>
  )
}
