import { UserButton } from '@clerk/nextjs';

const Dashboard = () => {
    return (
        <div className='flex justify-between'>
            Dashboard
            <UserButton />
        </div>
    )
};

export default Dashboard;