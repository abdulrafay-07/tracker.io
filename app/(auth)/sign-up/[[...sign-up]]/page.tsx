import { SignUp } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className='min-h-screen h-full flex justify-center items-center px-8 py-20'>
            <SignUp />
        </div>
    )
};