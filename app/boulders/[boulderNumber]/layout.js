import { BoulderProvider } from "@/context/BoulderContext";
import { LeaderboardProvider } from "@/context/LeaderboardContext";

export default function BoulderLayout({ children }) {
    return (
        <LeaderboardProvider>
            <BoulderProvider>
                {children}
            </BoulderProvider>
        </LeaderboardProvider>
    )
}