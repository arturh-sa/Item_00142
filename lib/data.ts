import type {Challenge} from "./types"

// Mock data for challenges
let challenges: Challenge[] = [
    {
        id: "challenge-1",
        title: "30 Days of Yoga",
        description: "Practice yoga for at least 20 minutes every day for 30 days to improve flexibility and mindfulness.",
        startDate: "2023-06-01T00:00:00.000Z",
        endDate: "2023-06-30T23:59:59.999Z",
        progress: 65,
        checkIns: [
            {
                id: "checkin-1",
                date: "2023-06-01T18:30:00.000Z",
                notes: "Started with a beginner's flow. Feeling good!",
                completed: true,
            },
            {
                id: "checkin-2",
                date: "2023-06-02T19:15:00.000Z",
                notes: "Did a 30-minute vinyasa flow. Getting more comfortable.",
                completed: true,
            },
            {
                id: "checkin-3",
                date: "2023-06-03T17:45:00.000Z",
                notes: "Skipped today due to work deadline. Will make up tomorrow.",
                completed: false,
            },
            // Add more completed check-ins to match the 65% progress
            {
                id: "checkin-4",
                date: "2023-06-04T18:00:00.000Z",
                notes: "Back on track with a morning flow.",
                completed: true,
            },
            {
                id: "checkin-5",
                date: "2023-06-05T19:00:00.000Z",
                notes: "Evening session focusing on balance poses.",
                completed: true,
            },
            {
                id: "checkin-6",
                date: "2023-06-06T17:30:00.000Z",
                notes: "Quick morning session before work.",
                completed: true,
            },
            {
                id: "checkin-7",
                date: "2023-06-07T20:00:00.000Z",
                notes: "Relaxing evening flow.",
                completed: true,
            },
            {
                id: "checkin-8",
                date: "2023-06-08T18:15:00.000Z",
                notes: "Focused on breathing techniques today.",
                completed: true,
            },
            {
                id: "checkin-9",
                date: "2023-06-09T19:30:00.000Z",
                notes: "Challenging session with new poses.",
                completed: true,
            },
            {
                id: "checkin-10",
                date: "2023-06-10T17:00:00.000Z",
                notes: "Weekend morning flow.",
                completed: true,
            },
            {
                id: "checkin-11",
                date: "2023-06-11T18:45:00.000Z",
                notes: "Relaxing Sunday session.",
                completed: true,
            },
            {
                id: "checkin-12",
                date: "2023-06-12T19:15:00.000Z",
                notes: "Monday motivation flow.",
                completed: true,
            },
            {
                id: "checkin-13",
                date: "2023-06-13T18:30:00.000Z",
                notes: "Quick session between meetings.",
                completed: true,
            },
            {
                id: "checkin-14",
                date: "2023-06-14T20:00:00.000Z",
                notes: "Evening wind-down flow.",
                completed: true,
            },
            {
                id: "checkin-15",
                date: "2023-06-15T17:45:00.000Z",
                notes: "Focused on hip openers today.",
                completed: true,
            },
            {
                id: "checkin-16",
                date: "2023-06-16T19:00:00.000Z",
                notes: "Challenging power yoga session.",
                completed: true,
            },
            {
                id: "checkin-17",
                date: "2023-06-17T18:15:00.000Z",
                notes: "Weekend morning flow with extra meditation.",
                completed: true,
            },
            {
                id: "checkin-18",
                date: "2023-06-18T17:30:00.000Z",
                notes: "Gentle Sunday session.",
                completed: true,
            },
            {
                id: "checkin-19",
                date: "2023-06-19T19:45:00.000Z",
                notes: "Focused on strength poses.",
                completed: true,
            },
            {
                id: "checkin-20",
                date: "2023-06-20T18:00:00.000Z",
                notes: "Quick morning flow to start the day.",
                completed: true,
            },
        ],
        milestones: [
            {
                id: "milestone-1",
                title: "First Week",
                threshold: 25,
                achieved: true,
            },
            {
                id: "milestone-2",
                title: "Halfway",
                threshold: 50,
                achieved: true,
            },
            {
                id: "milestone-3",
                title: "Three Weeks",
                threshold: 75,
                achieved: false,
            },
            {
                id: "milestone-4",
                title: "Completion",
                threshold: 100,
                achieved: false,
            },
        ],
    },
    {
        id: "challenge-2",
        title: "Read 10 Books",
        description: "Read 10 books in different genres to expand knowledge and perspective.",
        startDate: "2023-05-15T00:00:00.000Z",
        endDate: "2023-08-15T23:59:59.999Z",
        progress: 30,
        checkIns: [
            {
                id: "checkin-4",
                date: "2023-05-20T21:00:00.000Z",
                notes: "Finished 'Atomic Habits'. Great insights on building habits!",
                completed: true,
            },
            {
                id: "checkin-5",
                date: "2023-06-05T22:30:00.000Z",
                notes: "Completed 'The Alchemist'. Loved the storytelling.",
                completed: true,
            },
            {
                id: "checkin-6",
                date: "2023-06-15T20:45:00.000Z",
                notes: "Started 'Sapiens' but only got through the first chapter.",
                completed: false,
            },
            // Add a third completed check-in to match 30% progress (3 out of 10 books)
            {
                id: "checkin-7",
                date: "2023-06-25T21:15:00.000Z",
                notes: "Finished 'Educated'. Powerful memoir!",
                completed: true,
            },
        ],
        milestones: [
            {
                id: "milestone-5",
                title: "3 Books",
                threshold: 30,
                achieved: true,
            },
            {
                id: "milestone-6",
                title: "5 Books",
                threshold: 50,
                achieved: false,
            },
            {
                id: "milestone-7",
                title: "8 Books",
                threshold: 80,
                achieved: false,
            },
            {
                id: "milestone-8",
                title: "All 10 Books",
                threshold: 100,
                achieved: false,
            },
        ],
    },
    {
        id: "challenge-3",
        title: "Learn Spanish",
        description: "Study Spanish for 15 minutes daily to achieve basic conversational fluency.",
        startDate: "2023-07-01T00:00:00.000Z",
        endDate: "2023-12-31T23:59:59.999Z",
        progress: 10,
        checkIns: [
            {
                id: "checkin-7",
                date: "2023-07-01T08:00:00.000Z",
                notes: "Learned basic greetings and introductions.",
                completed: true,
            },
            {
                id: "checkin-8",
                date: "2023-07-02T08:15:00.000Z",
                notes: "Practiced numbers 1-20 and basic phrases.",
                completed: true,
            },
            // Add more completed check-ins to match 10% progress
            {
                id: "checkin-9",
                date: "2023-07-03T08:30:00.000Z",
                notes: "Learned days of the week and months.",
                completed: true,
            },
            {
                id: "checkin-10",
                date: "2023-07-04T09:00:00.000Z",
                notes: "Practiced basic conversation with a language app.",
                completed: true,
            },
            {
                id: "checkin-11",
                date: "2023-07-05T08:45:00.000Z",
                notes: "Learned common verbs and their conjugations.",
                completed: true,
            },
            {
                id: "checkin-12",
                date: "2023-07-06T08:15:00.000Z",
                notes: "Practiced ordering food and drinks in Spanish.",
                completed: true,
            },
            {
                id: "checkin-13",
                date: "2023-07-07T09:30:00.000Z",
                notes: "Reviewed all vocabulary from the week.",
                completed: true,
            },
            {
                id: "checkin-14",
                date: "2023-07-08T10:00:00.000Z",
                notes: "Watched a short Spanish video with subtitles.",
                completed: true,
            },
            {
                id: "checkin-15",
                date: "2023-07-09T08:30:00.000Z",
                notes: "Practiced with flashcards for 15 minutes.",
                completed: true,
            },
            {
                id: "checkin-16",
                date: "2023-07-10T09:15:00.000Z",
                notes: "Learned vocabulary for travel situations.",
                completed: true,
            },
            {
                id: "checkin-17",
                date: "2023-07-11T08:45:00.000Z",
                notes: "Practiced asking for directions in Spanish.",
                completed: true,
            },
            {
                id: "checkin-18",
                date: "2023-07-12T09:00:00.000Z",
                notes: "Learned vocabulary for shopping and numbers.",
                completed: true,
            },
            {
                id: "checkin-19",
                date: "2023-07-13T08:30:00.000Z",
                notes: "Practiced past tense verbs.",
                completed: true,
            },
            {
                id: "checkin-20",
                date: "2023-07-14T09:15:00.000Z",
                notes: "Reviewed all material from the past two weeks.",
                completed: true,
            },
            {
                id: "checkin-21",
                date: "2023-07-15T10:00:00.000Z",
                notes: "Had a short conversation with a language exchange partner.",
                completed: true,
            },
            {
                id: "checkin-22",
                date: "2023-07-16T08:45:00.000Z",
                notes: "Learned vocabulary for describing people and places.",
                completed: true,
            },
            {
                id: "checkin-23",
                date: "2023-07-17T09:30:00.000Z",
                notes: "Practiced future tense verbs.",
                completed: true,
            },
            {
                id: "checkin-24",
                date: "2023-07-18T08:15:00.000Z",
                notes: "Learned vocabulary for weather and seasons.",
                completed: true,
            },
        ],
        milestones: [
            {
                id: "milestone-9",
                title: "Basic Greetings",
                threshold: 10,
                achieved: true,
            },
            {
                id: "milestone-10",
                title: "Simple Conversations",
                threshold: 30,
                achieved: false,
            },
            {
                id: "milestone-11",
                title: "Intermediate Vocabulary",
                threshold: 60,
                achieved: false,
            },
            {
                id: "milestone-12",
                title: "Conversational Fluency",
                threshold: 100,
                achieved: false,
            },
        ],
    },
    {
        id: "challenge-4",
        title: "Complete Marathon Training",
        description: "Follow a 16-week training program to prepare for a full marathon.",
        startDate: "2023-01-15T00:00:00.000Z",
        endDate: "2023-05-10T23:59:59.999Z",
        progress: 100,
        checkIns: [
            {
                id: "checkin-9",
                date: "2023-01-15T18:30:00.000Z",
                notes: "First day of training. Completed a 3-mile run.",
                completed: true,
            },
            {
                id: "checkin-10",
                date: "2023-03-01T19:15:00.000Z",
                notes: "Halfway through training. Completed a 13-mile run today!",
                completed: true,
            },
            {
                id: "checkin-11",
                date: "2023-05-10T08:45:00.000Z",
                notes: "Marathon day! Finished in 4 hours and 15 minutes.",
                completed: true,
            },
            // Add more completed check-ins to match 100% progress
            {
                id: "checkin-12",
                date: "2023-01-22T18:00:00.000Z",
                notes: "Week 2 complete. 5-mile long run today.",
                completed: true,
            },
            {
                id: "checkin-13",
                date: "2023-01-29T17:45:00.000Z",
                notes: "Week 3 complete. 6-mile long run today.",
                completed: true,
            },
            {
                id: "checkin-14",
                date: "2023-02-05T18:30:00.000Z",
                notes: "Week 4 complete. 7-mile long run today.",
                completed: true,
            },
            {
                id: "checkin-15",
                date: "2023-02-12T19:00:00.000Z",
                notes: "Week 5 complete. 8-mile long run today.",
                completed: true,
            },
            {
                id: "checkin-16",
                date: "2023-02-19T18:15:00.000Z",
                notes: "Week 6 complete. 10-mile long run today.",
                completed: true,
            },
            {
                id: "checkin-17",
                date: "2023-02-26T17:30:00.000Z",
                notes: "Week 7 complete. Rest week with shorter runs.",
                completed: true,
            },
            {
                id: "checkin-18",
                date: "2023-03-05T18:45:00.000Z",
                notes: "Week 9 complete. 15-mile long run today.",
                completed: true,
            },
            {
                id: "checkin-19",
                date: "2023-03-12T19:15:00.000Z",
                notes: "Week 10 complete. 16-mile long run today.",
                completed: true,
            },
            {
                id: "checkin-20",
                date: "2023-03-19T18:00:00.000Z",
                notes: "Week 11 complete. 18-mile long run today.",
                completed: true,
            },
            {
                id: "checkin-21",
                date: "2023-03-26T17:45:00.000Z",
                notes: "Week 12 complete. 20-mile long run today.",
                completed: true,
            },
            {
                id: "checkin-22",
                date: "2023-04-02T18:30:00.000Z",
                notes: "Week 13 complete. Starting to taper with 15-mile long run.",
                completed: true,
            },
            {
                id: "checkin-23",
                date: "2023-04-09T19:00:00.000Z",
                notes: "Week 14 complete. 12-mile long run today.",
                completed: true,
            },
            {
                id: "checkin-24",
                date: "2023-04-16T18:15:00.000Z",
                notes: "Week 15 complete. 8-mile long run today.",
                completed: true,
            },
            {
                id: "checkin-25",
                date: "2023-04-23T17:30:00.000Z",
                notes: "Week 16 complete. Final week of training with light runs.",
                completed: true,
            },
        ],
        milestones: [
            {
                id: "milestone-13",
                title: "5K Distance",
                threshold: 25,
                achieved: true,
            },
            {
                id: "milestone-14",
                title: "Half Marathon",
                threshold: 50,
                achieved: true,
            },
            {
                id: "milestone-15",
                title: "20-Mile Run",
                threshold: 75,
                achieved: true,
            },
            {
                id: "milestone-16",
                title: "Full Marathon",
                threshold: 100,
                achieved: true,
            },
        ],
    },
]

// Get all challenges
export function getChallenges(): Challenge[] {
    return challenges
}

// Get a challenge by ID
export function getChallengeById(id: string): Challenge | undefined {
    return challenges.find((challenge) => challenge.id === id)
}

// Add a new challenge
export function addChallengeToData(challenge: Challenge): void {
    challenges = [...challenges, challenge]
}

// Update a challenge
export function updateChallengeInData(challenge: Challenge): void {
    challenges = challenges.map((c) => (c.id === challenge.id ? challenge : c))
}

// Delete a challenge
export function deleteChallengeFromData(id: string): void {
    challenges = challenges.filter((c) => c.id !== id)
}

