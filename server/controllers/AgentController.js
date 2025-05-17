import Agent from "../models/AgentSchema.js";
import bcrypt from "bcryptjs";
import User from "../models/UserSchema.js";

const createAgent = async(req,res) => {
    try {
       const { name, email, password, mobile } = req.body;
       if(!name || !email || !password || !mobile){
        throw new Error('All Fields are Required');
       } 

       const existingAgent = await Agent.findOne({ email });
       if(existingAgent){
        return res.status(400).json({ success: false, message: "Agent Already Exists" });
       }

       const genSalt = await bcrypt.genSalt(10);
       const hashedPassword = bcrypt.hashSync(password, genSalt);

       const agent = new Agent({
        name,
        email,
        password: hashedPassword,
        mobile
       });
       await agent.save();

       await User.findByIdAndUpdate(req.user.id, {
            $push: {
                agents: agent
            }
       });

       return res.status(201).json({ success: true, message: "Agent Created" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getAllAgents = async(req,res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: "agents",
            populate: {
                path: "tasks"
            }
        });
        if(user.agents.length <= 0){
            return res.status(404).json({ success: false, message: "Agents Not Found" });
        }
        return res.status(200).json({ success: true, message: "Agents Fetched", agents: user.agents });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteAgent = async(req,res) => {
    try {
        const { id } = req.params;

        const agent = await Agent.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Agent Deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { createAgent, getAllAgents, deleteAgent };