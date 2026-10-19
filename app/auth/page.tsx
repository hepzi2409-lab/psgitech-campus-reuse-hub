import React from 'react'
import AuthForm from '../../components/AuthForm'

export default function AuthPage(){
  return (
    <div>
      <h2 className="text-2xl font-semibold">Account</h2>
      <p className="text-sm text-secondarytext mt-2">Sign in or create an account to participate in the Campus Reuse Hub.</p>
      <div className="mt-6">
        <AuthForm />
      </div>
    </div>
  )
}
