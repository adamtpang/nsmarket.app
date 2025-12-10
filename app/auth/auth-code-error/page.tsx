"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeaderSimple } from "@/components/site-header-simple"

export default function AuthErrorPage() {
    return (
        <div className="min-h-screen bg-background">
            <SiteHeaderSimple />

            <main className="container mx-auto px-4 max-w-md py-24 text-center">
                <h1 className="text-3xl font-bold text-red-500 mb-4">Authentication Error</h1>
                <p className="text-muted-foreground mb-8">
                    There was a problem signing you in with Discord. This usually happens if the authorization code expired or was invalid.
                </p>

                <div className="flex flex-col gap-4">
                    <Button asChild>
                        <Link href="/">Try Again</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                </div>
            </main>
        </div>
    )
}
