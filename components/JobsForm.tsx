'use client';
import { formSchema } from '@/schemas';
import { Job } from '@prisma/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Separator } from './ui/separator';
import ImageUpload from './image-upload';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

type Props = {
  initialData?: Job | null;
};

const JobsForm = ({ initialData }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      company: '',
      logo: '',
      logoBackground: '',
      position: '',
      contract: '',
      location: '',
      website: '',
      description: '',
      apply: '',
      requirements: {
        content: '',
        items: [],
      },
      role: {
        content: '',
        items: [],
      },
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // try {
    //   if (initialData) {
    //     //update companion
    //     await axios.patch(`/api/job/${initialData.id}`, values);
    //   } else {
    //     //create companion
    //     await axios.post('/api/job', values);
    //   }

    //   toast({
    //     description: 'Success',
    //   });

    //   router.refresh();
    //   router.push('/');
    // } catch (error) {
    //   //TODO: toast error
    //   toast({
    //     variant: 'destructive',
    //     description: 'Something went wrong. Please try again.',
    //   } as any);
    // }
  };

  return (
    <div className='h-full p-4 space-y-2 max-w-3xl mx-auto '>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 pb-10'
        >
          <div className='space-y-2 w-full'>
            <div>
              <h3 className='text-lg font-medium text-background'>
                General Information
              </h3>
              <p className='text-sm text-muted-foreground'>
                General information about the job.
              </p>
            </div>
            <Separator className='bg-primary/10' />
          </div>

          <FormField
            name='logo'
            render={({ field }) => (
              <FormItem className='flex flex-col items-center justify-center space-y-4 '>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
            <FormField
              name='company'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel htmlFor='company'>Company</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='e.g. Microsoft'
                      className=''
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>The name of the company.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='position'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel htmlFor='position'>Position</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='e.g. Software Engineer'
                      className=''
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>The name of the position.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='location'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel htmlFor='location'>Location</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='e.g. London, UK'
                      className=''
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>The location of the job.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='contract'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a contract type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Full Time'>Full Time</SelectItem>
                      <SelectItem value='Part Time'>Part Time</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The contract type of the job.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='apply'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel htmlFor='apply'>Apply</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='e.g. https://example.com/apply'
                      className=''
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Apply link for the job.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='website'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel htmlFor='website'>Website</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='e.g. https://example.com'
                      className=''
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Website of the company.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator className='bg-background' orientation='horizontal' />

          <div className='space-y-2 w-full'>
            <h3 className='text-lg font-medium text-background'>
              Requirements
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
              <FormField
                name='requirements.content'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel htmlFor='requirements.content'>
                      Content
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder='e.g. Requirements'
                        className='
                          resize-none
                          h-32
                          text-sm
                        '
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      the content of the requirements section.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='requirements.items'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel htmlFor='requirements.items'>Items</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder='e.g. Requirements'
                        className='
                          resize-none
                          h-32
                          text-sm
                        '
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      the items of the requirements section.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator className='bg-background' orientation='horizontal' />
          </div>
          <div className='space-y-2 w-full'>
            <h3 className='text-lg font-medium text-background'>Role</h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
              <FormField
                name='role.content'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel htmlFor='role.content'>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder='e.g. Role'
                        className='
                          resize-none
                          h-32
                          text-sm
                        '
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      the content of the role section.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='role.items'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel htmlFor='role.items'>Items</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder='e.g. role'
                        className='
                          resize-none
                          h-32
                          text-sm
                        '
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      the items of the role section.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator className='bg-background' orientation='horizontal' />
          </div>
        </form>
      </Form>

      <Button
        type='submit'
        onClick={form.handleSubmit(onSubmit)}
        variant='default'
        className='bg-background text-primary/90 hover:bg-primary/10'
      >
        {initialData ? 'Update' : 'Create'}
      </Button>
    </div>
  );
};

export default JobsForm;
