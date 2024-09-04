import { Router, Request, Response } from "express";
import ExtraRoutesController from "../Controller/ExtraRoutes.controller";
const router = Router();
const extraRoutesController = new ExtraRoutesController();

router.get("/:id", async (req: Request, res: Response) => extraRoutesController.getExtraRouteById(req, res));

router.post("/", async (req: Request, res: Response) => extraRoutesController.createExtraRoute(req, res));

export default router;
