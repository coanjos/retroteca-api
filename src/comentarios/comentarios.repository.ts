import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateComentarioDto } from "./dto/create-comentario.dto";
import { Comentario, ComentarioDocument } from "./schemas/comentario.schema";

@Injectable()
export class ComentariosRepository {
    constructor(@InjectModel(Comentario.name) private comentarioModel: Model<ComentarioDocument>) {}

    async create (createComentarioDto: CreateComentarioDto): Promise<Comentario> {
        const comentarioCriado = new this.comentarioModel(createComentarioDto);

        return await comentarioCriado.save();
    }

    async findAll(): Promise<Comentario[]> {
        const comentarios = await this.comentarioModel.find();

        return comentarios;
    }

    async findByJogo(idJogo: string): Promise<Comentario[]> {
        const comentarios = await this.comentarioModel.find();

        return comentarios;
    }

    async findOne(id: string) : Promise<Comentario> {
        const comentario = await this.comentarioModel.findOne({ _id: id });

        return comentario;
    }

    async delete(id: string): Promise<Comentario> {
        return await this.comentarioModel.findOneAndDelete({ _id: id });
    }
}