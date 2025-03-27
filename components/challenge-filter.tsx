"use client"

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

interface ChallengeFilterProps {
    filter: string
    setFilter: (filter: string) => void
}

export default function ChallengeFilter({filter, setFilter}: ChallengeFilterProps) {
    return (
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
    )
}

