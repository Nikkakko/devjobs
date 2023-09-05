'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import axios from 'axios';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

const DeleteAlert = ({ id }: { id: string | undefined }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/job/${id}`);

      toast({
        title: 'Job deleted successfully',
        description: 'Your job has been deleted successfully',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'An error occured',
        description: 'An error occured while deleting your job',
      });
    } finally {
      router.push('/');
      router.refresh();
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash
          className='cursor-pointer 
          hover:scale-105 transform transition-all duration-200
          hover:text-red-500
          text-muted-foreground'
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your job
            from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
