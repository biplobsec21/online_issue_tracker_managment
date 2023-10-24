"use client";
import React from 'react'
import { Select } from "@radix-ui/themes"
import { Status } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation';
const statuses: { label: string, value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
]
const IssueStatusFilter = () => {
    const router = useRouter();
    const searchParam = useSearchParams();
    return (
        <Select.Root onValueChange={(status) => {
            const params = new URLSearchParams();
            if (status !== 'all') params.append('status', status);
            if (searchParam.get('orderBy')) params.append('orderBy', searchParam.get('orderBy')!);

            const queryString = params.size ? '?' + params.toString() : '';
            router.push(`/issues/list${queryString}`);
        }}>
            <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                {statuses.map((status) => (
                    <Select.Item key={status.value || 'all'} value={status.value || 'all'} >{status.label}</Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter