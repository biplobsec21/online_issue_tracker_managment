import React from 'react'
import { Button, Flex, Text } from "@radix-ui/themes"
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowDownIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}
const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount <= 1) return null;
    return (
        <Flex align="center" gap="3">
            <Text>Page {currentPage} of {pageCount}</Text>

            <Button color='gray' variant='soft' disabled={currentPage == 1}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage == 1}>
                <ChevronLeftIcon />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage == pageCount}>
                <ChevronRightIcon />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage == 1}>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination