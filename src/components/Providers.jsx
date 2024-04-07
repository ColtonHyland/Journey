"use client"
import { SessionProvider } from 'next-auth/react'
import { CalendarProvider } from '@/app/context/CalendarContext'
import React from 'react'

const Providers = (props) => {
  return (
    <SessionProvider>
      <CalendarProvider>
        {props.children}
      </CalendarProvider>
    </SessionProvider>
  )
}

export default Providers