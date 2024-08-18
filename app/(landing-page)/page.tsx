import { TypeAnimation } from './_components/type-animation';

const Home = () => {
  return (
    <div className='h-full flex justify-center items-center text-neutral-900 px-8 my-32 2xl:my-40'>
      <div className='flex flex-col gap-8 lg:gap-4 lg:flex-row lg:justify-evenly h-full w-full'>
        <div className='flex flex-col items-center lg:pt-16 md:mb-8 lg:mb-0'>
          <h1 className='text-2xl md:text-5xl xl:text-6xl font-bold md:space-x-20'>
            <span className='text-3xl md:text-6xl xl:text-7xl'>Track</span> your X&apos;s with <br />
            <TypeAnimation
              text='tracker.io'
              className='text-6xl md:text-7xl xl:text-8xl text-[#AFB10B]'
              showCursor={true}
            />
          </h1>
        </div>
        <div className='lg:w-2/5 lg:h-1/2'>
          <video
            src={'/landing.mp4'}
            className='aspect-video rounded-xl w-full'
            controls={false}
            loop={false}
            muted
            autoPlay
          />
        </div>
      </div>
    </div>
  )
};

export default Home;