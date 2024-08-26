import { MaxWidthContainer } from '@/components/max-width-container';
import { DonutChart } from '../../_components/jobs/donut-chart';

const Analytics = () => {
   return (
      <MaxWidthContainer className='flex flex-col gap-y-10'>
         <div className='flex flex-col lg:flex-row lg:justify-between'>
            <DonutChart />
            {/* Another chart? */}
         </div>
      </MaxWidthContainer>
   )
};

export default Analytics;