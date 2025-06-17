import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import ModeToggle from './ModeToggle'

function NavBar() {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
            <SignInButton mode="modal">
                <Button>
                    Sign in
                </Button>
            </SignInButton>
            <SignUpButton mode="modal">
                <Button variant="outline">
                    Sign Up
                </Button>
            </SignUpButton>
        </SignedOut>
        <ModeToggle />
        <SignedIn>
            <UserButton />
        </SignedIn>
    </header>
  )
}

export default NavBar