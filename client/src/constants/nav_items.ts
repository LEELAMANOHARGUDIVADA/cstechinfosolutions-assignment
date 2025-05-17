import { Calendar, DockIcon, LayoutDashboard, LucideIcon, MessageCircle, MessageCircleQuestion, ReceiptIndianRupeeIcon, Settings } from "lucide-react";

interface Nav_Item {
    id: number,
    name: string,
    icon: LucideIcon
}

export const nav_items:Nav_Item[] = [
    {
        id: 1,
        name: "Dashboard",
        icon: LayoutDashboard
    },
    {
        id: 2,
        name: "Projects",
        icon: Calendar
    },{
        id: 3,
        name: "Chats",
        icon: MessageCircle
    },
    {
        id: 4,
        name: "Document",
        icon: DockIcon
    },
    {
        id: 5,
        name: "Reciepts",
        icon: ReceiptIndianRupeeIcon
    }
];

export const bottom_nav_items = [
    {
        id: 1,
        name: "Settings",
        icon: Settings
    },
    {
        id: 2,
        name: "Help Center",
        icon: MessageCircleQuestion
    },
]