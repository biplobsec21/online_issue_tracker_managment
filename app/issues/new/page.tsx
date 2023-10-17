
'use client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm{
  title: string;
  description: string;
};

const NewIssuePage = () => {
  const route=useRouter();
  const {register,control,handleSubmit}=useForm<IssueForm>();
  const [error,setError]=useState('');
  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>
         Something went wrong!
        </Callout.Text>
        </Callout.Root>}
       <form 
        className='space-y-4'
        onSubmit={handleSubmit(async (data)=>{
          try {
            await axios.post('/api/issues',data);
            route.push('/issues');
            
          } catch (error) {
            setError('An unexpected error occured.');
          }

        })} >
          <TextField.Root>
              <TextField.Input placeholder='Title' {...register('title')} />
          </TextField.Root>
          <Controller
            name='description'
            control={control}
            render={({field})=><SimpleMDE placeholder='Enter description' {...field}/>}
          />
          
          <Button>Create new issue</Button>
      </form>
    </div>
   
  )
}

export default NewIssuePage