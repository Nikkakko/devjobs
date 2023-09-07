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
import { Trash, Plus, ArrowLeft } from 'lucide-react';

type Props = {
  initialData: Job | null;
};

const JobsForm = ({ initialData }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      company: '',
      logo: '',
      logoBackground: 'bg-background',
      position: '',
      contract: '',
      location: '',
      website: '',
      apply: '',
      description: '',
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

  const lorem = () => {
    return (
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint esse quae
        quas delectus a tempora est ex praesentium distinctio reiciendis
        quibusdam facilis ipsa repellendus impedit, ipsum, quod, nulla omnis
        veniam odit. Voluptas unde doloribus exercitationem! Exercitationem
        suscipit magni asperiores esse quas? Earum consequatur asperiores
        maiores adipisci velit reprehenderit eius minus!
      </p>
    );
  };

  const isLoading = form.formState.isSubmitting;

  const addRequirement = async (items: string) => {
    if (items === 'requirements.items') {
      const currentItems = form.getValues().requirements.items;
      form.setValue('requirements.items', [...currentItems, '']);
    } else if (items === 'role.items') {
      const currentItems = form.getValues().role.items;
      form.setValue('role.items', [...currentItems, '']);
    }
    router.refresh();
  };

  const removeRequirement = async (index: number, items: string) => {
    if (items === 'requirements.items') {
      const currentItems = form.getValues().requirements.items;
      const updatedItems = currentItems.filter(
        (_: null, i: number) => i !== index
      );
      form.setValue('requirements.items', updatedItems);
    } else if (items === 'role.items') {
      const currentItems = form.getValues().role.items;
      const updatedItems = currentItems.filter(
        (_: null, i: number) => i !== index
      );
      form.setValue('role.items', updatedItems);
    }
    router.refresh();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        //update job
        await axios.patch(`/api/job/${initialData.id}`, values);
      } else {
        //create job
        await axios.post('/api/job', values);
      }

      if (initialData) {
        toast({
          description: 'Your job has been successfully updated.',
        });
      } else {
        toast({
          description: 'Your job has been successfully created.',
        });
      }

      router.refresh();
      router.push('/');
    } catch (error) {
      //TODO: toast error
      toast({
        variant: 'destructive',
        description: 'Something went wrong. Please try again.',
      } as any);
    }
  };

  const formValues = form.getValues();

  return (
    <div className='h-full p-4 space-y-2 max-w-3xl mx-auto '>
      <ArrowLeft
        className='cursor-pointer 
            hover:scale-105 transform transition-all duration-200
          hover:text-background
            text-muted-foreground

        '
        onClick={() => router.back()}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 pb-10'
        >
          <div className='space-y-2 w-full text-start'>
            <div>
              <h3 className='text-lg font-medium text-background'>
                Job Information
              </h3>
              <p className='text-sm text-muted-foreground'>
                General information about the job.
              </p>
            </div>
            <Separator className='bg-background' orientation='horizontal' />
          </div>

          <FormField
            name='logo'
            control={form.control}
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

          <FormField
            name='description'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel htmlFor='description'>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    placeholder='e.g. We are looking for a Senior Software Engineer to join as one of our first hires. As we iterate on our MVP, you will have the opportunity to drive the vision and own the build behind our digital experience. You’ll have the support of an experienced technical advisor, a Head of Product, and an external team to work with'
                    className='
                      resize-none
                      h-32
                      text-sm
                    '
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  the content of the description section.
                </FormDescription>
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
                        placeholder='e.g. The ideal candidate is as passionate about solving challenges through technology. They are well-versed in building proof of concepts from scratch and taking these POCs to production and scale. The right fit will have the engineering experience to build and iterate quickly and is comfortable working with product and design to set the technical strategy and roadmap. '
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

              {formValues.requirements.items.map((_: null, index: number) => (
                <div key={index} className='col-span-2 md:col-span-1'>
                  <FormField
                    name={`requirements.items.${index}`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className='relative'>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder='e.g. requirement'
                            className=''
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    onClick={() =>
                      removeRequirement(index, 'requirements.items')
                    }
                    className='p-0'
                    disabled={isLoading}
                    type='button'
                  >
                    <Trash size={16} className='hover:text-red-400' />
                  </Button>
                </div>
              ))}

              <div className='col-span-2 md:col-span-1 space-y-2'>
                {formValues.requirements.items.length < 1 && (
                  <p className='text-sm text-muted-foreground'>
                    Add requirements
                  </p>
                )}
                <Button
                  onClick={() => addRequirement('requirements.items')}
                  variant='secondary'
                  type='button'
                  disabled={isLoading}
                >
                  <Plus size={16} />
                </Button>
              </div>
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
                        placeholder='e.g. We are looking for a Senior Software Engineer to join as one of our first hires. As we iterate on our MVP, you will have the opportunity to drive the vision and own the build behind our digital experience. You’ll have the support of an experienced technical advisor, a Head of Product, and an external team to work with'
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

              {formValues.role.items.map((_: null, index: number) => (
                <div key={index} className='col-span-2 md:col-span-1'>
                  <FormField
                    name={`role.items.${index}`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder='e.g. role'
                            className=''
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    onClick={() => removeRequirement(index, 'role.items')}
                    className='p-0'
                    disabled={isLoading}
                    type='button'
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
              <div className='col-span-2 md:col-span-1 space-y-2'>
                {formValues.role.items.length < 1 && (
                  <p className='text-sm text-muted-foreground'>Add role</p>
                )}
                <Button
                  onClick={() => addRequirement('role.items')}
                  variant='secondary'
                  type='button'
                  disabled={isLoading}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </div>

          <Separator className='bg-background' orientation='horizontal' />

          <Button
            size='lg'
            disabled={isLoading}
            variant='secondary'
            type='submit'
          >
            {initialData ? 'Update' : 'Create'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default JobsForm;
