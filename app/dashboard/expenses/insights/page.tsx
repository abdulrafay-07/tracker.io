import { MaxWidthContainer } from '@/components/max-width-container';
import { TotalSpentChart } from '../../_components/expenses/total-spent-chart';

const Insights = () => {
   return (
      <MaxWidthContainer className='flex flex-col gap-y-10'>
         <TotalSpentChart />
      </MaxWidthContainer>
   )
};

export default Insights;