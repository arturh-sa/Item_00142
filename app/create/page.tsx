import Link from "next/link"
import {Button} from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"
import ChallengeForm from "@/components/challenge-form"
import Navbar from "@/components/navbar"

export default function CreateChallengePage() {
    return (
        <>
            <Navbar/>
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="pl-0">
                            <ArrowLeft className="mr-2 h-4 w-4"/>
                            Back to Challenges
                        </Button>
                    </Link>
                </div>

                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Create New Challenge</h1>
                    <ChallengeForm/>
                </div>
            </main>
        </>
    )
}

