import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/jwt.js";

const register = async(req,res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            throw new Error("All Fields are Required");
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }

        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(password, genSalt);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        return res.status(201).json({ success: true, message: "Registration Successful", token: generateToken(user._id) });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}

const login = async(req,res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            throw new Error("All Fields are Required");
        }

        const user = await User.findOne({ email });

        if(!user){
            return res.status(404).json({ success: false, message: "Invalid Email" });
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if(!isValidPassword){
            return res.status(400).json({ success: false, message: "Invalid Password" });
        }

        return res.status(200).json({ success: true, message: "Login Successful", token: generateToken(user._id) });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
}

export { register, login };