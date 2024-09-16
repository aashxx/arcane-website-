import React from "react";
import EventCard from "../components/EventCard";
import { NON_TECH_EVENTS } from "@/utils/constants";
import BlurIn from "@/components/magicui/blur-in";

const NonTechnical = () => {
  return (
    <main className="relative bg-black min-h-screen w-full">
      <section className="relative w-full h-[40vh] md:h-[50vh] bg-arcane-primary">
        <div style={{ background: "url('/images/non-tech-banner.png') no-repeat center center/cover", filter: "grayscale(100%)" }} className="absolute inset-0 opacity-60 bg-arcane-primary" />
        <BlurIn
          word={'Non Technical Events'} 
          className={'absolute z-20 pt-14 font-bold text-center w-full text-white transform -translate-x-1/2 -translate-y-1/2 text-5xl md:text-8xl top-1/2 left-1/2 font-valorax'} 
        />
      </section>
      <section className="flex flex-col gap-4 md:gap-8 items-center py-20 px-6 md:px-32">
        {
          NON_TECH_EVENTS.map((event, index) => (
            <EventCard key={index} event={event} />
          ))
        }
      </section>
    </main>
  );
};

export default NonTechnical;
