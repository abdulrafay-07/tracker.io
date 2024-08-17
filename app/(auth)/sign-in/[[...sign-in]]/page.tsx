import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className='h-full flex justify-center items-center px-8 my-20'>
            <SignIn />
        </div>
    )
};