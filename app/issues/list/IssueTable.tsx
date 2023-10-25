import React from 'react'
import { Table } from '@radix-ui/themes'
import { IssueStatusBadge, Link } from '@/app/components';
import NextLink from 'next/link'
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';

export interface IssueQuery {
    status: Status;
    orderBy: keyof Issue;
    page: string
}
interface Props {
    searchParams: IssueQuery;
    issues: Issue[]
}
const IssueTable = ({ searchParams, issues }: Props) => {

    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    {column.map((col) => (
                        <Table.ColumnHeaderCell key={col.value} className={col.classname}>
                            <NextLink href={{
                                query: { ...searchParams, orderBy: col.value }
                            }}>
                                {col.label}
                            </NextLink>
                            {col.value === searchParams.orderBy && <ArrowUpIcon className="inline" />}
                        </Table.ColumnHeaderCell>
                    ))}

                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues.map((issue) => (
                    <Table.Row key={issue.id}>
                        <Table.Cell>
                            <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                            <div className='block md:hidden'>
                                <IssueStatusBadge status={issue.status} />
                            </div>
                        </Table.Cell>
                        <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
                        <Table.Cell className='hidden md:table-cell'>{issue.created_at.toDateString()}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}
const column: {
    label: string;
    value: keyof Issue;
    classname?: string
}[] = [
        { label: 'Issue', value: 'title' },
        { label: 'Status', value: 'status', classname: 'hidden md:table-cell' },
        { label: 'Date', value: 'created_at', classname: 'hidden md:table-cell' }
    ]
export const columnName = column.map((column) => column.value);

export default IssueTable