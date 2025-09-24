'use client'

import { signOut } from '@/app/actions/auth'
import Header from '@/components/header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { CalendarDays, Mail, Shield, User } from 'lucide-react'

export default function ProfilePage() {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen">
                <Header />
                <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen">
                <Header />
                <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Access Denied</CardTitle>
                            <CardDescription>
                                You need to be logged in to view your profile.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        )
    }

    const getUserInitials = (email: string) => {
        return email
            .split('@')[0]
            .split('.')
            .map(part => part.charAt(0).toUpperCase())
            .join('')
            .slice(0, 2)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="min-h-screen">
            <Header />
            <div className="bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                        <p className="text-gray-600 mt-2">Manage your account information and settings</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile Overview */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Profile Information
                                    </CardTitle>
                                    <CardDescription>
                                        Your personal account details
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage src={user.user_metadata?.avatar_url} />
                                            <AvatarFallback className="text-lg">
                                                {getUserInitials(user.email || '')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-xl font-semibold">
                                                {user.user_metadata?.full_name || 'User'}
                                            </h3>
                                            <p className="text-gray-600">{user.email}</p>
                                            <Badge variant="secondary" className="mt-2">
                                                {user.email_confirmed_at ? 'Verified' : 'Unverified'}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm font-medium">Email</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{user.email}</p>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <CalendarDays className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm font-medium">Member Since</span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {formatDate(user.created_at)}
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Shield className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm font-medium">Last Sign In</span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Never'}
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm font-medium">User ID</span>
                                            </div>
                                            <p className="text-sm text-gray-600 font-mono">
                                                {user.id.slice(0, 8)}...
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Account Actions */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Actions</CardTitle>
                                    <CardDescription>
                                        Manage your account settings
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <form action={signOut} className="w-full">
                                        <Button type="submit" variant="outline" className="w-full">
                                            Sign Out
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Status</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Email Verified</span>
                                        <Badge variant={user.email_confirmed_at ? "default" : "destructive"}>
                                            {user.email_confirmed_at ? "Yes" : "No"}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Phone Verified</span>
                                        <Badge variant={user.phone_confirmed_at ? "default" : "secondary"}>
                                            {user.phone_confirmed_at ? "Yes" : "No"}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
