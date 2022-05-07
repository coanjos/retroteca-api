import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { Usuario, UsuarioDocument } from "./schemas/usuario.schema";

@Injectable()
export class UsuariosRepository {
    constructor(@InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>) {}

    async create (createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        const usuarioCriado = new this.usuarioModel(createUsuarioDto);

        return await usuarioCriado.save();
    }

    async findAll(): Promise<Usuario[]> {
        const usuarios = await this.usuarioModel.find();

        return usuarios;
    }

    async findOne(id: string) : Promise<Usuario> {
        const usuario = await this.usuarioModel.findOne({ _id: id });

        return usuario;
    }

    async patch(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
        return await this.usuarioModel.findOneAndUpdate({ _id: id }, updateUsuarioDto);
    }

    async delete(id: string): Promise<Usuario> {
        return await this.usuarioModel.findOneAndDelete({ _id: id });
    }
}