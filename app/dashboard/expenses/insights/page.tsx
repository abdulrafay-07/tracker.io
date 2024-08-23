import { TotalSpentChart } from '../../_components/expenses/total-spent-chart';

const Insights = () => {
   return (
      <div className='h-full max-w-6xl mx-auto px-4 md:px-12 xl:px-4 py-20 flex flex-col gap-y-10'>
         <TotalSpentChart />
      </div>
   )
};

export default Insights;