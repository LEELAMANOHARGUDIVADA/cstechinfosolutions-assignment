import { MoreVertical, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import axios from 'axios';
import { toast } from 'sonner';

const SERVER_URL = import.meta.env.VITE_API_URL;

const AgentCard = ({ agent }) => {
    const [progress, setProgress] = useState(0);
    const token = localStorage.getItem("token");

    const handleDeleteAgent = async (id) => {
        try {
            const response = await axios.delete(`${SERVER_URL}/api/agent/delete-agent/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='w-full bg-white shadow-xs cursor-pointer border border-neutral-200 rounded-xl overflow-hidden'>
            <Link>
                <div className="p-2.5">
                    <h4 className='text-sm font-semibold'>{agent?.name}</h4>
                    <p className='text-xs text-gray-500 overflow-hidden'>{agent?.email}</p>
                </div>
                <div className='p-2.5 cursor-pointer'>
                    <DropdownMenu>
                    <DropdownMenuTrigger className="text-sm">Tasks</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Tasks</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className='space-y-2'>
                            {agent.tasks.length > 0 ? agent.tasks.map((task, idx) => (
                                <DropdownMenuItem key={idx} className={'flex-col items-start'}>
                                    <h4 className='text-xs font-semibold'>FirstName: {task.firstName}</h4>
                                    <h4 className='text-xs font-semibold'>Phone: {task.phone}</h4>
                                    <h4 className='text-xs font-semibold'>Notes: {task.notes}</h4>
                                </DropdownMenuItem>
                            )) : (
                                <div className='text-xs p-2.5'>
                                    No Tasks Assigned
                                </div>
                            )}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </Link>

            <div className='flex items-center justify-between p-2.5 border-t border-neutral-100'>
                <div className='flex items-center justify-center'>
                    <img src="https://untitledui.com/images/avatars/lana-steiner" alt="" className='w-7 rounded-full border border-neutral-200' />
                    <img src="https://untitledui.com/images/avatars/phoenix-baker" alt="" className='w-7 rounded-full relative right-2' />
                    <img src="https://untitledui.com/images/avatars/noah-pierre" alt="" className='w-7 rounded-full relative right-4' />
                </div>
                <div>
                    <DropdownMenu >
                        <DropdownMenuTrigger className="outline-none cursor-pointer">
                            <MoreVertical size={18} className='text-gray-500' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <div onClick={() => handleDeleteAgent(agent._id)} className="flex items-center justify-center gap-2">
                                    <Trash size={15} className='text-red-500' />
                                    <span className='text-red-500 text-xs'>Delete Agent</span>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default AgentCard;