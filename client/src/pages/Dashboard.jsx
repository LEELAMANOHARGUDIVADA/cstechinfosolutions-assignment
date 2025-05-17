import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import AgentCard from '../components/AgentCard'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import { ImageUpIcon, Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const SERVER_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [agents, setAgents] = useState([]);
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchAllAgents = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/agent/getAllAgents`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status == 200) {
        setAgents(response.data.agents);
      }
    } catch (error) {
      // toast.error(error.message);
      console.log(error.message);
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type == 'text/csv') {
      setFile(file);
    } else {
      toast.error("Only csv, xlsx and axls formats are allowed");
    }
  }

  const handleDistributeList = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/api/list/distribute-list`, {
        file: file,
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }

  }
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

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchAllAgents();
    }
  }, [token]);

  return (
    <div className='w-full flex items-center justify-center relative'>
      <div className="w-[25%] hidden lg:block fixed top-0 left-0 p-2 border-r border-neutral-200 bg-white">
        <Sidebar />
      </div>
      <div className="lg:w-[75%] w-full lg:ml-[25%]">
        <div className="fixed top-0 w-full p-2 shadow-xs z-20 border-b bg-white border-neutral-200">
          <DashboardHeader />
        </div>
        <div className='w-full mt-20 px-5'>
          <div className="my-10">
            <h2 className='font-bold'>Assign Tasks to Agents</h2>
            <form onSubmit={handleDistributeList} className='flex flex-col items-center justify-center '>
              <input
                type="file"
                name="file"
                id="file-upload"
                onChange={(e) => handleFileChange(e)}
                className="hidden"
                required
              />

              <label
                htmlFor="file-upload"
                className="w-full h-full cursor-pointer border-2 border-dashed rounded-2xl flex flex-col items-center justify-center my-5 py-10"
              >
                <ImageUpIcon size={30} />
                {file ? <h3 className="text-sm md:text-md my-5">
                  File Uploaded: {file.name}
                </h3> : <h3 className="text-sm md:text-md my-5">
                  Upload csv file here or{" "}
                  <span className="font-bold underline">browse</span>
                </h3>}
              </label>

              <button type="submit" className='text-xs bg-black text-white rounded-lg py-2.5 px-10 cursor-pointer'>Distribute List</button>
            </form>
          </div>
          <div className='mb-20'>
            <div className="flex items-center justify-between">
              <h4 className='text-lg font-bold'>Agents</h4>
              <div>
                <Dialog className="w-full">
                <DialogTrigger className="">
                  <div className='text-white bg-black py-2.5 px-5 rounded-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer'>
                    <Plus size={15} />
                    <span className='text-xs'>Add New</span>
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
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-5 my-10">
              {agents.length > 0 && agents.map((agent, idx) => (
                <AgentCard agent={agent} key={idx} />
              ))}
            </div>
            {agents.length == 0 && <div className='w-full flex items-center justify-center'>
                  No Agents Found.
            </div>}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard