import BlurIn from '@/components/magicui/blur-in';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NON_TECH_EVENTS, TECH_EVENTS } from '@/utils/constants';
import { Link } from 'react-router-dom';
import { RegisterContext } from '../contexts/RegisterContext'; 
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { FaCheck } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import dayjs from 'dayjs';
import Payment from '@/components/Payment';

const Register = () => {

  const { participant, setParticipant, loading, setLoading, formatTime, calculatePrice, validatePersonalDetails } = useContext(RegisterContext);  

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(20);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

  // Handle input change for participant personal details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipant({ ...participant, [name]: value });
  };

  // Convert time string to a number for easy comparison
  const convertTime = (time) => parseInt(time.replace(":", ""));

  // Check if an unselected event has a time overlap with already selected events
  const checkTimeOverlap = (newEvent) => {
    const newEventStart = convertTime(newEvent.startTime);
    const newEventEnd = convertTime(newEvent.endTime);

    return participant.events.some((selectedEventName) => {
      const selectedEvent = TECH_EVENTS.concat(NON_TECH_EVENTS).find(e => e.name === selectedEventName);

      // If the event has multiple rounds, only check overlap with the first round
      if (selectedEvent.isMultipleRounds) {
        const selectedStart = convertTime(selectedEvent.startTime);
        const selectedEnd = convertTime(selectedEvent.endTime);
        return (newEventStart < selectedEnd && newEventEnd > selectedStart); // Check overlap with first round
      }

      // For other events, perform the usual time overlap check
      const selectedStart = convertTime(selectedEvent.startTime);
      const selectedEnd = convertTime(selectedEvent.endTime);

      return (newEventStart < selectedEnd && newEventEnd > selectedStart);
    });
  };

  // Handle event selection and deselection
  const handleEventClick = (eventName) => {
    if (!validatePersonalDetails()) {
      return;
    }

    const isEventSelected = participant.events.includes(eventName);

    // If the event is already selected, allow deselection
    if (isEventSelected) {
      setParticipant((prevParticipant) => {
        const updatedEvents = prevParticipant.events.filter(event => event !== eventName);
        return { ...prevParticipant, events: updatedEvents };
      });
    } else {
      const newEvent = TECH_EVENTS.concat(NON_TECH_EVENTS).find(event => event.name === eventName);

      if (checkTimeOverlap(newEvent)) {
        toast.error("Overlapping time slots");
        return;
      }

      setParticipant((prevParticipant) => {
        const updatedEvents = [...prevParticipant.events, eventName];
        return { ...prevParticipant, events: updatedEvents };
      });
    }
  };

  // Determine if the event is selectable based on time overlap, but selected events are always selectable
  const isEventSelectable = (event) => {
    const isSelected = participant.events.includes(event.name);
    return isSelected || !checkTimeOverlap(event);
  };

  // OTP-related functions for email verification
  const sendOTP = async (email) => {
    try {
      setLoading(true);
      const response = await axios.post("https://arcane-website-backend.vercel.app/api/otp/send-otp", { email }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if(response.data.result === "Email already registered") {
        toast.error("Email already registered");
        setShouldOpenDialog(false);
      } else {
        toast.success("OTP sent to your email address");
        setShouldOpenDialog(true);
        setCanResendOtp(false);
        setTimer(20);
      }
    } catch (error) {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      const response = await axios.post("https://arcane-website-backend.vercel.app/api/otp/verify-otp", { email: participant.email, otp }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.data.success) {
        toast.success("Email verified successfully");
        setParticipant({...participant, emailVerified: true });
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP", error);
    } finally {
      setOtp('');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }

    if (timer === 0) {
      setCanResendOtp(true);
    }
  }, [timer]);
  
  return (
    <main className="relative bg-black min-h-screen w-full">
      {loading && <Loader />}
      <section className="relative w-full h-[40vh] md:h-[50vh] bg-arcane-primary">
        <div style={{ background: "url('/images/semi-hero.png') no-repeat center center/cover", filter: "grayscale(100%)" }} className="absolute inset-0 opacity-60 bg-arcane-primary" />
        <BlurIn
          word={'Register Now'} 
          className={'absolute z-20 pt-14 font-bold text-center w-full text-white transform -translate-x-1/2 -translate-y-1/2 text-5xl md:text-8xl top-1/2 left-1/2 font-valorax'} 
        />
      </section>
      <section className='relative py-14 md:px-32 px-6'>
        <h3 className='text-white text-2xl font-valorax text-center'>Personal Details</h3>
        <div className='flex gap-5 items-center justify-center flex-wrap mt-10'>
          <Input name="fullName" value={participant.fullName} onChange={handleChange} placeholder={'Full Name'} />
          <Input name="college" value={participant.college} onChange={handleChange} placeholder={'College / University'} />
          <aside className='md:w-[48%] w-full relative'>
            {participant.emailVerified ? (
              <aside className='bg-arcane-primary rounded-full absolute p-1 right-3 top-2'>
                <FaCheck className='text-white' />
              </aside>
            ) : participant.email.includes('@') && (
              <>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className='text-arcane-primary text-md absolute font-semibold font-expletus-sans right-4 top-2'>
                      Verify
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className={'font-expletus-sans'}>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Verify your email address.</AlertDialogTitle>
                      <AlertDialogDescription>
                        An OTP will be sent to the entered email address <strong>{participant.email}</strong>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => sendOTP(participant.email)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                {shouldOpenDialog && (
                  <Dialog open={shouldOpenDialog} onOpenChange={setShouldOpenDialog}>
                    <DialogContent className="font-expletus-sans">
                      <DialogHeader>
                        <DialogTitle>Enter OTP</DialogTitle>
                        <DialogDescription>
                          The OTP was sent to the email address <strong>{participant.email}</strong>
                        </DialogDescription>
                      </DialogHeader>
                      <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      <DialogFooter>
                        <Button onClick={verifyOTP}>Verify OTP</Button>
                        <p className='text-sm text-white font-extralight mt-3'>
                          {canResendOtp ? (
                            <button onClick={() => sendOTP(participant.email)} className='text-arcane-primary hover:underline'>Resend OTP</button>
                          ) : (
                            `You can resend OTP in ${formatTime(timer)}`
                          )}
                        </p>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </>
            )}
            <input className={'flex h-10 w-full rounded-md font-expletus-sans pr-16 bg-[#1c1c1c] px-3 py-2 text-md file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[gray] outline-none text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border focus:border-arcane-primary'} name="email" value={participant.email} onChange={handleChange} placeholder={'Email'} />
          </aside>
          <Input name="phone" value={participant.phone} onChange={handleChange} placeholder={'Phone Number'} />
          <Input name="degree" value={participant.degree} onChange={handleChange} placeholder={'Degree'} />
          <Select onValueChange={(value) => setParticipant({ ...participant, year: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="second">II</SelectItem>
                <SelectItem value="third">III</SelectItem>
                <SelectItem value="fourth">IV</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <h3 className='text-white text-2xl font-valorax text-center my-10'>Select Events</h3>
        <div className='flex gap-5 w-full items-start justify-center flex-wrap mt-10'>
          <aside className='flex flex-col md:w-[48%] w-full justify-center items-center gap-4'>
            <h4 className='text-xl font-valorax text-center text-arcane-primary'>Technical Events</h4>
            {TECH_EVENTS.map((event, index) => (
              <article 
                key={index} 
                className={`w-full relative rounded-lg border h-[130px] transition-all duration-150 ease-in cursor-pointer bg-[#161616] font-expletus-sans flex items-start justify-between ${participant.events.includes(event.name) ? 'border-white border-4' : 'border-arcane-primary'} ${!isEventSelectable(event) && !participant.events.includes(event.name) ? 'opacity-50 cursor-not-allowed' : ''}`} 
                onClick={() => handleEventClick(event.name)}
              >
                {participant.events.includes(event.name) && (
                  <div className='absolute top-0 right-0 h-[30px] w-[30px] flex items-center justify-center bg-white rounded-bl-md z-20'>
                    <FaCheck className='text-2xl p-[3px] font-bold text-arcane-primary' />
                  </div>
                )}
                <div className='w-[70%] p-3'>
                  <h2 className='text-white text-xl font-valorax'>
                    {event.name}
                  </h2>
                  <div className='hidden md:block'>
                    <p className="text-[12px] mt-1 text-[gray] overflow-hidden md:text-justify line-clamp-2 text-ellipsis md:line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                  <div className='mt-2'>
                    <Link onClick={(e) => e.stopPropagation()} to={`/events/technical-events/${event.name}`} className='text-arcane-primary text-sm active:text-white active:underline hover:underline hover:text-white'>View More</Link>
                  </div>
                </div>
                <aside className='w-[30%] h-full relative rounded-r-lg'>
                  <img className='w-full h-full rounded-r-lg object-cover' src={event.img} alt={event.name} />
                  <div className="absolute rounded-r-lg inset-0 transition-opacity duration-300 bg-gradient-to-t from-arcane-primary to-transparent md:group-hover:opacity-60" />
                </aside>
              </article>
            ))}
          </aside>
          <aside className='flex flex-col md:w-[48%] w-full justify-center items-center gap-4'>
            <h4 className='text-xl font-valorax text-center text-arcane-primary'>Non Technical Events</h4>
            {NON_TECH_EVENTS.map((event, index) => (
              <article 
                key={index} 
                className={`w-full relative rounded-lg border h-[130px] transition-all duration-150 ease-in cursor-pointer bg-[#161616] font-expletus-sans flex items-start justify-between ${participant.events.includes(event.name) ? 'border-white border-4' : 'border-arcane-primary'} ${!isEventSelectable(event) && !participant.events.includes(event.name) ? 'opacity-50 cursor-not-allowed' : ''}`} 
                onClick={() => handleEventClick(event.name)}
              >
                {participant.events.includes(event.name) && (
                  <div className='absolute top-0 right-0 h-[30px] w-[30px] flex items-center justify-center bg-white rounded-bl-md z-20'>
                    <FaCheck className='text-2xl p-[3px] font-bold text-arcane-primary' />
                  </div>
                )}
                <div className='w-[70%] p-3'>
                  <h2 className='text-white text-xl font-valorax'>
                    {event.name}
                  </h2>
                  <div className='hidden md:block'>
                    <p className="text-[12px] mt-1 text-[gray] overflow-hidden md:text-justify line-clamp-2 text-ellipsis md:line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                  <div className='mt-2'>
                    <Link onClick={(e) => e.stopPropagation()} to={`/events/technical-events/${event.name}`} className='text-arcane-primary text-sm active:text-white active:underline hover:underline hover:text-white'>View More</Link>
                  </div>
                </div>
                <aside className='w-[30%] h-full relative rounded-r-lg'>
                  <img className='w-full h-full rounded-r-lg object-cover' src={event.img} alt={event.name} />
                  <div className="absolute rounded-r-lg inset-0 transition-opacity duration-300 bg-gradient-to-t from-arcane-primary to-transparent md:group-hover:opacity-60" />
                </aside>
              </article>
            ))}
          </aside>
        </div>
      </section>
      {
        participant.events.length !== 0 && (
          <section className='w-full md:px-32 px-4 font-expletus-sans py-3 flex items-center justify-between gap-6 bg-[#fff] border-t border-t-arcane-primary fixed bottom-0'>
            <div>
              <h4 className='font-bold text-2xl text-arcane-primary'>
                INR {calculatePrice()}.00
              </h4>
              <Drawer>
                <DrawerTrigger asChild>
                  <button className='text-sm text-arcane-primary underline'>
                    View split
                  </button>
                </DrawerTrigger>
                <DrawerContent className={'bg-[#fff] flex flex-col items-center'}>
                  <div className='flex flex-col md:max-w-[50%] w-full items-center py-10 md:px-32 px-4 font-expletus-sans'>
                    <DrawerHeader>
                      <DrawerTitle className="text-2xl">Payment Summary</DrawerTitle>
                      <DrawerDescription className="text-center">Date: {dayjs().format('DD/MM/YYYY')}</DrawerDescription>
                    </DrawerHeader>
                    <div className="w-full mt-6">
                      {/* Technical Events */}
                      {participant.events.filter(event => TECH_EVENTS.some(e => e.name === event)).length > 0 && (
                        <div className="flex justify-between gap-4 text-sm mt-2">
                          <aside className='w-[70%]'>Technical Events ({participant.events.filter(event => TECH_EVENTS.some(e => e.name === event)).join(', ')})</aside>
                          <aside>INR {participant.events.filter(event => TECH_EVENTS.some(e => e.name === event)).length > 0 && participant.events.filter(event => NON_TECH_EVENTS.some(e => e.name === event)).length > 0 ? '100.00' : '150.00'}</aside>
                        </div>
                      )}

                      {/* Non-Technical Events */}
                      {participant.events.filter(event => NON_TECH_EVENTS.some(e => e.name === event)).length > 0 && (
                        <div className="flex justify-between gap-4 text-sm mt-2">
                          <aside className='w-[70%]'>Non-Technical Events ({participant.events.filter(event => NON_TECH_EVENTS.some(e => e.name === event)).join(', ')})</aside>
                          <aside>INR {participant.events.filter(event => TECH_EVENTS.some(e => e.name === event)).length > 0 && participant.events.filter(event => NON_TECH_EVENTS.some(e => e.name === event)).length > 0 ? '100.00' : '150.00'}</aside>
                        </div>
                      )}
                    </div>

                    {/* Total Price */}
                    <div className="w-full mt-6 border-t flex items-center justify-between border-gray-600 pt-4">
                      <h4 className="text-lg font-bold">Total</h4>
                      <h4 className="text-arcane-primary text-2xl font-bold">INR {calculatePrice()}.00</h4>
                    </div>

                    <DrawerFooter className="mt-8">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className='px-12 py-2 bg-arcane-primary border border-arcane-primary hover:bg-transparent hover:text-arcane-primary transition-all duration-300 ease-out text-white rounded-md'>
                            Pay
                          </button>
                        </DialogTrigger>
                        <Payment />
                      </Dialog>
                      <DrawerClose asChild>
                        <Button variant="outline" className="border-arcane-primary text-arcane-primary hover:text-arcane-primary px-12 py-2 text-md">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button className='text-white px-12 py-2 bg-arcane-primary border border-arcane-primary hover:bg-white hover:text-arcane-primary transition-all duration-300 ease-out rounded-md'>
                  Pay
                </button>
              </DialogTrigger>
              <Payment />
            </Dialog>
          </section>
        )
      }
    </main>
  );
}

export default Register;