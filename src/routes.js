import { Router } from "express";
import empregadosController from "./controller/EmpregadoController.js";

const routes = Router();
routes.get("/empregados", empregadosController.findAll);
routes.get("/empregados/:id", empregadosController.findById);
routes.post("/empregados", empregadosController.save);
routes.put("/empregados/:id", empregadosController.update);
routes.delete("/empregados/:id", empregadosController.delete);

export default routes;
