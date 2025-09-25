'use client'

import { signOut } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { User } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
    const { user } = useAuth()

    return (
        <header className="border-b bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-semibold hover:text-gray-600">
                            My Tasks
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                            Welcome, {user?.user_metadata?.name || user?.email}
                        </span>
                        <Link href="/profile">
                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Profile
                            </Button>
                        </Link>
                        <form action={signOut}>
                            <Button type="submit" variant="outline" size="sm">
                                Sign Out
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    )
}
