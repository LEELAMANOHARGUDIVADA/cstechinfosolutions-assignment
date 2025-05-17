import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader() {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <div className="w-full py-1">
            <div className="lg:w-[75%] w-full h-full flex items-center justify-between px-5">
                <h1 className="font-extrabold lg:hidden">TaskBoard</h1>
                <h4 className="font-bold hidden lg:block">Welcome 👋</h4>
                <div className="flex items-center justify-center gap-5">
                    <DropdownMenu >
                        <DropdownMenuTrigger className="outline-none cursor-pointer">
                        <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleLogOut()} >
                                <div className="flex items-center justify-center gap-2">
                                    <LogOut size={15} className='text-red-500' />
                                    <span className='text-red-500 text-xs'>Log Out</span>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}