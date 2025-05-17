import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    agentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Agent'
    },
    firstName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Task = new mongoose.model('Task', taskSchema);

export default Task;