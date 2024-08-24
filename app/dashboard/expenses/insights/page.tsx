import { MaxWithContainer } from '@/components/max-width-container';
import { TotalSpentChart } from '../../_components/expenses/total-spent-chart';

const Insights = () => {
   return (
      <MaxWithContainer className='flex flex-col gap-y-10'>
         <TotalSpentChart />
      </MaxWithContainer>
   )
};

export default Insights;