import { Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
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