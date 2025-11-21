'use client'

import NavBar from '@/components/common/NavBar'
import { Sidebar } from 'lucide-react'
import React from 'react'

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <div>
      <div className='flex w-full'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}