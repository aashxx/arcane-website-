import React, { useContext, useEffect, useState } from 'react';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { RegisterContext } from '@/contexts/RegisterContext';
import { QRCodeSVG } from 'qrcode.react';
import { IoImageOutline } from 'react-icons/io5';
import Tesseract from 'tesseract.js';
import { Button } from './ui/button';
import { toast } from 'react-hot-toast';
import { PaymentContext } from '@/contexts/PaymentContext';

const Payment = () => {

    const { calculatePrice, setLoading } = useContext(RegisterContext);
    const { payment, setPayment, submitRequest } = useContext(PaymentContext);  

    const [arcaneCheck, setArcaneCheck] = useState(true);

    useEffect(() => {
        if (payment.transactionId === 'Not Found') {
            toast.error("Transaction ID not found in screenshot");
        }
    }, [payment.transactionId]);

    const UPI_URL = `upi://pay?pa=${import.meta.env.VITE_BANK_UPI_ID}&pn=${import.meta.env.VITE_PAYEE_NAME}&am=${calculatePrice()}&cu=INR`;

    const renderImagePreview = (image) => {
        if (image) {
            return <img src={URL.createObjectURL(image)} alt="Preview" className='mb-2 max-w-full h-[80px]' />;
        }
        return (
            <>
                <IoImageOutline className='text-5xl text-[#D3D3D3]' />
                <p className='text-sm text-center text-[gray]'>Payment Screenshot</p>
            </>
        );
    };

    const extractTextFromImage = async (imageFile) => {
        if (!imageFile) return;
        setLoading(true);
        try {
            const result = await Tesseract.recognize(imageFile, 'eng');
            const text = result.data.text;
            const upiId = extractUpiTransactionId(text);
            const arcaneCheck = text.includes("irshadmm2003-1@okaxis");

            setPayment((prevPayment) => ({
                ...prevPayment,
                transactionId: upiId || 'Not Found',
                transactionScreenshot: imageFile
            }));
            
            if (!arcaneCheck) {
                toast.error("Reciever's transaction ID not visible");
                setArcaneCheck(false);
            } 

        } catch (error) {
            console.error('Error extracting text:', error);
        } finally {
            setLoading(false);
        }
    };

    const extractUpiTransactionId = (text) => {
        const regex = /\b\d{12}\b/;  
        const match = text.match(regex);
        return match ? match[0] : null;
    };

    return (
        <DialogContent className={'font-expletus-sans bg-white text-black'}>
            <DialogHeader>
                <DialogTitle className={'text-black'}>
                    Scan to Pay
                </DialogTitle>
                <DialogDescription>
                    Rs. {calculatePrice()}.00
                </DialogDescription>
            </DialogHeader>
            <div className='flex gap-3 justify-center'>
                <QRCodeSVG fgColor='#9E325F' value={UPI_URL} size={140} />
                <aside className='flex flex-col justify-center py-2 items-center w-[150px] border-[#D3D3D3] border rounded-md'>
                    {renderImagePreview(payment.transactionScreenshot)}
                    <label htmlFor="choosePhoto1" className='-mt-1 text-[blue] text-[13px] hover:underline cursor-pointer'>
                        Browse
                        <input 
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setPayment({...payment, transactionScreenshot: file });
                                extractTextFromImage(file);
                            }} 
                            accept="image/*" 
                            name='image2' 
                            type="file" 
                            className='hidden' 
                            id="choosePhoto1" 
                        />
                    </label>
                </aside>
            </div>
            {
                payment.transactionId !== '' && (
                    <div className='flex flex-col md:flex-row items-center md:gap-4 justify-center text-sm'>
                        <aside className='flex items-center gap-1 text-md'>
                            <h3>
                                Transaction ID:
                            </h3>
                            <h5 className='text-arcane-primary'>
                                {payment.transactionId} 
                            </h5>
                        </aside>
                    </div>
                )
            }
            {
                payment.transactionId !== '' && payment.transactionId !== 'Not Found' && arcaneCheck && (
                    <Button onClick={submitRequest} className={'hover:text-arcane-primary w-[150px] mx-auto'}>
                        Submit
                    </Button>
                )
            }
            <div className='text-center text-sm font-bold text-[gray]'>
                Note: Transaction ID and reciever's UPI ID must be visible in screenshot
            </div>
        </DialogContent>
    );
};

export default Payment;