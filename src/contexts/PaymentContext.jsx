import React, { createContext, useContext, useState } from 'react';
import dayjs from 'dayjs';
import { RegisterContext } from './RegisterContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const PaymentContext = createContext();

const PaymentState = ({ children }) => {

    const { setLoading, participant, setParticipant, calculatePrice } = useContext(RegisterContext);

    const [payment, setPayment] = useState({
        transactionId: "",
        amount: `INR ${calculatePrice()}.00`,
        transactionScreenshot: null,
        transactionDate: dayjs().format('DD/MM/YYYY')
    });

    const submitRequest = async () => {
        try {
            setLoading(true);
            
            const checkExistingPayment = await getDoc(doc(db, "payments", payment.transactionId));
            if(checkExistingPayment.exists()) {
                toast.error("Duplicate transaction ID");
                return;
            }
            
            const imageRef = ref(storage, `screenshots/${payment.transactionId}.png`);
            const uploadResult = await uploadBytes(imageRef, payment.transactionScreenshot);
            const downloadURL = await getDownloadURL(uploadResult.ref);
            await setDoc(doc(db, "payments", payment.transactionId), {...payment, email: participant.email, transactionScreenshot: downloadURL});
            await setDoc(doc(db, "requests", participant.email), {...participant, paid: payment.amount, proof: downloadURL});
            await axios.post("https://arcane-website-backend.vercel.app/api/payment/apply-request", { participant }, {
               headers: {
                "Content-Type": "application/json"
               } 
            });
            toast.success("Registration request sent");
        } catch (error) {
            console.error("Error submitting request", error);
        } finally {
            setParticipant({
                fullName: "",
                college: "",
                email: "",
                phone: "",
                degree: "",
                year: "",
                food: "No",
                emailVerified: false,
                events: []
            });
            setPayment({
                transactionId: "",
                amount: `INR ${calculatePrice()}.00`,
                transactionScreenshot: null,
                transactionDate: dayjs().format('DD/MM/YYYY')
            })
            setLoading(false);
        }
    }

    return (
        <PaymentContext.Provider value={{ payment, setPayment, submitRequest }}>
            {children}
        </PaymentContext.Provider>
    )
}

export default PaymentState;