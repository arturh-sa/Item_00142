export interface Milestone {
    id: string
    title: string
    threshold: number
    achieved: boolean
}

export interface CheckIn {
    id: string
    date: string
    notes: string
    completed: boolean
}

export interface Challenge {
    id: string
    title: string
    description: string
    startDate: string
    endDate: string
    progress: number
    checkIns: CheckIn[]
    milestones: Milestone[]
}

