import prisma from '@/prisma/client'
import React from 'react'
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes"
import Link from 'next/link';
import { IssueStatusBadge } from './components';
import { AvatarIcon } from '@radix-ui/react-icons';
const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { created_at: 'desc' },
        take: 5,
        include: {
            assignedToUser: true
        }
    });
    return (
        <Card>
            <Heading size="4" mb="4"> Latest issues </Heading>
            <Table.Root>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify="between">
                                    <Flex direction="column" gap="2" align="start">
                                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                        <IssueStatusBadge status={issue.status} />
                                    </Flex>

                                    {issue.assignedToUser && (
                                        <Avatar
                                            src={issue.assignedToUser?.image!}
                                            fallback="?"
                                            radius='full'
                                            size="2"
                                        />
                                    )}

                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
            </Table.Root>
        </Card>

    )
}

export default LatestIssues