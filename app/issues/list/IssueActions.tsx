'use client';
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter';

const IssueActions = () => {
  return (

    <Flex mb="5" justify="between">
      <IssueStatusFilter />
      <Button><Link href="/issues/new"> Create new issue</Link></Button>
    </Flex>
  )
}

export default IssueActions