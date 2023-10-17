
'use client';
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface IssueForm{
  title: string;
  description: string;
};

const NewIssuePage = () => {
  const route=useRouter();
  const {register,control,handleSubmit}=useForm<IssueForm>();
  return (
    <form 
      className='max-w-xl space-y-4'
      onSubmit={handleSubmit(async (data)=>{
        try {
          await axios.post('/api/issues',data);
          route.push('/issues');
          
        } catch (error) {
          console.log(error);
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
  )
}

export default NewIssuePage