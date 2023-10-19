import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Heading, Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
        <Skeleton />
        <Flex my="2" className='space-x-3'>
            <Skeleton width="5rem"/>
            <Skeleton width="8rem"/>
        </Flex>

        <Card className="prose">
            <Skeleton count={3}/>
        </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage