import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";

export default async function Home() {

  const open = await prisma.issue.count({
    where: { status: 'OPEN' }
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' }
  });
  const inprogress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' }
  });
  return (
    // <LatestIssues />
    <IssueChart open={open} closed={closed} inprogress={inprogress} />
  )
}
