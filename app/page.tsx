"use client"

import {useState} from "react"
import Navbar from "@/components/navbar"
import {Button} from "@/components/ui/button"
import {PlusCircle} from "lucide-react"
import Link from "next/link"
import ChallengeList from "@/components/challenge-list"
import ChallengeFilter from "@/components/challenge-filter"

export default function Home() {
    const [filter, setFilter] = useState<string>("all")

    return (
        <>
            <Navbar/>
            <main className="container mx-auto px-4 py-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 gap-4">
                    <h1 className="text-3xl font-bold">My Challenges</h1>
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                        <ChallengeFilter filter={filter} setFilter={setFilter}/>
                        <Link href="/create">
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                New Challenge
                            </Button>
                        </Link>
                    </div>
                </div>

                <ChallengeList filter={filter}/>
            </main>
        </>
    )
}

