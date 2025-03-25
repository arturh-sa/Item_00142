"use client"

import {Button} from "@/components/ui/button"

import {useState, useEffect} from "react"
import {useRouter} from "next/navigation"
import {Badge} from "@/components/ui/badge"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useToast} from "@/hooks/use-toast"
import {MoreVertical, Trophy, Calendar, CheckCircle2} from "lucide-react"
import {useChallenges} from "@/hooks/use-challenges"
import {formatDate} from "@/lib/utils"
import DeleteChallengeDialog from "./delete-challenge-dialog"
import Link from "next/link"

export default function ChallengeList() {
    const {challenges, deleteChallenge, addChallenge} = useChallenges()
    const [filter, setFilter] = useState<string>("all")
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
            <div className="flex justify-end mb-4">
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter challenges"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Challenges</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {filteredChallenges.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-muted-foreground mb-4">No challenges found</h3>
                    <p className="text-muted-foreground mb-6">
                        {filter !== "all"
                            ? `No ${filter} challenges found. Try a different filter or create a new challenge.`
                            : "Create your first challenge to get started!"}
                    </p>
                    {filter !== "all" && (
                        <Button variant="outline" onClick={() => setFilter("all")}>
                            Show All Challenges
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredChallenges.map((challenge) => (
                        <Card key={challenge.id} className="flex flex-col">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl">{challenge.title}</CardTitle>
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
                            <CardContent className="flex-grow">
                                <div className="mb-4">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Progress</span>
                                        <span className="text-sm font-medium">{challenge.progress}%</span>
                                    </div>
                                    <Progress value={challenge.progress} className="h-2"/>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {challenge.milestones.map((milestone) => (
                                        <Badge
                                            key={milestone.id}
                                            variant={milestone.achieved ? "default" : "outline"}
                                            className="flex items-center gap-1"
                                        >
                                            <Trophy className="h-3 w-3"/>
                                            {milestone.title}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="pt-2 border-t">
                                <div className="flex items-center justify-between w-full">
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
                    ))}
                </div>
            )}

            <DeleteChallengeDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}
                                   onConfirm={confirmDelete}/>
        </div>
    )
}

