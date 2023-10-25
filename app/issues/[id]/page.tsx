import prisma from '@/prisma/client';
import { Box, Grid, Flex } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import { Metadata } from 'next';
import { cache } from 'react';
interface Props {
  params: { id: string }
}

const issueDetials = cache((issueId: number) => {
  return prisma.issue.findUnique({
    where: { id: (issueId) }
  });
})
const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)
  const issue = await issueDetials(parseInt(params.id));
  if (!issue)
    notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && <Box>
        <Flex direction="column" gap="5">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>}
    </Grid>

  )
}

export default IssueDetailPage

export async function generateMetadata({ params }: Props) {
  const issue = await issueDetials(parseInt(params.id))
  return {
    title: issue?.title,
    description: issue?.description
  }
}
