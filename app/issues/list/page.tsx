import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import { IssueStatusBadge, Link } from '@/app/components';
import NextLink from 'next/link'
import IssueActions from './IssueActions'
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
interface Props {
  searchParams: { status: Status, orderBy: keyof Issue }
}
const IssuesPage = async ({ searchParams }: Props) => {

  const column: {
    label: string;
    value: keyof Issue;
    classname?: string
  }[] = [
      { label: 'Issue', value: 'title' },
      { label: 'Status', value: 'status', classname: 'hidden md:table-cell' },
      { label: 'Date', value: 'created_at', classname: 'hidden md:table-cell' }
    ]

  const allStatus = Object.values(Status);
  const status = allStatus.includes(searchParams.status) ? searchParams.status : undefined;

  const orderBy = column.map((col) => col.value).includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy
  });
  return (
    <div>
      <IssueActions />
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
    </div>
  )
}
export const dynamic = 'force-dynamic'
export default IssuesPage