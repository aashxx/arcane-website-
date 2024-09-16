import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ANIMATIONS } from '@/utils/constants';

const EventCard = ({ event }) => {

  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const eventType = pathParts[2];

  return (
    <motion.div {...ANIMATIONS.up} className='w-full rounded-lg border border-arcane-primary h-[130px] md:h-[300px] bg-[#161616] font-expletus-sans flex items-start justify-between'>
      <article className='w-[65%] p-3 md:p-10'>
        <h2 className='text-white font-valorax md:text-3xl'>
          {event.name}
        </h2>
        <p className='text-[12px] md:text-[16px] text-[gray] mt-1 md:mt-5 md:text-justify overflow-hidden line-clamp-2 md:line-clamp-3 text-ellipsis'>
          {event.description}
        </p>
        <div className='justify-between items-center mt-10 md:flex hidden'>
          <Link to={`/events/${eventType}/${event.name}`} className='px-10 py-2 text-white text-md bg-arcane-primary rounded-md'>
            View More
          </Link>
          {
            event.club && (
              <aside className='text-white items-center gap-3 flex w-[205px]'>
                Powered By 
                <img className={`${event.club === "https://i.postimg.cc/CLwLr5qM/Untitled-design-removebg-preview.png" || event.club === "https://i.postimg.cc/ydJbjy49/Untitled-design-1-removebg-preview-1.png" ? 'max-w-[50px]' : 'max-w-[100px]'}`} src={event.club} alt="AV" />
              </aside>
            )
          }
        </div>
        <div className='mt-2 md:hidden'>
          <Link to={`/events/${eventType}/${event.name}`} className='text-arcane-primary text-sm active:text-white active:underline'>
            View More
          </Link>
        </div>
      </article>
      <aside className='w-[35%] h-full relative rounded-r-lg'>
        <img className='w-full h-full rounded-r-lg object-cover' src={event.img} alt={event.name} />
        <div className="absolute rounded-r-lg inset-0 transition-opacity duration-300 bg-gradient-to-t from-arcane-primary to-transparent md:group-hover:opacity-60" />
      </aside>
    </motion.div>
  )
}

export default EventCard;