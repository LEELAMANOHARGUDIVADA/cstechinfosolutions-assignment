import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async(req,res,next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if(!token){
            return res.status(404).json({ success: false, message: "Invalid Token" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export default authMiddleware;