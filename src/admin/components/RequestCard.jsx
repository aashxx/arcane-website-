import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RegisterContext } from '@/contexts/RegisterContext';
import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ANIMATIONS } from '@/utils/constants';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter, AlertDialogCancel } from '@/components/ui/alert-dialog';

const RequestCard = ({ participant }) => {

    const { confirmParticipantRegistration, rejectParticipantRegistration } = useContext(RegisterContext);

    return (
        <motion.article {...ANIMATIONS.up} className='bg-[#1c1c1c] font-expletus-sans items-center rounded-lg flex w-full justify-between gap-4 border border-arcane-primary p-5'>
            <div className='w-[75%]'>
                <h4 className='text-white font-bold text-xl'>
                    {participant.fullName}
                </h4>
                <h5 className='text-[gray] text-md line-clamp-1 text-ellipsis'>
                    {participant.email} / {participant.phone}
                </h5>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className={'w-[25%]'}>Open</Button>
                </DialogTrigger>
                <DialogContent className={'font-expletus-sans'}>
                    <DialogHeader>
                        <DialogTitle>
                            Payment Proof
                        </DialogTitle>
                        <DialogDescription>
                            {participant.fullName}
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex items-center justify-center gap-2'>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant='outline'>
                                    Reject
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className={'font-expletus-sans'}>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Reject?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure that you want to reject <strong>{participant.fullName}</strong>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => rejectParticipantRegistration(participant)}>Reject</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button>
                                    Accept
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className={'font-expletus-sans'}>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Accept?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure that you want to accept <strong>{participant.fullName}</strong>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => confirmParticipantRegistration(participant)}>Accept</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <img className='w-full rounded-md h-[500px] md:h-[400px] object-contain' src={participant.proof} alt="No proof" />               
                </DialogContent>
            </Dialog>
        </motion.article>
    )
}

export default RequestCard;