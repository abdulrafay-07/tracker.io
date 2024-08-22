import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export const EditExpense = () => {
   return (
      <Button size='icon' variant='ghost' asChild>
         <Edit className='h-5 w-5' />
      </Button>
   )
};