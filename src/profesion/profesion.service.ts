import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';
import { Profesion } from './entities/profesion.entity';
import { Repository } from 'typeorm';

import { ErrorHandleDBService } from 'src/common/services/errorHandleDBExceptions';

@Injectable()
export class ProfesionService {
  constructor(
    @InjectRepository(Profesion, 'default')
    private readonly profesionRepository: Repository<Profesion>,
    private readonly errorHandleDBException: ErrorHandleDBService,
  ) {}

  //CREATE...........................................
  async create(createProfesionDto: CreateProfesionDto) {
    try {
      const profesion = this.profesionRepository.create(createProfesionDto);
      await this.profesionRepository.save(profesion);
      return profesion;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  //---------------------
  async findAll() {
    /* const { limit = 10, offset = 0 } = paginationDto; */

    const profesion = await this.profesionRepository.find({});
    return profesion;

    /*  return profesiones.map((profesion) => ({
      ...profesion,
      agendamiento: polivalente.agendamiento,
    })); */
  }

  async findOne(term: string) {
    const profesion: Profesion = await this.profesionRepository.findOne({
      where: {
        id_profesion: term,
      },
      relations: {
        profesional: true,
      },
    });

    if (!profesion)
      throw new NotFoundException(`Profesion ${term} no encontrada`);
    return profesion;
  }

  async update(id: string, updateProfesionDto: UpdateProfesionDto) {
    const profesion = await this.profesionRepository.preload({
      id_profesion: id,
      ...updateProfesionDto,
    });
    if (!profesion)
      throw new NotFoundException(`Profesion con ID ${id} no encontrado`);

    try {
      await this.profesionRepository.save(profesion);
      return profesion;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deleteProfesion = await this.findOne(id);
    await this.profesionRepository.remove(deleteProfesion);
  }
}
