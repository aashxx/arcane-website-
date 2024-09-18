import { cn } from '../lib/utils';
import React from 'react';
import AnimatedShinyText from '../components/magicui/animated-shiny-text';
import { ArrowRightIcon } from 'lucide-react';
import Timer from '@/components/Timer';
import SpotLight from '@/components/SpotLight';
import { NON_TECH_EVENTS, SPOTLIGHT, TECH_EVENTS } from '../utils/constants';
import { VelocityScroll } from '@/components/magicui/scroll-based-velocity';
import { RevVelocityScroll } from '@/components/magicui/rev-scroll-based-velocity';
import { Link } from 'react-router-dom';
import BlurIn from '@/components/magicui/blur-in';
import BoxReveal from '@/components/magicui/box-reveal';

const Home = () => {
    return (
        <main className='relative bg-arcane-primary font-expletus-sans'>
            <section style={{ background: "url('/images/hero.png') no-repeat center center/cover"}} className='md:h-screen w-full px-4 flex flex-col justify-center items-center gap-5'>
            <aside className='flex gap-4 items-center md:mt-[unset]'>
                        <img className='h-[70px] md:h-[70px]' src="/images/csea.png" alt="csea" />
                        <img className=' -md:ml-[unset] w-[150px]' src="https://i.postimg.cc/6pF6n3hW/Crescent-Logo-with-TM-white.png" alt="crescent" />
                        <img className='h-[50px]' src="/images/acm.png" alt="acm" />
                    </aside>
                <div className="z-10 flex items-center justify-center mb-16">
                    
                    <div
                        className={cn(
                        "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                        )}
                    >
                        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                            <span className='md:text-sm text-[13px]'>✨ Department of Computer Science & Engineering</span>
                            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                        </AnimatedShinyText>
                    </div>
                </div>
                <BlurIn 
                    word={'Code the Impossible'} 
                    className={'text-white text-5xl md:text-6xl 2xl:text-8xl font-valorax text-center'} 
                />
                <p className='text-white text-center text-md font-medium'>
                    Welcome to Arcane, Our department's National Level Technical Symposium
                </p>
                <div className='flex items-center gap-4 mt-4'>
                    <Link to={'/events'} className='rounded-lg bg-gradient-to-r from-[#DD7C8D] to-[#80EAF9] text-white p-[1px]'>
                        <div className='bg-arcane-primary hover:bg-white hover:text-arcane-primary py-2 px-14 transition-all duration-300 ease-out rounded-lg'>
                            Explore
                        </div>
                    </Link>
                    <Link to={'/register'} className='rounded-lg hover:bg-white hover:text-black bg-black border border-black text-white py-2 px-14 transition-all duration-300 ease-out'>
                        Register
                    </Link>
                </div>
                <div className='mt-6'>
                    {/* <h4 className='text-white text-center text-xl font-medium'>
                        Supported By
                    </h4> */}
                    {/* <aside className='flex gap-4 items-center mt-5 md:mt-[unset]'>
                        <img className='h-[130px] md:h-[150px]' src="/images/csea.png" alt="csea" />
                        <img className='-ml-5 -md:ml-[unset] w-[300px]' src="https://i.postimg.cc/Jn8nVW1Z/Whats-App-Image-2024-09-18-at-12-03-12-PM-removebg-preview.png" alt="crescent" />
                        <img className='h-[100px] md:ml-6' src="/images/acm.png" alt="acm" />
                    </aside> */}
                </div>
            </section>
            <section className='bg-[#171717] py-10 z-20 relative'>
                <Timer />
            </section>
            <section className='py-14 relative bg-black overflow-hidden'>
                <div className="h-64 w-96 bg-arcane-primary absolute md:-right-24 z-10 rounded-full blur-[150px]" />
                <div className='relative mt-10 z-20'>
                    <h3 className='text-white px-4 font-valorax text-2xl md:text-4xl text-center'>
                        <span className='text-arcane-primary'>Arcane</span> Glimpses
                    </h3>
                    <aside className='overflow-x-hidden mt-8'>
                        <SpotLight />
                    </aside>
                </div>
                <div className="h-64 w-96 bg-arcane-primary absolute md:-left-24 z-10 rounded-full blur-[150px] hidden md:block" />
                <div className='bg-arcane-primary z-20 rounded-lg relative p-4 md:p-10 md:h-[230px] mt-14 md:mt-20 md:mx-32 mx-4'>
                    <img className='max-h-full hidden md:block absolute top-0 right-0' src={'/images/ben-card.png'} alt="AV" />
                    <h3 className='font-valorax text-center md:text-left text-white text-2xl md:text-4xl uppercase z-30'>
                        win cash prices <br />upto <span className='text-black'>Rs.2000</span>
                    </h3>
                    <p className='text-[#d3d3d3] font-expletus-sans text-sm'>
                        *Certificates will be provided
                    </p>
                    <aside className='flex md:justify-between justify-center items-center mt-6'>
                        <a href={'/register'} className='px-10 py-2 text-white bg-black z-20'>
                            Register Now
                        </a>
                    </aside>
                </div>
                <div className='mt-16 z-20 relative'>
                    <Link to={'/'}>
                        <VelocityScroll 
                            text={` - ${TECH_EVENTS.map(event => event.name).join(' - ')}`} 
                            default_velocity={1}
                            className={'md:text-6xl text-5xl font-valorax text-white hover:text-arcane-primary'}
                        />
                    </Link>
                    <Link to={'/'}>
                        <RevVelocityScroll
                            text={` - ${NON_TECH_EVENTS.map(event => event.name).join(' - ')}`} 
                            default_velocity={1}
                            className={'md:text-6xl text-5xl font-valorax text-white hover:text-arcane-primary'}
                        />
                    </Link>
                </div>
            </section>
            <section className='md:py-16 py-10 md:px-32 px-4 bg-white flex gap-10 flex-col-reverse md:flex-row'>
                <div className='md:w-[50%] w-full flex flex-col gap-5 items-center md:items-start px-4'>
                    <BoxReveal duration={0.5} boxColor={'#9E325F'}>
                        <h2 className='text-4xl text-center md:text-left text-arcane-primary font-valorax'>
                            We are Arcane
                        </h2>
                    </BoxReveal>
                    <BoxReveal duration={0.5} boxColor={'#9E325F'}>
                        <p className='text-justify'>
                            The most prestigious symposium organized by the Department of Computer Science & Engineering at B. S. Abdur Rahman Crescent Institute of Science and Technology. Held annually in September, ARCANE stands as a hallmark of excellence, featuring a wide array of both technical and non-technical events.
                        </p>
                    </BoxReveal>
                    <BoxReveal duration={0.5} boxColor={'#9E325F'}>
                        <p className='text-justify'>
                            This symposium serves as a platform for students to challenge their skills, explore new ideas, and collaborate with peers across disciplines. Known for its elite status, ARCANE is not just a symposium—it's a celebration of knowledge, problem-solving, and competition. 
                        </p>
                    </BoxReveal>
                    <BoxReveal duration={0.5} boxColor={'#9E325F'}>
                        <a href='/register'>
                            <button className='px-10 py-2 text-white bg-arcane-primary mt-5 z-20'>
                                Register Now
                            </button>
                        </a>
                    </BoxReveal>
                </div>
                <div className='rounded-lg bg-arcane-primary w-full md:w-[50%]'>
                    <video src='/videos/arcane.mov' autoPlay loop muted className="w-full h-full object-cover rounded-lg">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>
            <section className='bg-black relative md:py-14 py-10 md:px-32 px-4'>
                <h3 className='text-arcane-primary px-4 font-valorax text-2xl md:text-4xl text-center'>
                    Sponsored By
                </h3>
                <div className='flex flex-col md:flex-row gap-10 items-center justify-center mt-10'>
                    <aside className='rounded-lg bg-[#1C1C1C] text-white h-[200px] w-[200px] flex justify-center items-center'>Coming Soon</aside>
                    <aside className='rounded-lg bg-[#1C1C1C] text-white h-[200px] w-[200px] flex justify-center items-center'>Coming Soon</aside>
                    <aside className='rounded-lg bg-[#1C1C1C] text-white h-[200px] w-[200px] flex justify-center items-center'>Coming Soon</aside>
                </div>
            </section>
        </main>
    )   
}

export default Home;