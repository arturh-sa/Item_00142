import Navbar from "@/components/navbar"
import {Button} from "@/components/ui/button"
import {PlusCircle} from "lucide-react"
import Link from "next/link"
import ChallengeList from "@/components/challenge-list"

export default function Home() {
    return (
        <>
            <Navbar/>
            <main className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">My Challenges</h1>
                    <Link href="/create">
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4"/>
                            New Challenge
                        </Button>
                    </Link>
                </div>

                <ChallengeList/>
            </main>
        </>
    )
}

