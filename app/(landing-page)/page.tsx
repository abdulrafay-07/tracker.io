import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { LandingVideo } from './_components/landing-video';
import { TypeAnimation } from './_components/type-animation';

const Home = () => {
  return (
    <div className='h-full py-20'>
      <div className='flex flex-col gap-y-8 max-w-6xl mx-auto px-8 md:px-12 py-16 md:py-20'>
        <div className='flex flex-col gap-y-2.5 h-full min-h-[100px] md:min-h-[125px] lg:min-h-[150px]'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl text-center font-semibold'>
              Track your X&apos;s with 
          </h1>
          <TypeAnimation
            text='tracker.io'
            className='text-6xl md:text-8xl xl:text-9xl font-bold text-center text-[#AFB10B]'
          />
        </div>
        <div className='flex flex-col gap-y-2.5 max-w-xs md:max-w-md mx-auto text-center font-medium text-muted-foreground'>
          <p>
            <span className='font-bold'>tracker.io</span> is an all-in-one tracking software designed to simplify your life by bringing all your tracking needs under one roof. Whether you&apos;re managing your finances, keeping track of job tasks, or monitoring your fitness journey, we have you covered.
          </p>
          <Link href='/sign-up' className='mt-4'>
            <Button variant='theme' size='lg'>
              Join Now!
            </Button>
          </Link>
        </div>
      </div>
      <LandingVideo />
      <div className='flex flex-col gap-y-8 max-w-6xl mx-auto px-8 md:px-12 py-16 md:py-20'>
        <h1 className='text-4xl md:text-5xl font-semibold text-center'>
          Simplify Your Life with <span className='text-[#AFB10B] font-bold text-5xl md:text-6xl'>tracker.io</span>
        </h1>
        <p className='text-muted-foreground max-w-xl mx-auto text-center'>
          Say goodbye to the hassle of juggling multiple apps for different needs. With tracker.io, you can streamline your tracking process, gain valuable insights, and focus on what really matters—achieving your goals.
        </p>
      </div>
    </div>
  )
};

export default Home;