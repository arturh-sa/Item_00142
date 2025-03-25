"use client"

import {notFound, useRouter} from "next/navigation"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"
import {Badge} from "@/components/ui/badge"
import {ArrowLeft, Calendar, Trophy, Edit} from "lucide-react"
import {formatDate} from "@/lib/utils"
import CheckInForm from "@/components/check-in-form"
import CheckInHistory from "@/components/check-in-history"
import Navbar from "@/components/navbar"
import {useChallenges} from "@/hooks/use-challenges"
import {useEffect, useState} from "react"
import {getChallengeById} from "@/lib/data"
import type {Challenge} from "@/lib/types"

interface ChallengeDetailPageProps {
    params: {
        id: string
    }
}

export default function ChallengeDetailPage({params}: ChallengeDetailPageProps) {
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
                    <Link href="/">
                        <Button variant="ghost" className="pl-0">
                            <ArrowLeft className="mr-2 h-4 w-4"/>
                            Back to Challenges
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-2xl">{challenge.title}</CardTitle>
                                    <Link href={`/edit/${challenge.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4 mr-1"/>
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <Calendar className="h-4 w-4 text-muted-foreground"/>
                                    <span className="text-sm text-muted-foreground">
                    {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
                  </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-6">{challenge.description}</p>

                                <div className="mb-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium">Progress</span>
                                        <span className="font-medium">{challenge.progress}%</span>
                                    </div>
                                    <Progress value={challenge.progress} className="h-3"/>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-medium mb-3">Milestones</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {challenge.milestones.map((milestone) => (
                                            <Badge
                                                key={milestone.id}
                                                variant={milestone.achieved ? "default" : "outline"}
                                                className="flex items-center gap-1 text-sm py-1.5 px-2.5"
                                            >
                                                <Trophy className="h-3.5 w-3.5"/>
                                                {milestone.title} ({milestone.threshold}%)
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <CheckInForm challengeId={challenge.id}/>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Check-in History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CheckInHistory checkIns={challenge.checkIns}/>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </>
    )
}

