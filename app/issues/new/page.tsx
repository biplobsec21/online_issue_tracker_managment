
'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import {z} from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  
  const route=useRouter();
  const {register,control,handleSubmit,formState:{ errors} }=useForm<IssueForm>({
    resolver:zodResolver(createIssueSchema)
  });
  const [error,setError]=useState('');
  const [isSubmitting,setSubmitting]=useState(false);
  const onSubmit = handleSubmit(async (data)=>{
      try {
        setSubmitting(true);
        await axios.post('/api/issues',data);
        route.push('/issues');
        
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
                <TextField.Input placeholder='Title' {...register('title')} />
            </TextField.Root>
            <ErrorMessage>
              { errors.title?.message }
            </ErrorMessage>
            <Controller
              name='description'
              control={control}
              render={({field})=><SimpleMDE placeholder='Enter description' {...field}/>}
            />
            <ErrorMessage>
            { errors.description?.message }
            </ErrorMessage>
            <Button disabled={isSubmitting}>Create new issue {isSubmitting && <Spinner /> }</Button>
      </form>
    </div>
   
  )
}

export default NewIssuePage