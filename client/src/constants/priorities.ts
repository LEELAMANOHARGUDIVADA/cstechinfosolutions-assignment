interface Priority {
    id: number,
    label: string,
    color: string,
    value: string
}

const priorities:Priority[] = [
    { 
        id: 1,
        label: "Normal Priority", 
        color: "text-blue-500", 
        value: "Normal" 
    },
    { 
        id: 2, 
        label: "High Priority", 
        color: "text-red-500", 
        value: "High" 
    },
];

export default priorities;