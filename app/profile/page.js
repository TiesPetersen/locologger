import Main from "@/components/Main"
import Profile from "@/components/Profile"
import { redirect } from "next/navigation"

export const metadata = {
    title: "LOCO Logger - Profile",
}

export default function ProfilePage() {

  return (
    <Main>
        <Profile/>
    </Main>
  )
}
