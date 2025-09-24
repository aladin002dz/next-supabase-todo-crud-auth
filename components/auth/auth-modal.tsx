'use client'

import { useState } from 'react'
import LoginForm from './login-form'
import SignupForm from './signup-form'

interface AuthModalProps {
    onSuccess?: () => void
}

export default function AuthModal({ onSuccess }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg">
                {isLogin ? (
                    <LoginForm
                        onSuccess={onSuccess}
                        onSwitchToSignup={() => setIsLogin(false)}
                    />
                ) : (
                    <SignupForm
                        onSuccess={onSuccess}
                        onSwitchToLogin={() => setIsLogin(true)}
                    />
                )}
            </div>
        </div>
    )
}
