import { NON_TECH_EVENTS, TECH_EVENTS } from '@/utils/constants';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock } from "react-icons/fa6";
import { IoMdPin } from "react-icons/io";

const EventDetails = () => {

  const params = useParams();
  const { eventName } = params;

  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (eventName) {
      const foundEvent = TECH_EVENTS.find(ev => ev.name.toLowerCase() === eventName.toLowerCase()) || 
                         NON_TECH_EVENTS.find(ev => ev.name.toLowerCase() === eventName.toLowerCase());
      setEvent(foundEvent);
    }
  }, [eventName]);

  if (!event) {
    return <div className="text-white font-expletus-sans">Event not found</div>;
  }

  return (
    <main className="relative bg-black min-h-screen font-expletus-sans pt-32 pb-20 gap-10 w-full px-6 md:px-32 flex items-start md:flex-row flex-col">
      <section className='flex flex-col gap-2 md:w-[30%] w-full'>
        <div className='w-full'>
          <aside className="relative flex w-full items-center justify-start group">
            <img src={event.img} alt={event.name} className="w-full h-full rounded-lg object-cover" />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-arcane-primary to-transparent" />
            <h4 className="absolute z-10 text-2xl md:px-2 text-white font-valorax bottom-4 left-4">
              {event.name}
            </h4>
          </aside>
        </div>
        <div className='rounded-lg bg-arcane-primary py-3 px-7'>
          <h4 className='text-white font-bold'>
            Timings
          </h4>
          <p className='text-white font-bold text-xl'>
            {event.startTime} - {event.endTime}
          </p>
        </div>
        <div className='rounded-lg bg-arcane-primary py-3 px-7'>
          <h4 className='text-white font-bold'>
            Faculty Coordinators
          </h4>
          <ul className='text-white mt-2'>
            {event.coordinators?.faculty.map((faculty, index) => (
              <li key={index} className='text-md'>
                {faculty}
              </li>
            ))}
          </ul>
        </div>
        <div className='rounded-lg bg-arcane-primary py-3 px-7'>
          <h4 className='text-white font-bold'>
            Student Coordinators
          </h4>
          <ul className='text-white mt-2'>
            {event.coordinators?.student.map((student, index) => (
              <li key={index} className='text-md uppercase'>
                {student.name} - {student.phone}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className='flex flex-col gap-3 md:w-[70%] w-full mt-4 md:mt-0'>
      <h2 className="text-3xl font-valorax text-arcane-primary">
          Participation
        </h2>
        <p className="text-[#d3d3d3] text-[0.9rem] text-justify">
          {event.participation}
        </p>
        <h2 className="text-3xl font-valorax text-arcane-primary">
          Description
        </h2>
        <p className="text-[#d3d3d3] text-[0.9rem] text-justify">
          {event.description}
        </p>

        {/* Render Rounds Section if rounds exist */}
        {event.rounds && event.rounds.length > 0 && (
          <>
            <h3 className="text-3xl font-valorax text-arcane-primary mt-4">
              Rounds
            </h3>
            <ul className="text-[#d3d3d3] text-[0.9rem] list-disc md:ml-6 ml-3">
              {event.rounds.map((round, index) => (
                <li key={index} className='text-justify'>
                  <strong>{round.roundName}</strong> - {round.description}
                  <div className="mt-1">
                    <span>Duration: {round.duration}</span> | <span>Contestants: {round.contestants}</span>
                    {round.elimination && <span> | Elimination: {round.elimination}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        <h3 className="text-3xl font-valorax text-arcane-primary mt-4">
          Rules
        </h3>
        <ul className="text-[#d3d3d3] text-[0.9rem] list-disc md:ml-6 ml-3">
          {event.rules.map((rule, index) => (
            <li className='text-justify' key={index}>
              {rule}
            </li>
          ))}
        </ul>
        <h3 className="text-3xl font-valorax text-arcane-primary mt-4">
          Winning Criteria
        </h3>
        <p className="text-[#d3d3d3] text-justify text-[0.9rem]">
          {event.winningCriteria}
        </p>
      </section>
    </main>
  );
};

export default EventDetails;