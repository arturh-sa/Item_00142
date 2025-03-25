"use client"

import {notFound, useRouter} from "next/navigation"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"
import ChallengeForm from "@/components/challenge-form"
import Navbar from "@/components/navbar"
import {useChallenges} from "@/hooks/use-challenges"
import {useEffect, useState} from "react"
import {getChallengeById} from "@/lib/data"
import type {Challenge} from "@/lib/types"

interface EditChallengePageProps {
    params: {
        id: string
    }
}

export default function EditChallengePage({params}: EditChallengePageProps) {
    const {challenges} = useChallenges()
    const [challenge, setChallenge] = useState<Challenge | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Try to find the challenge in the context first
        const contextChallenge = challenges.find((c) => c.id === params.id)

        if (contextChallenge) {
            setChallenge(contextChallenge)
            setLoading(false)
            return
        }

        // If not found in context, try to get it from the data store
        const dataChallenge = getChallengeById(params.id)

        if (dataChallenge) {
            setChallenge(dataChallenge)
        }

        // Either way, we're done loading
        setLoading(false)
    }, [challenges, params.id])

    // Show loading state while we're fetching the challenge
    if (loading) {
        return (
            <>
                <Navbar/>
                <main className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center h-[60vh]">
                        <div className="text-center">
                            <h2 className="text-xl font-medium mb-2">Loading challenge...</h2>
                            <p className="text-muted-foreground">Please wait while we fetch the challenge details.</p>
                        </div>
                    </div>
                </main>
            </>
        )
    }

    // If challenge doesn't exist after loading, show 404
    if (!challenge) {
        notFound()
    }

    return (
        <>
            <Navbar/>
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href={`/challenge/${params.id}`}>
                        <Button variant="ghost" className="pl-0">
                            <ArrowLeft className="mr-2 h-4 w-4"/>
                            Back to Challenge
                        </Button>
                    </Link>
                </div>

                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Edit Challenge</h1>
                    <ChallengeForm challenge={challenge}/>
                </div>
            </main>
        </>
    )
}

