import LeaderBoard from "@/components/LeaderBoard"
import Main from "@/components/Main"

export const metadata = {
    title: "LOCO Logger - Leaderboard",
}

export default function LeaderboardPage() {
    return (
        <Main>
            <div className='pb-16'>
                <LeaderBoard />
            </div>
        </Main>
    )
}
