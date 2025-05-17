import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'sonner';

const SERVER_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${SERVER_URL}/api/auth/login`, {
                email,
                password
            });
            if (response.status == 200) {
                localStorage.setItem('token', response.data.token);
                setEmail('');
                setPassword('');
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <div className='w-full h-screen flex items-center justify-center bg-neutral-100'>
            <div className="w-100 p-10 bg-white flex flex-col items-center justify-center gap-5 rounded-2xl border border-neutral-200">
                <h3 className='text-xl font-semibold'>Login to your account</h3>
                <form onSubmit={handleLogin} className='w-full flex flex-col items-center justify-center gap-5'>
                    <input type="text"
                        className='w-full py-2 px-5 border border-neutral-200 rounded-lg outline-black text-sm'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <input type="password"
                        className='w-full py-2 px-5 border border-neutral-200 rounded-lg outline-black text-sm'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button type="submit" className='w-full py-2 rounded-lg text-sm text-white bg-black cursor-pointer'>Login</button>
                </form>
                <div>
                    <h4 className='text-sm'>Don't have an account? <Link to={'/register'} className="underline font-semibold cursor-pointer">Create one</Link></h4>
                </div>
            </div>
        </div>
    )
}

export default Login