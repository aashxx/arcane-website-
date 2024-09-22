import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { realdb } from '@/lib/firebase';
import { get, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const BlockRegistrations = () => {

  const [events, setEvents] = useState({});
  const eventRef = ref(realdb, `events`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(eventRef);
        if (snapshot.exists()) {
          setEvents(snapshot.val());
        }
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };

    fetchData();
  }, []);

  const changeStatus = async (eventName) => {
    try {
      const updatedEvents = { ...events };
      updatedEvents[eventName] = updatedEvents[eventName] === "open" ? "closed" : "open";
      await set(eventRef, updatedEvents);
      setEvents(updatedEvents);
      toast.success(`Event status changed for ${eventName}`);
    } catch (error) {
      toast.error("Failed to change event status");
      console.error("Error changing status", error);
    }
  };

  return (
    <div className="text-center text-white font-expletus-sans mt-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-[150px]">Block Registrations</Button>
        </DialogTrigger>
        <DialogContent className="font-expletus-sans bg-black">
          <DialogHeader>
            <DialogTitle>Block Event Registrations</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(events).map(([eventName, status]) => (
              <div key={eventName} className="flex justify-between items-center">
                <p className={`text-white ${status === "open" ? "text-green-500" : "text-purple-500"}`}>{eventName}</p>
                <Button onClick={() => changeStatus(eventName)} className="w-[100px]">
                  {status === "open" ? "Close" : "Open"}
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlockRegistrations;