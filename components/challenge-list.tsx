"use client"

import {Button} from "@/components/ui/button"
import {useState, useEffect} from "react"
import {useRouter} from "next/navigation"
import {Badge} from "@/components/ui/badge"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {useToast} from "@/hooks/use-toast"
import {MoreVertical, Trophy, Calendar, CheckCircle2} from "lucide-react"
import {useChallenges} from "@/hooks/use-challenges"
import {formatDate} from "@/lib/utils"
import DeleteChallengeDialog from "./delete-challenge-dialog"
import Link from "next/link"

export default function ChallengeList({filter = "all"}: { filter?: string }) {
    const {challenges, deleteChallenge, addChallenge} = useChallenges()
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [challengeToDelete, setChallengeToDelete] = useState<string | null>(null)
    const [filteredChallenges, setFilteredChallenges] = useState(challenges)
    const router = useRouter()
    const {toast} = useToast()

    // Update filtered challenges whenever the challenges or filter changes
    useEffect(() => {
        const filtered = challenges.filter((challenge) => {
            const endDate = new Date(challenge.endDate)
            const now = new Date()

            if (filter === "active") {
                // For demo purposes, consider challenges from 2023 as "active" if they're not completed
                return (endDate >= now || challenge.endDate.includes("2023")) && challenge.progress < 100
            }
            if (filter === "completed") {
                return challenge.progress >= 100
            }
            return true
        })

        setFilteredChallenges(filtered)
    }, [challenges, filter])

    const handleDeleteClick = (id: string) => {
        setChallengeToDelete(id)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (challengeToDelete) {
            const challengeToRestore = challenges.find((c) => c.id === challengeToDelete)

            // Delete the challenge
            deleteChallenge(challengeToDelete)
            setDeleteDialogOpen(false)

            if (challengeToRestore) {
                toast({
                    title: "Challenge deleted",
                    description: `"${challengeToRestore.title}" has been removed`,
                    action: (
                        <Button
                            variant="outline"
                            onClick={() => {
                                // Actually restore the challenge
                                addChallenge(challengeToRestore)

                                toast({
                                    title: "Challenge restored",
                                    description: "Your challenge has been restored",
                                })
                            }}
                        >
                            Undo
                        </Button>
                    ),
                })
            }
        }
    }

    return (
        <div>
            {filteredChallenges.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-muted-foreground mb-4">No challenges found</h3>
                    <p className="text-muted-foreground mb-6">
                        {filter !== "all"
                            ? `No ${filter} challenges found. Try a different filter or create a new challenge.`
                            : "Create your first challenge to get started!"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredChallenges.map((challenge) => {
                        // Get only achieved milestones
                        const achievedMilestones = challenge.milestones.filter((m) => m.achieved)

                        return (
                            <Card
                                key={challenge.id}
                                className="flex flex-col h-full border-2 hover:border-primary/20 transition-colors"
                            >
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl mb-1">{challenge.title}</CardTitle>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-accent">
                                                <MoreVertical className="h-4 w-4"/>
                                                <span className="sr-only">Open menu</span>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/edit/${challenge.id}`}>Edit Challenge</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive"
                                                    onClick={() => handleDeleteClick(challenge.id)}
                                                >
                                                    Delete Challenge
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Calendar className="h-4 w-4 text-muted-foreground"/>
                                        <span className="text-sm text-muted-foreground">
                      {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
                    </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow pt-2 pb-6">
                                    <div className="mb-6">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium">Progress</span>
                                            <span className="text-sm font-medium">{challenge.progress}%</span>
                                        </div>
                                        <Progress value={challenge.progress} className="h-2"/>
                                    </div>

                                    {/* Only show badges section if there are achieved milestones */}
                                    {achievedMilestones.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {achievedMilestones.map((milestone) => (
                                                <Badge key={milestone.id} variant="default"
                                                       className="flex items-center gap-1">
                                                    <Trophy className="h-3 w-3"/>
                                                    {milestone.title}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className="pt-4 border-t">
                                    <div className="flex items-center justify-between w-full gap-4">
                                        <div className="flex items-center gap-1">
                                            <CheckCircle2 className="h-4 w-4 text-muted-foreground"/>
                                            <span className="text-sm text-muted-foreground">
                        {challenge.checkIns.filter((c) => c.completed).length} check-ins
                      </span>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/challenge/${challenge.id}`}>View Details</Link>
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            )}

            <DeleteChallengeDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}
                                   onConfirm={confirmDelete}/>
        </div>
    )
}

