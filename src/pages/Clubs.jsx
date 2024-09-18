import React from 'react';
import { motion } from "framer-motion";
import { ANIMATIONS, CLUB_CARDS } from "@/utils/constants";
import { Link } from 'react-router-dom';

const Clubs = () => {
  return (
    <main className="relative bg-black min-h-screen w-full px-6">
      <motion.h2 {...ANIMATIONS.up} className='text-white px-4 font-valorax text-3xl md:text-5xl text-center pt-32'>
        Clubs
      </motion.h2>
      <div className='flex flex-col flex-wrap items-center justify-center gap-5 md:gap-12 py-12 md:flex-row md:px-32 px-6'>
        {
          CLUB_CARDS.map((club, index) => (
            <motion.div key={index} {...ANIMATIONS.up} className='md:w-[20%] h-[150px] w-full'>
              <aside className="relative flex w-full max-h-hull items-center justify-start group">
                <img src={club.img} alt={club.name} className="w-full h-[150px] rounded-lg object-contain" />
                <div className="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-0 bg-gradient-to-t from-arcane-primary to-transparent" />
              </aside>
            </motion.div>
          ))
        }
        {/* {
          CLUB_CARDS.map((club, index) => (
            <motion.div key={index} {...ANIMATIONS.up} className='md:w-[30%] w-full'>
              <Link to={`/clubs/${club.name}`} className="relative flex w-full items-center justify-start group">
                <img src={club.img0} alt={club.name} className="w-full h-full rounded-lg object-cover" />
                <div className="absolute inset-0 transition-opacity duration-300 rounded-lg md:opacity-0 bg-gradient-to-t from-arcane-primary to-transparent md:group-hover:opacity-60" />
                <h4 className="absolute z-10 text-2xl md:px-2 text-white md:opacity-0 transition-opacity duration-300 font-valorax bottom-4 left-4 md:group-hover:opacity-100">
                  {club.name}
                </h4>
              </Link>
            </motion.div>
          ))
        } */}
      </div>
    </main>
  )
}

export default Clubs;