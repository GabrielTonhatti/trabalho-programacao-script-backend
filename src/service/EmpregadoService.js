import { model } from "mongoose";
import EmpregadoResponse from "../dto/EmpregadoResponse.js";
import Empregado from "../model/Empregado.js";

class EmpregadoService {
    #repository;

    constructor() {
        this.#repository = model("Empregado", Empregado.schema);
    }

    async findAll() {
        const empregados = await this.#repository.find({});
        return empregados.map(EmpregadoResponse.of);
    }

    async findById(id) {
        const empregado = await this.#repository.find({ id });
        return empregado.length > 0
            ? EmpregadoResponse.of(empregado[0])
            : Object;
    }

    async save(empregado) {
        empregado.id = await this.#getNextId();

        if (empregado.funcao === undefined) {
            throw new Error("A função do vendedor é obrigatória");
        } else if (empregado.salario === undefined) {
            throw new Error("O salário do vendedor é obrigatório");
        } else if (empregado.nome === undefined) {
            throw new Error("O nome do vendedor é obrigatório");
        }

        return await this.#repository.create(empregado);
    }

    async #getNextId() {
        const last = await this.#repository.find({}).sort({ id: -1 }).limit(1);
        return last.length > 0 ? last[0].id + 1 : 1;
    }
}

export default new EmpregadoService();
