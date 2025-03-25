"use client"

import {useState} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Textarea} from "@/components/ui/textarea"
import {Checkbox} from "@/components/ui/checkbox"
import {useToast} from "@/hooks/use-toast"
import {useChallenges} from "@/hooks/use-challenges"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {InfoIcon} from "lucide-react"

const checkInSchema = z.object({
    notes: z
        .string()
        .min(1, {
            message: "Please enter some notes about your progress.",
        })
        .max(500, {
            message: "Notes must not be longer than 500 characters.",
        }),
    completed: z.boolean().default(false),
})

type CheckInFormValues = z.infer<typeof checkInSchema>

interface CheckInFormProps {
    challengeId: string
}

export default function CheckInForm({challengeId}: CheckInFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {addCheckIn, challenges} = useChallenges()
    const {toast} = useToast()

    // Find the current challenge to show progress info
    const challenge = challenges.find((c) => c.id === challengeId)
    const totalDays = challenge
        ? Math.ceil(
            (new Date(challenge.endDate).getTime() - new Date(challenge.startDate).getTime()) / (1000 * 60 * 60 * 24),
        )
        : 0
    const completedCheckIns = challenge?.checkIns.filter((c) => c.completed).length || 0
    const remainingCheckIns = totalDays - completedCheckIns

    const form = useForm<CheckInFormValues>({
        resolver: zodResolver(checkInSchema),
        defaultValues: {
            notes: "",
            completed: false,
        },
    })

    function onSubmit(data: CheckInFormValues) {
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            addCheckIn(challengeId, {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                notes: data.notes,
                completed: data.completed,
            })

            form.reset()
            setIsSubmitting(false)

            toast({
                title: "Check-in recorded",
                description: data.completed
                    ? "Your progress has been updated and counts toward your goal"
                    : "Your check-in has been recorded",
            })
        }, 500)
    }

    return (
        <div>
            <h3 className="font-medium mb-4">Daily Check-in</h3>

            {challenge && remainingCheckIns > 0 && (
                <Alert className="mb-4">
                    <InfoIcon className="h-4 w-4"/>
                    <AlertTitle>Progress Tracking</AlertTitle>
                    <AlertDescription>
                        You have completed {completedCheckIns} out of {totalDays} daily goals.
                        {remainingCheckIns > 0
                            ? ` ${remainingCheckIns} more completed check-ins needed to reach 100%.`
                            : " You have reached 100%!"}
                    </AlertDescription>
                </Alert>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="notes"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Notes <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Textarea placeholder="How did it go today? Any challenges or wins?" {...field} />
                                </FormControl>
                                <FormDescription>Record your thoughts about today's progress.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="completed"
                        render={({field}) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Daily goal completed</FormLabel>
                                    <FormDescription>
                                        Check this if you've completed your challenge goal for today. This will count
                                        toward your overall
                                        progress.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Check-in"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

