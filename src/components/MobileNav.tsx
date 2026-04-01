'use client';
import {
  Sheet,
  SheetClose,
  SheetContent,

  SheetTrigger,
} from "@/components/ui/sheet"

import Image from "next/image"
import Link from "next/link"
import { sidebarLinks } from "../../constants"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const MobileNav = () => {
  const path=usePathname();
  return (
    <section   className='w-full max-w-66'>
      <Sheet>
  <SheetTrigger asChild>
    <Image src='/icons/hamburger.svg' className="cursor-pointer sm:hidden" width={36} height={36} alt="humbergur menu"/>
    </SheetTrigger>
  <SheetContent side="left" className="border-none bg-[#1C1F2E]">
     <Link href='/' className='flex items-center gap-1'>
      <Image alt='logo Yoom'className='max-sm:size-10' src='/icons/logo.svg' width={32} height={32}/>
      <p className='text-[26px] font-extrabold text-white '>Yoom</p>
      </Link>
      <div className="flex h-[calc(100vh-72px)] flex-col justify-between  overflow-y-auto"> 
        <SheetClose asChild>
<section className="flex h-full flex-col gap-6 pt-16 text-white">
{sidebarLinks.map((link)=>{
const isActive=path===link.route 
return <SheetClose key={link.route} asChild>
<Link
href={link.route}
key={link.label}
className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60',{
  'bg-[#0E78F9]':isActive
})}
/* 'bg-[#0E78F9]'. is bg-blue-1*/
>
 <Image src={link.imgUrl} alt={link.label} width={20} height={20}/>

 <p className='font-semibold'>{link.label}</p>
</Link>
</SheetClose>
})}
</section>
        </SheetClose>
      </div>
  </SheetContent>
</Sheet>
    </section >
  )
}

export default MobileNav
