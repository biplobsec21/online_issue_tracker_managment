import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex my="2" className='space-x-3'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.created_at.toDateString()}</Text>
      </Flex>

      <Card className="prose max-w-full" mt="2" >
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>

  )
}

export default IssueDetails