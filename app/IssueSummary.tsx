import { Status } from '@prisma/client';
import React from 'react'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link';
interface Props {
    open: number;
    closed: number;
    inprogress: number;
}
const IssueSummary = ({ open, closed, inprogress }: Props) => {

    const containers: {
        label: string,
        status: Status,
        value: number
    }[] = [
            { label: 'In progress issues', status: "IN_PROGRESS", value: inprogress },
            { label: 'Open issues', status: "OPEN", value: open },
            { label: 'Closed issues', status: "CLOSED", value: closed },
        ]

    return (
        <Flex gap="3">
            {containers.map(container => (
                <Card key={container.status}>
                    <Flex direction="column">
                        <Link href={`/issues/list?status=${container.status}`} className='text-sm font-medium'>
                            {container.label}
                        </Link>
                        <Text size="5" className='font-bold'>
                            {container.value}
                        </Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    )
}

export default IssueSummary