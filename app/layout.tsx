import type React from "react"
import "@/app/globals.css"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import {ThemeProvider} from "@/components/theme-provider"
import {ChallengesProvider} from "@/hooks/use-challenges"
import {Toaster} from "@/components/ui/toaster"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Personal Challenge Tracker",
    description: "Track your personal challenges and goals",
    icons: {
        icon: [
            {
                url: "/favicon.svg",
                type: "image/svg+xml",
            },
        ],
    },
    generator: 'v0.dev'
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ChallengesProvider>
                {children}
                <Toaster/>
            </ChallengesProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}


import './globals.css'