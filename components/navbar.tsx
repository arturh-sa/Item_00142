import Link from "next/link"
import {ThemeToggle} from "./theme-toggle"
import {Trophy} from "lucide-react"

export default function Navbar() {
    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Trophy className="h-6 w-6"/>
                    <span className="font-bold text-xl">Challenge Tracker</span>
                </Link>
                <div className="flex items-center">
                    <ThemeToggle/>
                </div>
            </div>
        </header>
    )
}

