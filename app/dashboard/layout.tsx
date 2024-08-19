import { Navbar } from './_components/navbar';

interface DashboardLayoutProps {
   children: React.ReactNode;
};

const DashboardLayout = ({
   children
}: DashboardLayoutProps) => {
   return (
      <main className='h-full flex-1'>
         <Navbar />
         {children}
      </main>
   )
};

export default DashboardLayout;