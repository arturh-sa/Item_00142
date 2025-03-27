"use client"

import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"
import {Badge} from "@/components/ui/badge"
import {Calendar, Trophy, Edit} from "lucide-react"
import {formatDate} from "@/lib/utils"
import CheckInForm from "@/components/check-in-form"
import CheckInHistory from "@/components/check-in-history"
import {useChallenges} from "@/hooks/use-challenges"
import {useEffect, useState} from "react"
import type {Challenge} from "@/lib/types"

interface ChallengeDetailContentProps {
    challenge: Challenge
}

export default function ChallengeDetailContent({challenge: initialChallenge}: ChallengeDetailContentProps) {
    const {challenges} = useChallenges()
    const [challenge, setChallenge] = useState<Challenge>(initialChallenge)

    // Update the challenge when it changes in the context
    useEffect(() => {
        const updatedChallenge = challenges.find((c) => c.id === initialChallenge.id)
        if (updatedChallenge) {
            setChallenge(updatedChallenge)
        }
    }, [challenges, initialChallenge.id])

    // Group milestones by achievement status
    const achievedMilestones = challenge.milestones.filter((m) => m.achieved)
    const upcomingMilestones = challenge.milestones.filter((m) => !m.achieved)

    return (
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

                            {achievedMilestones.length > 0 && (
                                <div className="mb-3">
                                    <h4 className="text-sm text-muted-foreground mb-2">Achieved</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {achievedMilestones.map((milestone) => (
                                            <Badge
                                                key={milestone.id}
                                                variant="default"
                                                className="flex items-center gap-1 text-sm py-1.5 px-2.5"
                                            >
                                                <Trophy className="h-3.5 w-3.5"/>
                                                {milestone.title} ({milestone.threshold}%)
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {upcomingMilestones.length > 0 && (
                                <div>
                                    <h4 className="text-sm text-muted-foreground mb-2">Upcoming</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {upcomingMilestones.map((milestone) => (
                                            <Badge
                                                key={milestone.id}
                                                variant="outline"
                                                className="flex items-center gap-1 text-sm py-1.5 px-2.5"
                                            >
                                                <Trophy className="h-3.5 w-3.5"/>
                                                {milestone.title} ({milestone.threshold}%)
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
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
    )
}

