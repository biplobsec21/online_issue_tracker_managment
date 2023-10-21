
'use client';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {

    const route = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            if (issue) {
                await axios.patch('/api/issues/' + issue.id, data);
            } else {
                await axios.post('/api/issues', data);
            }
            route.push('/issues/list');
            route.refresh();
        } catch (error) {
            setSubmitting(false);
            setError('An unexpected error occured.');
        }

    });
    return (
        <div className='max-w-xl'>
            {error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text>
                    Something went wrong!
                </Callout.Text>
            </Callout.Root>}
            <form
                className='space-y-4'
                onSubmit={onSubmit} >
                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
                </TextField.Root>
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder='Enter description' {...field} />}
                />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Update issue' : 'Create new issue'}{' '}
                    {isSubmitting && <Spinner />}</Button>
            </form>
        </div>

    )
}

export default IssueForm