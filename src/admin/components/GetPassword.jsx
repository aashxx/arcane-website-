import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React from 'react';

const GetPassword = ({ password, setPassword, authenticate }) => {

    const handleAuthenticate = (event) => {
        if(event.key === 'Enter') {
            authenticate();
        }
    }

    return (
        <div className='text-center text-white font-expletus-sans'>
            <Dialog open>
                <DialogContent className={'font-expletus-sans bg-black'}>
                    <DialogHeader>
                        <DialogTitle>
                            Enter Password
                        </DialogTitle>
                    </DialogHeader>
                    <Input onKeyDown={handleAuthenticate} type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password here" className="mx-auto md:w-full w-full" />
                    <DialogFooter>
                        <Button onClick={authenticate} className={'w-[150px]'}>
                            Enter
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default GetPassword;