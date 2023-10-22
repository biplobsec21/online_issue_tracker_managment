'use client';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classnames from 'classnames';
import { Skeleton } from "@/app/components"
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
const NavBar = () => {

  return (
    <nav className=' border-b mb-5  px-5 py-3'>
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
            <Link href="/"> <AiFillBug /> </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>

    </nav >
  )
}

const NavLinks = () => {
  const currentPathName = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ]
  return (
    <ul className='flex space-x-6' >
      {
        links.map(link =>
          <li key={link.href}>
            <Link
              className={classnames({
                '!text-zinc-900': link.href === currentPathName,
                'nav-link': true,
              })
              }
              href={link.href} >
              {link.label}
            </Link>
          </li>
        )
      }
    </ul>
  )
}
const AuthStatus = () => {

  const { status, data: session } = useSession();
  if (status === 'loading') return <Skeleton width="3rem" />;
  if (status === 'unauthenticated')
    return <Link className="nav-link" href="/api/auth/signin"> Login</Link>;

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger >
          <Avatar src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className='cursor-pointer'
            referrerPolicy='no-referrer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label><Text>{session!.user!.email}</Text></DropdownMenu.Label>
          <DropdownMenu.Item><Link href="/api/auth/signout"> Logout</Link></DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}
export default NavBar