"use client"

import type React from "react"

import {useState, useEffect, createContext, useContext} from "react"
import {getChallenges, addChallengeToData, updateChallengeInData, deleteChallengeFromData} from "@/lib/data"
import type {Challenge, CheckIn} from "@/lib/types"

interface ChallengesContextType {
    challenges: Challenge[]
    addChallenge: (challenge: Challenge) => void
    updateChallenge: (challenge: Challenge) => void
    deleteChallenge: (id: string) => void
    addCheckIn: (challengeId: string, checkIn: CheckIn) => void
    updateProgress: (challengeId: string, progress: number) => void
}

const ChallengesContext = createContext<ChallengesContextType | undefined>(undefined)

export function ChallengesProvider({children}: { children: React.ReactNode }) {
    const [challenges, setChallenges] = useState<Challenge[]>([])
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        // Load initial data
        if (!initialized) {
            const initialChallenges = getChallenges()
            setChallenges(initialChallenges)
            setInitialized(true)
        }
    }, [initialized])

    // Helper function to calculate progress based on completed check-ins
    const calculateProgress = (challenge: Challenge): number => {
        // For challenges with specific targets (like reading 10 books)
        if (challenge.title.includes("Read 10 Books")) {
            const completedBooks = challenge.checkIns.filter((c) => c.completed).length
            return Math.min(Math.round((completedBooks / 10) * 100), 100)
        }

        // For time-based challenges (like daily activities)
        const startDate = new Date(challenge.startDate)
        const endDate = new Date(challenge.endDate)
        const totalDays = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)))

        const completedCheckIns = challenge.checkIns.filter((c) => c.completed).length
        return Math.min(Math.round((completedCheckIns / totalDays) * 100), 100)
    }

    // Helper function to update milestones based on progress
    const updateMilestones = (challenge: Challenge, progress: number): Challenge["milestones"] => {
        return challenge.milestones.map((milestone) => ({
            ...milestone,
            achieved: progress >= milestone.threshold,
        }))
    }

    // Helper function to calculate progress and update milestones
    const calculateProgressAndMilestones = (challenge: Challenge): Challenge => {
        const progress = calculateProgress(challenge)
        const milestones = updateMilestones(challenge, progress)

        return {
            ...challenge,
            progress,
            milestones,
        }
    }

    const addChallenge = (challenge: Challenge) => {
        // Calculate initial progress for the new challenge
        const challengeWithProgress = calculateProgressAndMilestones(challenge)

        // Update both the state and the data module
        setChallenges((prev) => [...prev, challengeWithProgress])
        addChallengeToData(challengeWithProgress)
    }

    const updateChallenge = (challenge: Challenge) => {
        console.log("updateChallenge called with:", challenge) // Debug log

        // Find the existing challenge to preserve check-ins if they're not in the updated challenge
        const existingChallenge = challenges.find((c) => c.id === challenge.id)

        if (!existingChallenge) {
            // If challenge doesn't exist, just add it
            addChallenge(challenge)
            return
        }

        // Preserve existing check-ins if not provided in the update
        const updatedChallenge = {
            ...challenge,
            checkIns: challenge.checkIns || existingChallenge.checkIns,
        }

        // Create the final challenge object with the correct progress
        const finalChallenge = {
            ...updatedChallenge,
            // Ensure progress is a number and use the provided value
            progress:
                typeof updatedChallenge.progress === "number" ? updatedChallenge.progress : calculateProgress(updatedChallenge),
            // Update milestones based on the final progress value
            milestones: updateMilestones(
                updatedChallenge,
                typeof updatedChallenge.progress === "number" ? updatedChallenge.progress : calculateProgress(updatedChallenge),
            ),
        }

        console.log("Final challenge to update:", finalChallenge) // Debug log

        // Update both the state and the data module
        setChallenges((prev) => {
            const updated = prev.map((c) => (c.id === challenge.id ? finalChallenge : c))
            console.log("Updated challenges state:", updated) // Debug log
            return updated
        })

        updateChallengeInData(finalChallenge)
    }

    const deleteChallenge = (id: string) => {
        // Update both the state and the data module
        setChallenges((prev) => prev.filter((c) => c.id !== id))
        deleteChallengeFromData(id)
    }

    const updateProgress = (challengeId: string, progress: number) => {
        setChallenges((prev) =>
            prev.map((challenge) => {
                if (challenge.id === challengeId) {
                    const updatedChallenge = {
                        ...challenge,
                        progress,
                        milestones: updateMilestones(challenge, progress),
                    }
                    updateChallengeInData(updatedChallenge)
                    return updatedChallenge
                }
                return challenge
            }),
        )
    }

    const addCheckIn = (challengeId: string, checkIn: CheckIn) => {
        setChallenges((prev) =>
            prev.map((challenge) => {
                if (challenge.id === challengeId) {
                    // Add the new check-in
                    const updatedChallenge = {
                        ...challenge,
                        checkIns: [...challenge.checkIns, checkIn],
                    }

                    // Recalculate progress and update milestones
                    const finalChallenge = calculateProgressAndMilestones(updatedChallenge)

                    // Update the data module
                    updateChallengeInData(finalChallenge)

                    return finalChallenge
                }
                return challenge
            }),
        )
    }

    return (
        <ChallengesContext.Provider
            value={{
                challenges,
                addChallenge,
                updateChallenge,
                deleteChallenge,
                addCheckIn,
                updateProgress,
            }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}

export function useChallenges() {
    const context = useContext(ChallengesContext)
    if (context === undefined) {
        throw new Error("useChallenges must be used within a ChallengesProvider")
    }
    return context
}

