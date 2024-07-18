import { Request, Response, Router } from "express";
import RoutesController from "../Controller/RoutesController";

const router = Router();
const routesController = new RoutesController();
router.get(
  "/:id",
  (req: Request, res: Response) => routesController.getOneRoute(req, res)
);

router.post(
  "/:id/addCollaborator",
  (req: Request, res: Response) => routesController.addOneCollaborator(req, res)
);

export default router;