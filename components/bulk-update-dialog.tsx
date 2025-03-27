"use client"

import type React from "react"

import {useState, useEffect} from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {useChallenges} from "@/hooks/use-challenges"
import {useToast} from "@/hooks/use-toast"
import type {Challenge} from "@/lib/types"

interface BulkUpdateDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    challenge: Challenge
}

export default function BulkUpdateDialog({open, onOpenChange, challenge}: BulkUpdateDialogProps) {
    const [progress, setProgress] = useState(challenge.progress)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {updateChallenge} = useChallenges()
    const {toast} = useToast()

    // Reset form values when the dialog opens with a different challenge
    useEffect(() => {
        if (open) {
            setProgress(challenge.progress)
        }
    }, [open, challenge])

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value)
        if (!isNaN(value) && value >= 0 && value <= 100) {
            setProgress(value)
        }
    }

    const handleSubmit = () => {
        setIsSubmitting(true)

        try {
            // Ensure progress is a number
            const numericProgress = Number(progress)

            // Create updated challenge with new progress
            const updatedChallenge = {
                ...challenge,
                progress: numericProgress,
                milestones: challenge.milestones.map((milestone) => ({
                    ...milestone,
                    achieved: numericProgress >= milestone.threshold,
                })),
            }

            // Update the challenge
            updateChallenge(updatedChallenge)

            // Show success message
            toast({
                title: "Progress updated",
                description: `Progress for "${challenge.title}" has been updated to ${numericProgress}%`,
            })

            // Close dialog
            onOpenChange(false)
        } catch (error) {
            console.error("Error updating progress:", error)
            toast({
                title: "Error updating progress",
                description: "There was a problem updating your progress. Please try again.",
                variant: "destructive",
            })
        } finally {
            // Reset submitting state
            setIsSubmitting(false)
        }
    }

    // Check if progress has actually changed
    const hasProgressChanged = progress !== challenge.progress

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Update Progress</DialogTitle>
                    <DialogDescription>Manually update your progress for this challenge.</DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="progress">Progress Percentage</Label>
                        <Input
                            id="progress"
                            type="number"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleProgressChange}
                            className="col-span-3"
                        />
                        <p className="text-sm text-muted-foreground">Current progress: {challenge.progress}%</p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting || !hasProgressChanged}>
                        {isSubmitting ? "Updating..." : "Update Progress"}
                    </Button>
                </DialogFooter>

                {!hasProgressChanged && (
                    <p className="text-xs text-center text-muted-foreground mt-2">
                        Change the progress percentage to enable the update button.
                    </p>
                )}
            </DialogContent>
        </Dialog>
    )
}

