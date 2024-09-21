import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { realdb } from '@/lib/firebase';
import { get, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const ChangeUPI = () => {

    const [upiId, setUpiId] = useState(null);
    const upiRef = ref(realdb, `upiId`);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await get(upiRef);
                if(snapshot.exists()) {
                    setUpiId(snapshot.val().upiId);
                }
            } catch (error) {
                console.error("Error fetching UPI ID", error);
            }
        }
        
        fetchData();
    }, []);

    const changeUPI = async () => {
        try {
            await set(upiRef, {upiId});
            toast.success("UPI ID changed successfully");
        } catch (error) {
            toast.error("Failed to change UPI ID");
            console.error("Error changing UPI ID", error);
        }
    }

    const handleChangeUPI = (event) => {
        if(event.key === 'Enter') {
            changeUPI();
        }
    }

    return (
        <div className='text-center text-white font-expletus-sans mt-10'>
            <Dialog>
                <DialogTrigger asChild>
                        <Button className={'w-[150px]'}>
                            Change UPI
                        </Button>
                </DialogTrigger>
                <DialogContent className={'font-expletus-sans bg-black'}>
                    <DialogHeader>
                        <DialogTitle>
                            Change UPI ID
                        </DialogTitle>
                    </DialogHeader>
                    <Input onKeyDown={handleChangeUPI} type={'text'} value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="Enter UPI ID" className="mx-auto md:w-full w-full" />
                    <DialogFooter>
                        <Button onClick={changeUPI} className={'w-[150px]'}>
                            Change
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ChangeUPI;