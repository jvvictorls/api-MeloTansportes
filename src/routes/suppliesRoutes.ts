import { Router } from "express";
import suppliesController from "../controller/supplies.controller";

const router = Router();
const controller = new suppliesController();

router.get('/', (req, res) => controller.getAll(req, res));

export default router;