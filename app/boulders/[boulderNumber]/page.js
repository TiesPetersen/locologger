import BoulderInfo from "@/components/BoulderInfo"
import Main from "@/components/Main"

export default function BoulderPage({ params }) {
    const boulderNumber = params.boulderNumber

    return (
        <Main>
            <BoulderInfo boulderNumber={boulderNumber}/>
        </Main>
    )
}