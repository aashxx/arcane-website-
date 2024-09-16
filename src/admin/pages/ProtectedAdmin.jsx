import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin from './Admin';
import GetPassword from '../components/GetPassword';

const ProtectedAdmin = () => {

    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    const authenticate = () => {
        if(password === import.meta.env.VITE_ADMIN_PASSWORD) {
            setAuth(true);
        } else {
            navigate('/');
        }
    }

    return auth ? <Admin /> : (
        <main className='min-h-screen bg-black'>
            <GetPassword password={password} setPassword={setPassword} authenticate={authenticate} />
        </main>
    )
}

export default ProtectedAdmin;