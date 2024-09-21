import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ANIMATIONS } from '@/utils/constants';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import RequestCard from '../components/RequestCard';
import Loader from '@/components/Loader';
import { RegisterContext } from '@/contexts/RegisterContext';
import ChangeUPI from '../components/ChangeUPI';


const Admin = () => {

    const { loading } = useContext(RegisterContext);

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'requests'), (snapshot) => {
            const docsArray = [];
            snapshot.forEach((doc) => {
                docsArray.push({ ...doc.data(), id: doc.id });
            });
            setRequests(docsArray); 
        }, (error) => {
            console.error("Error fetching documents:", error);
        });
        return () => unsubscribe();
    }, []);

    return (
        <main className="relative bg-black min-h-screen w-full md:px-32 px-6">
            {
                loading && <Loader />
            }
            <motion.h2 {...ANIMATIONS.up} className='text-white px-4 font-valorax text-3xl md:text-5xl text-center pt-32'>
                Requests
            </motion.h2>
            <div className="grid gap-3 md:grid-cols-2 items-center justify-center grid-cols-1 w-full mt-12">
                {
                    requests.map((request, index) => (
                        <RequestCard key={index} participant={request} />
                    ))
                }
            </div>
            {
                requests.length === 0 && (
                    <h4 className='text-center font-expletus-sans text-[gray]'>
                        No new requests found
                    </h4>
                )
            }
            <ChangeUPI />
        </main>
    )
}

export default Admin;