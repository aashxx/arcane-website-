import React from 'react';
import { IoMdCall, IoMdMail } from "react-icons/io";

const Contact = () => {
    return (
        <main className='bg-black text-white relative overflow-hidden'>
            <section className='flex flex-col items-center py-10 mt-16 md:mt-0 text-center gap-10 md:items-start md:text-left px-6 md:px-32 md:gap-4 md:pt-32'>
                <h2 className='md:text-5xl text-4xl text-center w-full font-valorax'>
                    Got Queries? <span className='text-arcane-primary text-4xl md:text-5xl py-1 md:border-b-2 border-white'>Reach out</span> to us
                </h2>
            </section>
            <section className='w-[90%] mx-auto mt-10 mb-24 flex flex-wrap justify-center'>
                <article className='md:pr-12 md:border-r-2 md:border-[#252526]'>
                    <h3 className='text-2xl font-bold font-expletus-sans text-white mb-4'>
                        Primary Contact
                    </h3>
                    <aside className='flex flex-col md:gap-10 gap-8 text-xl font-expletus-sans px-6 md:px-10 py-12 rounded-md bg-[#252526] w-[370px] md:w-[370px]'>
                        <p className='flex gap-2 items-center'>
                            <IoMdMail />
                            csearcane2024@gmail.com
                        </p>
                        <p className='flex gap-2 items-center'>
                            <IoMdCall />
                            +91 9025681651
                        </p>
                        <p className='flex gap-4 items-center'>
                            <IoMdCall />
                            +91 9629327633
                        </p>
                    </aside>
                </article>
                <article className='md:pl-12 mt-4 md:mt-[unset]'>
                    <h3 className='text-2xl font-bold font-expletus-sans text-white mb-4'>
                        Chat with us
                    </h3>
                    <aside className='flex justify-between items-center text-2xl font-expletus-sans px-10 py-6 rounded-md bg-[#252526] w-[370px] md:w-[400px]'>
                        <a href='https://wa.me/+919025681651' target='blank' className='h-[50px] w-[50px] flex flex-col items-center justify-center'>
                            <img src={'/images/whatsapp.png'} className='max-h-[100%] max-w-[100%]'  alt="Whatsapp" />
                            <p className='text-sm'>
                                Mohanraj
                            </p>
                        </a>
                        <a href='https://wa.me/+919629327633' target='blank' className='h-[50px] w-[50px] flex flex-col items-center justify-center'>
                            <img src={'/images/whatsapp.png'} className='max-h-[100%] max-w-[100%]'  alt="Whatsapp" />
                            <p className='text-sm'>
                                Saif Z
                            </p>
                        </a>
                        <a href='https://wa.me/+918220121649' target='blank' className='h-[50px] w-[50px] flex flex-col items-center justify-center'>
                            <img src={'/images/whatsapp.png'} className='max-h-[100%] max-w-[100%]'  alt="Whatsapp" />
                            <p className='text-sm'>
                                Samir
                            </p>
                        </a>
                    </aside>
                    <h3 className='text-2xl mt-5 font-bold font-expletus-sans text-white mb-4'>
                        Social Links
                    </h3>
                    <aside className='flex justify-between items-center text-2xl font-expletus-sans px-10 py-6 rounded-md bg-[#252526] w-[370px] md:w-[400px]'>
                        <a href="https://www.instagram.com/arcane_2k24" target='blank'>
                            <img src={'/images/insta.png'} className='max-h-[50px] max-w-[50px]' alt="Instagram" />
                        </a>
                        <a href="https://x.com/bsacrescentinst" target='blank'>
                            <img src={'/images/x.png'} className='max-h-[50px] max-w-[50px]' alt="X" />
                        </a>
                        <a href="https://www.youtube.com/c/BSACrescentInstitute" target='blank'>
                            <img src={'/images/youtube.png'} className='max-h-[50px] max-w-[50px]' alt="Youtube" />
                        </a>
                        <a href="https://www.linkedin.com/school/crescentinstitute/" target='blank'>
                            <img src={'/images/linkedin.png'} className='max-h-[50px] max-w-[50px]' alt="Linkedin" />
                        </a>
                    </aside>
                </article>
            </section>
        </main>
    )
}

export default Contact;