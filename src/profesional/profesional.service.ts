import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';
import { Profesional } from './entities/profesional.entity';
import { validate as isUUID } from 'uuid';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBExceptions';

@Injectable()
export class ProfesionalService {
  constructor(
    @InjectRepository(Profesional)
    private readonly profesionalRepository: Repository<Profesional>,
    private readonly errorHandleDBException: ErrorHandleDBService,
  ) {}

  //CREAR..........................................................
  async create(createProfesionalDto: CreateProfesionalDto) {
    try {
      const { password, ...usuarioData } = createProfesionalDto;
      const profesional = this.profesionalRepository.create({
        ...usuarioData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.profesionalRepository.save(profesional);
      return profesional;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  //.ENCONTRAR AL...............
  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.profesionalRepository.find({
      take: limit,
      skip: offset,
      relations: {
        profesion: true,
      },
    });
  }

  //...........ENCONTRAR solo un va
  async findOne(term: string) {
    let user: Profesional;

    if (isUUID(term)) {
      user = await this.profesionalRepository.findOne({
        where: {
          id_profesional: term,
        },
        relations: {
          profesion: true,
        },
      });
    } else {
      const queryBuilder =
        this.profesionalRepository.createQueryBuilder('user');
      user = await queryBuilder
        .leftJoinAndSelect('user.profesion', 'profesion')
        .where('cedula=:cedula', {
          cedula: term,
        })
        .getOne();
    }

    if (!user)
      throw new NotFoundException(`Profesional con ID: ${term} no encontrado`);
    return user;
  }

  //..ACTUALIZAR...................
  async update(id: string, updateProfesionalDto: UpdateProfesionalDto) {
    const user = await this.profesionalRepository.preload({
      id_profesional: id,
      ...updateProfesionalDto,
    });
    if (!user)
      throw new NotFoundException(`Profesional con ID: ${id} no encontrado`);
    try {
      await this.profesionalRepository.save(user);
      return user;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  //ELIMINAR.........................
  async remove(id: string) {
    const deleteProfesional = await this.findOne(id);
    await this.profesionalRepository.remove(deleteProfesional);
  }
}