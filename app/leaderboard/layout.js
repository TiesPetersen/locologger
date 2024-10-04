import { BoulderProvider } from "@/context/BoulderContext";

export default function LeaderboardLayout({ children }) {
    return (
        <BoulderProvider>
            {children}
        </BoulderProvider>
    )
}