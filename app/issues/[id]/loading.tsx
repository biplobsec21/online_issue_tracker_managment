import { Skeleton } from '@/app/components'
import { Box, Card, Flex } from '@radix-ui/themes'

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