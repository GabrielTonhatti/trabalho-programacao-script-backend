// import logger from "../configs/logger.js";
import service from "../service/EmpregadoService.js";

class EmpregadosController {
    async findAll(req, res) {
        const empregados = await service.findAll();

        res.json(empregados);
    }

    async findById(req, res) {
        return res.json(await service.findById(req.params.id));
    }

    async save(req, res) {
        try {
            const empregado = await service.save(req.body);

            return res.json(empregado);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new EmpregadosController();
