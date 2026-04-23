import { redirect } from "next/navigation"

// [307] Redirect "/" to "/home"

export default function Page() {
  redirect("/home")
}