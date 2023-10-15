'use client';
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const currentPathName=usePathname();
  const links= [
    {label: 'Dashboard', href:'/'},
    {label: 'Issues', href:'/issues'},
  ]
  return (
    <nav className='flex space-x-6 h-14 px-5 border-b mb-5 items-center'>
      <Link href="/"> <AiFillBug /> </Link>
      <ul className='flex space-x-6'>
        {links.map(link => 
          <Link key={link.href} 
                className={classnames({
                    'text-zinc-500' : link.href !== currentPathName,
                    'text-zinc-900' : link.href === currentPathName,
                    'hover:text-zinc-800 transition-colors' : true,
                    })
                  } 
                href={link.href} >

                {link.label}
                
          </Link>
        )}
      </ul>
    </nav>
  )
}

export default NavBar