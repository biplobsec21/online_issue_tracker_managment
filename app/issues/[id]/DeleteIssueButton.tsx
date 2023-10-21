"use client";
import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const route = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const DeleteIssue = async () => {
        try {
            // throw new Error(); // for testing error
            setError(false);
            setDeleting(true);
            await axios.delete('/api/issues/' + issueId);
            route.push("/issues/list");
            // router.refresh();
        } catch (error) {
            setError(true);
            setDeleting(false);
        }
    }
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" disabled={isDeleting}>
                        Delete Issue
                        {isDeleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>Are you sure you want to delete this issue, the action can not be undone. </AlertDialog.Description>
                    <Flex mt='4' gap="3">
                        <AlertDialog.Cancel>
                            <Button variant='soft' color='gray'>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action className='mt-5'>
                            <Button color='red' onClick={DeleteIssue}>Delete</Button>
                        </AlertDialog.Action>
                    </Flex>

                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>This issue can not be deleted</AlertDialog.Description>
                    <Button color='gray' variant='soft' onClick={() => setError(false)}>Ok</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton