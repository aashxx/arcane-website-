import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ANIMATIONS } from "@/utils/constants";

const Events = () => {
  return (
    <main className="relative bg-black min-h-screen w-full px-6">
      <motion.h2 {...ANIMATIONS.up} className='text-white px-4 font-valorax text-3xl md:text-5xl text-center pt-32'>
        Events
      </motion.h2>
      <div className="flex flex-col items-center justify-center gap-5 md:gap-12 py-12 md:flex-row">
        <motion.div {...ANIMATIONS.left}>
          <Link to={'/events/technical-events'} className="relative flex md:w-[370px] md:h-[370px] items-center justify-start group">
            <img src="/images/technical.png" className="w-full h-full rounded-lg object-cover" />
            <div className="absolute inset-0 transition-opacity duration-300 rounded-lg md:opacity-0 bg-gradient-to-t from-arcane-primary to-transparent md:group-hover:opacity-60" />
            <h4 className="absolute z-10 text-5xl text-white transition-opacity duration-300 font-valorax bottom-4 left-4">
              Technical
            </h4>
          </Link>
        </motion.div>
        <motion.div {...ANIMATIONS.right}>
          <Link to={'/events/non-technical-events'} className="relative flex md:w-[370px] md:h-[370px] items-center justify-start group">
            <img src="/images/non-tech.png" className="w-full h-full rounded-lg object-cover" />
            <div className="absolute inset-0 transition-opacity duration-300 rounded-lg md:opacity-0 bg-gradient-to-t from-arcane-primary to-transparent md:group-hover:opacity-60" />
            <h4 className="absolute z-10 text-5xl text-white transition-opacity duration-300 font-valorax bottom-4 left-4">
              Non Technical
            </h4>
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default Events;
