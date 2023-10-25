import prisma from '@/prisma/client';

import Pagination from '@/app/components/Pagination';
import { Issue, Status } from '@prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { IssueQuery, columnName } from './IssueTable';
import { Metadata } from 'next';
interface Props {
  searchParams: IssueQuery
}
const IssuesPage = async ({ searchParams }: Props) => {

  const allStatus = Object.values(Status);
  const status = allStatus.includes(searchParams.status) ? searchParams.status : undefined;
  const orderBy = columnName.includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined;

  const where = { status: status };
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const totalCount = await prisma.issue.count({ where });
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });
  return (
    <div>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination currentPage={page} pageSize={pageSize} itemCount={totalCount} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Issue tracker list- issue list',
  description: 'All created issue lists'
}
export default IssuesPage