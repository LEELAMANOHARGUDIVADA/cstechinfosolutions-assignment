import { Router } from "express";
import { createAgent, deleteAgent, getAllAgents } from "../controllers/AgentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/create-agent', authMiddleware, createAgent);
router.get('/getAllAgents', authMiddleware, getAllAgents);
router.delete('/delete-agent/:id', authMiddleware, deleteAgent);

export default router;