import Image from 'next/image';

import { TypeAnimation } from './_components/type-animation';

const Home = () => {
  return (
    <div className='h-full flex justify-center items-center text-neutral-900 px-8 my-32 2xl:my-40'>
      <div className='flex flex-col gap-8 xl:gap-4 xl:flex-row xl:justify-evenly h-full w-full'>
        <div className='flex flex-col py-20'>
          <h1 className='text-6xl font-bold space-x-20'>
            <span className='text-7xl'>Track</span> your X's with <br />
            <TypeAnimation
              text='tracker.io'
              className='text-8xl text-[#AFB10B]'
              showCursor={true}
            />
          </h1>
        </div>
        <div>
          <Image
            alt='Landing Page Image'
            src={'/landing-image.jpg'}
            className='w-full h-full'
            width='2000'
            height='2800'
          />
        </div>
      </div>
    </div>
  )
};

export default Home;