"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"
import { LogOut, User as UserIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export function AuthButton() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get initial session
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
            setLoading(false)
        })

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
                scopes: 'identify email guilds',
            },
        })
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setUser(null)
    }

    // Check Guild Membership on load
    useEffect(() => {
        const checkGuildMembership = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session?.provider_token) return

            const guildId = process.env.NEXT_PUBLIC_DISCORD_GUILD_ID
            if (!guildId) return // Skip if no guild ID configured

            try {
                const res = await fetch('https://discord.com/api/users/@me/guilds', {
                    headers: {
                        Authorization: `Bearer ${session.provider_token}`
                    }
                })

                if (res.ok) {
                    const guilds = await res.json()
                    const isMember = guilds.some((g: any) => g.id === guildId)

                    if (!isMember) {
                        await supabase.auth.signOut()
                        setUser(null)
                        alert("Access Denied: You must be a member of the Network School Discord server to log in.")
                    }
                }
            } catch (err) {
                console.error("Failed to check guild membership:", err)
            }
        }

        if (user) {
            checkGuildMembership()
        }
    }, [user])

    if (loading) {
        return <Button variant="ghost" size="sm" disabled>Loading...</Button>
    }

    if (!user) {
        return (
            <Button onClick={handleLogin} variant="default" size="sm" className="bg-[#5865F2] hover:bg-[#4752C4]">
                Login with Discord
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name} />
                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.user_metadata.full_name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                        <UserIcon className="mr-2 h-4 w-4" />
                        Seller Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
