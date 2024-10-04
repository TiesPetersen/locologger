import { BoulderProvider } from "@/context/BoulderContext";

export default function BoulderLayout({ children }) {
    return (
        <BoulderProvider>
            {children}
        </BoulderProvider>
    )
}