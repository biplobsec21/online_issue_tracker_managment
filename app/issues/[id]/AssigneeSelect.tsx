"use client";
import React, { useEffect, useState } from 'react'
import { Select } from '@radix-ui/themes'
import { Issue, User } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/app/components'
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    // const [users, setUsers] = useState<User[]>([]);
    const { isLoading, error, data: users } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get("/api/users").then((res) => res.data),
        staleTime: 60 * 1000,
        retry: 3
    });
    if (isLoading) return <Skeleton />
    if (error) return null;
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const { data } = await axios.get<User[]>("/api/users");
    //         setUsers(data);
    //     }
    //     fetchUsers();
    // }, []);

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || "unassigned"}
                onValueChange={(userId) => {
                    axios.patch('/api/issues/' + issue.id, { assignedToUserId: userId === 'unassigned' ? null : userId })
                        .catch(() => {
                            toast.error('Changes could not saved.');
                        });
                }}>
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="unassigned" > Unassigned </Select.Item>
                        {users?.map((user) => (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        ))}

                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

export default AssigneeSelect