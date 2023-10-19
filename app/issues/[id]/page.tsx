import prisma from '@/prisma/client'
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'
import IssueStatusBadge from '../../components/IssueStatusBadge';
import ReactMarkdown from 'react-markdown';

interface Props{
    params:{id:string}
}

const IssueDetailPage = async ({params} : Props) => {

   const issue = await prisma.issue.findUnique({ 
        where:{ id:parseInt(params.id)}
    });
    if(!issue)
        notFound();

  return (
    <Box>
        <Heading>{issue.title}</Heading>
        <Flex my="2" className='space-x-3'>
            <IssueStatusBadge status={issue.status}/>
            <Text>{issue.created_at.toDateString()}</Text>
        </Flex>
        
        <Card className="prose">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
        
    </Box>
  )
}

export default IssueDetailPage