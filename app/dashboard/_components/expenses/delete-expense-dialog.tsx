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
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface DeleteExpenseDialog {
   handleDelete: (id: string) => void;
   id: string;
   isDeleting: boolean;
};

export const DeleteExpenseDialog = ({
   handleDelete,
   id,
   isDeleting,
}: DeleteExpenseDialog) => {
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button
               size='icon'
               variant='ghost'
            >
               <Trash2 className='h-5 w-5' />
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you sure you want to delete this expense?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the expense.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction
                  className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  onClick={() => handleDelete(id)}
                  disabled={isDeleting}
               >
                  Delete
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
};