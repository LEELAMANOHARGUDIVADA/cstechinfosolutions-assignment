import React, { useContext, useState } from 'react'
import { Icon, Plus, Search } from "lucide-react"
import axios from 'axios';
import { bottom_nav_items, nav_items } from '../constants/nav_items';
import ActiveComponentContext from '../context/ActiveComponentContext';
import { toast } from "sonner"
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const SERVER_URL = import.meta.env.VITE_API_URL;

const Sidebar = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const token = localStorage.getItem("token");
  const { activeComponent, setActiveComponent } = useContext(ActiveComponentContext);

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/api/agent/create-agent`, {
        name,
        email,
        password,
        mobile
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message);
      setName("");
      setDescription("");
    }
  }

  return (
    <div className='w-full h-screen py-2 space-y-5 relative'>
      <div className="px-4">
        <Link to={'/'}><h1 className='text-xl font-extrabold'>TaskBoard</h1></Link>
      </div>
      <div className='w-full flex items-center justify-center gap-3 px-4'>
        <Dialog className="w-full">
          <DialogTrigger className="w-full">
            <div className="text-xs bg-black text-white w-full py-2 rounded-lg shadow-2xs hover:bg-black/90 duration-100 flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus size={15} />
              <span>New Agent</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={`font-bold`}>Create a New Agent</DialogTitle>
            </DialogHeader>
            <div className='mt-5'>
                  <form onSubmit={handleCreateAgent} className='w-full flex flex-col items-center justify-center gap-5'>
                    <input type="text"
                      className='w-full text-black py-2 px-5 border border-neutral-200 rounded-lg outline-black text-sm'
                      placeholder='Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input type="email"
                      className='w-full text-black py-2 px-5 border border-neutral-200 rounded-lg outline-black text-sm'
                      placeholder='Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input type="text"
                      inputMode='numeric'
                      className='w-full text-black py-2 px-5 border border-neutral-200 rounded-lg outline-black text-sm'
                      placeholder='Mobile Number'
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                    <input type="password"
                      className='w-full text-black py-2 px-5 border border-neutral-200 rounded-lg outline-black text-sm'
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button type="submit" className='w-full px-4 py-3 text-xs rounded-lg bg-black text-white cursor-pointer'>
                      Create Agent
                    </button>
                  </form>
                </div>
          </DialogContent>
        </Dialog>
        <button className='text-xs bg-white p-2 rounded-lg border border-neutral-200 flex items-center justify-center gap-1 cursor-pointer'>
          <Search size={15} />
        </button>
      </div>
      <div className='flex flex-col items-start justify-center gap-4 px-4 mt-5'>
        {nav_items?.map((item) => {
          const Icon = item.icon;
          return (
            <div onClick={() => setActiveComponent(item.name)} key={item.id} className={`flex w-full ${activeComponent === item.name && "bg-neutral-50 rounded-lg shadow-2xs border border-neutral-200"} py-3 px-2 items-center justify-start gap-2 cursor-pointer`}>
              <Icon size={16} className='text-gray-500' />
              <h4 className={`text-xs font-medium text-gray-600`}>{item.name}</h4>
            </div>
          )
        })}
      </div>
      <div className='absolute bottom-8 flex flex-col items-start justify-center gap-4 px-4 w-full'>
        {bottom_nav_items?.map((item) => {
          const Icon = item.icon;
          return (
            <div onClick={() => setActiveComponent(item.name)} key={item.id} className={`flex w-full ${activeComponent === item.name && "bg-neutral-50 rounded-lg shadow-2xs border border-neutral-200"} py-3 px-2 items-center justify-start gap-2 cursor-pointer`}>
              <Icon size={16} className='text-gray-500' />
              <h4 className={`text-xs font-medium text-gray-600`}>{item.name}</h4>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar