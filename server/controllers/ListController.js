import csv from "csv-parser"
import fs from "fs"
import Agent from "../models/AgentSchema.js";
import Task from "../models/TaskSchema.js";

const distributeList = async (req, res) => {
    try {
        let parsedData = [];
        const agents = await Agent.find({});
        const distribution = Array.from({ length: agents.length }, () => []);

        fs.createReadStream(req.file.path).pipe(csv()).on('data', (data) => {
            parsedData.push(data);
        }).on('end', () => {
            parsedData.forEach((item, idx) => {
                const agentIndex = idx % agents.length;
                distribution[agentIndex].push(item);
            });
            distribution.forEach(async(item, idx) => {
                item.map(async(item) => {
                    const agentId = agents[idx]._id;
                    const task = new Task({
                        agentId: agentId,
                        firstName: item.FirstName,
                        phone: item.Phone,
                        notes: item.Notes
                    });
                    await task.save();
                    const updateAgent = await Agent.findByIdAndUpdate(agentId, {
                        $push: {
                            tasks: task
                        }
                    });
                });
            });
            return res.status(200).json({ success: true, message: "List Distributed" });
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}


export { distributeList };