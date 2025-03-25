"use client"

import {CheckCircle2, Circle} from "lucide-react"
import {formatDate} from "@/lib/utils"
import {ScrollArea} from "@/components/ui/scroll-area"
import type {CheckIn} from "@/lib/types"
import {useEffect, useState} from "react"

interface CheckInHistoryProps {
    checkIns: CheckIn[]
}

export default function CheckInHistory({checkIns}: CheckInHistoryProps) {
    const [sortedCheckIns, setSortedCheckIns] = useState<CheckIn[]>([])

    useEffect(() => {
        setSortedCheckIns([...checkIns].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    }, [checkIns])

    return (
        <ScrollArea className="h-[500px] pr-4">
            {sortedCheckIns.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No check-ins yet</p>
            ) : (
                <div className="space-y-4">
                    {sortedCheckIns.map((checkIn) => (
                        <div key={checkIn.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-medium">{formatDate(checkIn.date)}</div>
                                {checkIn.completed ? (
                                    <div className="flex items-center text-green-500">
                                        <CheckCircle2 className="h-4 w-4 mr-1"/>
                                        <span className="text-sm">Goal Completed</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center text-muted-foreground">
                                        <Circle className="h-4 w-4 mr-1"/>
                                        <span className="text-sm">Regular Check-in</span>
                                    </div>
                                )}
                            </div>
                            {checkIn.notes && <p className="text-sm text-muted-foreground">{checkIn.notes}</p>}
                        </div>
                    ))}
                </div>
            )}
        </ScrollArea>
    )
}

