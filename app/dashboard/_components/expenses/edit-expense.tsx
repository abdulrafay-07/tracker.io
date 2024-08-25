import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export const EditExpense = () => {
   return (
      <Button size='icon' variant='ghost'>
         <Edit className='h-5 w-5 text-green-700 hover:text-green-800' />
      </Button>
   )
};