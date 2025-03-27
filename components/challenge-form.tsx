"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {CalendarIcon, Plus, Trash2} from "lucide-react"
import {cn} from "@/lib/utils"
import {format} from "date-fns"
import {useToast} from "@/hooks/use-toast"
import {useChallenges} from "@/hooks/use-challenges"
import type {Challenge} from "@/lib/types"

const milestoneSchema = z.object({
    title: z.string().min(1, "Title is required"),
    threshold: z.number().min(1).max(100),
})

const challengeSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    startDate: z.date(),
    endDate: z.date(),
    milestones: z.array(milestoneSchema).min(1, {
        message: "Add at least one milestone",
    }),
})

type ChallengeFormValues = z.infer<typeof challengeSchema>

interface ChallengeFormProps {
    challenge?: Challenge
}

export default function ChallengeForm({challenge}: ChallengeFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [startDateOpen, setStartDateOpen] = useState(false)
    const [endDateOpen, setEndDateOpen] = useState(false)
    const router = useRouter()
    const {toast} = useToast()
    const {addChallenge, updateChallenge} = useChallenges()

    const defaultValues: Partial<ChallengeFormValues> = challenge
        ? {
            title: challenge.title,
            description: challenge.description,
            startDate: new Date(challenge.startDate),
            endDate: new Date(challenge.endDate),
            milestones: challenge.milestones.map((m) => ({
                title: m.title,
                threshold: m.threshold,
            })),
        }
        : {
            title: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
            milestones: [
                {title: "25% Complete", threshold: 25},
                {title: "50% Complete", threshold: 50},
                {title: "75% Complete", threshold: 75},
                {title: "100% Complete", threshold: 100},
            ],
        }

    const form = useForm<ChallengeFormValues>({
        resolver: zodResolver(challengeSchema),
        defaultValues,
    })

    function onSubmit(data: ChallengeFormValues) {
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            if (challenge) {
                updateChallenge({
                    ...challenge,
                    title: data.title,
                    description: data.description,
                    startDate: data.startDate.toISOString(),
                    endDate: data.endDate.toISOString(),
                    milestones: data.milestones.map((m, index) => ({
                        id: challenge.milestones[index]?.id || `milestone-${Date.now()}-${index}`,
                        title: m.title,
                        threshold: m.threshold,
                        achieved: challenge.milestones[index]?.achieved || false,
                    })),
                })

                toast({
                    title: "Challenge updated",
                    description: "Your challenge has been updated successfully",
                })

                router.push(`/challenge/${challenge.id}`)
            } else {
                const newChallenge: Challenge = {
                    id: `challenge-${Date.now()}`,
                    title: data.title,
                    description: data.description,
                    startDate: data.startDate.toISOString(),
                    endDate: data.endDate.toISOString(),
                    progress: 0,
                    checkIns: [],
                    milestones: data.milestones.map((m, index) => ({
                        id: `milestone-${Date.now()}-${index}`,
                        title: m.title,
                        threshold: m.threshold,
                        achieved: false,
                    })),
                }

                addChallenge(newChallenge)

                toast({
                    title: "Challenge created",
                    description: "Your new challenge has been created successfully",
                })

                router.push("/")
            }

            setIsSubmitting(false)
        }, 500)
    }

    const addMilestone = () => {
        const currentMilestones = form.getValues("milestones") || []
        form.setValue("milestones", [...currentMilestones, {title: "", threshold: 0}])
    }

    const removeMilestone = (index: number) => {
        const currentMilestones = form.getValues("milestones")
        form.setValue(
            "milestones",
            currentMilestones.filter((_, i) => i !== index),
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="30 Days of Yoga" {...field} />
                            </FormControl>
                            <FormDescription>Give your challenge a clear, motivating title.</FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Practice yoga for at least 20 minutes every day for 30 days." {...field} />
                            </FormControl>
                            <FormDescription>Describe your challenge and what you hope to achieve.</FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Popover open={startDateOpen} onOpenChange={setStartDateOpen} modal={true}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                            >
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                field.onChange(date)
                                                setStartDateOpen(false)
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <Popover open={endDateOpen} onOpenChange={setEndDateOpen} modal={true}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                            >
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                field.onChange(date)
                                                setEndDateOpen(false)
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="milestones"
                    render={() => (
                        <FormItem>
                            <div className="flex items-center justify-between mb-4">
                                <FormLabel>Milestones</FormLabel>
                                <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                                    <Plus className="h-4 w-4 mr-1"/>
                                    Add Milestone
                                </Button>
                            </div>

                            {form.watch("milestones")?.map((_, index) => (
                                <div key={index} className="flex gap-4 items-start mb-4">
                                    <FormField
                                        control={form.control}
                                        name={`milestones.${index}.title`}
                                        render={({field}) => (
                                            <FormItem className="flex-grow">
                                                <FormControl>
                                                    <Input placeholder="Milestone title" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`milestones.${index}.threshold`}
                                        render={({field}) => (
                                            <FormItem className="w-24">
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            max={100}
                                                            placeholder="0"
                                                            className="pr-7"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                                        />
                                                        <div
                                                            className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                                                            %
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeMilestone(index)}
                                        disabled={form.watch("milestones").length <= 1}
                                    >
                                        <Trash2 className="h-4 w-4"/>
                                        <span className="sr-only">Remove milestone</span>
                                    </Button>
                                </div>
                            ))}
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : challenge ? "Update Challenge" : "Create Challenge"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

