import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const SERVER_URL = import.meta.env.VITE_API_URL;

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${SERVER_URL}/api/auth/register`, {
                name,
                email,
                password
            });
            if (response.status == 201) {
                localStorage.setItem('token', response.data.token);
                setName('');
                setEmail('');
                setPassword('');
                navigate('/');
            }
        } catch (error) {
            console.log(error.response.data);
            setName('');
            setEmail('');
            setPassword('');
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
                <h3 className='text-xl font-semibold'>Create an account</h3>
                <form onSubmit={handleRegister} className='w-full flex flex-col items-center justify-center gap-5'>
                    <input type="text"
                        className='w-full py-2 px-5 border border-neutral-200 rounded-lg outline-black text-sm'
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                    <input type="email"
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
                    <button type="submit" className='w-full py-2 rounded-lg text-sm text-white bg-black cursor-pointer'>Create Account</button>
                </form>
                <div>
                    <h4 className='text-sm'>Already have an account? <Link to={'/login'} className="underline font-semibold cursor-pointer">Sign In</Link></h4>
                </div>
            </div>
        </div>
    )
}

export default Register;