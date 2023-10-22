'use client';
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { Box, Container, Flex } from '@radix-ui/themes'
import { useSession } from 'next-auth/react';
const NavBar = () => {
  const currentPathName = usePathname();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ]
  const { status, data: session } = useSession();
  return (
    <nav className=' border-b mb-5  px-5 py-3'>
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
            <Link href="/"> <AiFillBug /> </Link>
            <ul className='flex space-x-6'>
              {links.map(link =>
                <li key={link.href}>
                  <Link
                    className={classnames({
                      'text-zinc-500': link.href !== currentPathName,
                      'text-zinc-900': link.href === currentPathName,
                      'hover:text-zinc-800 transition-colors': true,
                    })
                    }
                    href={link.href} >
                    {link.label}
                  </Link>
                </li>
              )}
            </ul>
          </Flex>
          <Box>
            {status === 'unauthenticated' && <Link href="/api/auth/signin"> Login</Link>}
            {status === 'authenticated' && <Link href="/api/auth/signout"> Logout</Link>}
          </Box>
        </Flex>
      </Container>



    </nav >
  )
}

export default NavBar