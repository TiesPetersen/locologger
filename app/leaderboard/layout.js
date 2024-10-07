import { LeaderboardProvider } from "@/context/LeaderboardContext";

export default function LeaderboardLayout({ children }) {
    return (
        <LeaderboardProvider>
            {children}
        </LeaderboardProvider>
    )
}