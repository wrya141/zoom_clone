'use client';
import Link from 'next/link';
import { sidebarLinks } from '../../constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Sidebar = () => {
  const path=usePathname()
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit bg-[#1C1F2E] flex-col justify-between p-6 pt-28 text-white max-sm:hidden lg:w-264px '>
      <div className='flex flex-1 flex-col gap-6 '>{/*bg-[#1C1F2E] is bg-dark-1 */ }
{sidebarLinks.map((link)=>{
const isActive=path===link.route || path.startsWith(`${link.route}/`);
return <Link
href={link.route}
key={link.label}
className={cn('flex gap-4 items-center p-4 rounded-lg justify-start',{
  'bg-[#0E78F9]':isActive
})}
/* 'bg-[#0E78F9]'. is bg-blue-1*/
>
 <Image src={link.imgUrl} alt={link.label} width={24} height={24}/>

 <p className='tex-lg font-bold max-lg:hidden'>{link.label}</p>
</Link>
})}
      </div>
    </section>
  )
}

export default Sidebar
