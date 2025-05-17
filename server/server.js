import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import connectDB from "./db/db.js";
import userRoutes from "./routes/UserRoutes.js"
import agentRoutes from "./routes/AgentRoutes.js"
import listRoutes from "./routes/ListRoutes.js"

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use('/uploads', express.static("uploads"));
app.use('/api/auth', userRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/list', listRoutes);

app.get('/', (req,res) => {
    res.send("SERVER IS UP AND RUNNING");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    connectDB(process.env.MONGODB_URI);
    console.log("SERVER RUNNING ON PORT", PORT);
});