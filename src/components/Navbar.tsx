import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import MobileNav from './MobileNav'
import {ClerkProvider,SignInButton, SignOutButton, UserButton} from '@clerk/nextjs'
const Navbar = () => {
  return (
    <nav className='flex flex-between fixed z-50 w-full bg-[#1C1F2E] px-6 py-4 lg:px-10'>
      <Link href='/' className='flex items-center gap-1'>
      <Image alt='logo Yoom'className='max-sm:size-10' src='/icons/logo.svg' width={32} height={32}/>
      <p className='text-[26px] font-extrabold text-white max-sm:hidden'>Yoom</p>
      </Link>
      <div className=' flex flex-between gap-5'>
    <ClerkProvider>
      
            
             
                <UserButton/>
            
           
          <SignOutButton>SIgn out</SignOutButton>
          
         
     
        </ClerkProvider>
    
        <MobileNav/>
      </div>
    </nav>
  )
}

export default Navbar
