import Link from "next/link"
import {Button} from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-4xl font-bold mb-4">404 - Challenge Not Found</h1>
            <p className="text-muted-foreground mb-8">
                Sorry, the challenge you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/">
                <Button>Return to Dashboard</Button>
            </Link>
        </div>
    )
}

