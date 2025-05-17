import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
    },
    tasks: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Task"
        }
    ],
}, { timestamps: true });

const Agent = new mongoose.model('Agent', agentSchema);

export default Agent;