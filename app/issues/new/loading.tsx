import { Skeleton } from '@/app/components'
import { Box } from '@radix-ui/themes'
const LoadingNewIssuePage = () => {
  return (
    <Box className='max-w-xl'>
        <Skeleton height="4rem" />
        <Skeleton height="25rem"/>
        <Skeleton width="5rem"/>

    </Box>
  )
}

export default LoadingNewIssuePage