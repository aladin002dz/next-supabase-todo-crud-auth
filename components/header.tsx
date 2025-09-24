'use client'

import { signOut } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

export default function Header() {
    const { user } = useAuth()

    return (
        <header className="border-b bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold">My Tasks</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                            Welcome, {user?.email}
                        </span>
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
