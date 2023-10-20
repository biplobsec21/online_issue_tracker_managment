import { Box } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'

const IssueFormSkeleton = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton height="2rem" />
            <Skeleton height="20rem" />
            <Skeleton width="5rem" height="2rem" />
        </Box>
    )
}

export default IssueFormSkeleton