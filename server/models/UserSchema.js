import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    agents: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Agent'
        }
    ]
}, { timestamps: true });

const User = new mongoose.model('User', userSchema);

export default User;