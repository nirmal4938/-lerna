import { Router } from "express";
import { getTemplates } from "../controllers/templates.controller.js";

const router = Router();

router.get("/", getTemplates);

export default router;
