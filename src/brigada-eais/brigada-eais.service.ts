import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBExceptions';
import { CreateBrigadaEaiDto } from './dto/create-brigada-eai.dto';
import { UpdateBrigadaEaiDto } from './dto/update-brigada-eai.dto';
import { BrigadaEai } from './entities/brigada-eai.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrigadaEaisService {
  constructor(
    @InjectRepository(BrigadaEai, 'default')
    private readonly brigadaeaisRepository: Repository<BrigadaEai>,
    private readonly errorHandleDBException: ErrorHandleDBService,
  ) {}

  //--------------------------------------------
  async create(createBrigadaDto: CreateBrigadaEaiDto) {
    try {
      const brigadaEai = this.brigadaeaisRepository.create(createBrigadaDto);
      await this.brigadaeaisRepository.save(brigadaEai);
      return brigadaEai;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  //--------------------------------------------
  async findAll() {
    /* const { limit = 20, offset = 0 } = paginationDto; */

    const brigadaEai = await this.brigadaeaisRepository.find({
      /* take: limit,
      skip: offset, */
      relations: {
        profesional: true,
        eais: true,
      },
      order: {
        fecha_creacion: 'DESC',
      },
    });

    return brigadaEai;
    /*  return agendamiento.map((agendamiento) => ({
      ...agendamiento,
      polivalente: agendamiento.polivalente,
    })); */
  }

  //--------------------------------------------
  async findOne(id: string) {
    const brigadaEai: BrigadaEai = await this.brigadaeaisRepository.findOne({
      where: {
        id_brigadaeais: id,
      },
      relations: {
        profesional: true,
        eais: true,
      },
    });

    if (!brigadaEai)
      throw new NotFoundException(`Brigada EAIS con ID: ${id} no encontrado`);
    return brigadaEai;
  }

  //--------------------------------------------
  async update(id: string, updateBrigadaEaiDto: UpdateBrigadaEaiDto) {
    const brigadaEai = await this.brigadaeaisRepository.preload({
      id_brigadaeais: id,
      ...updateBrigadaEaiDto,
    });
    if (!brigadaEai)
      throw new NotFoundException(`Brigada EAIS con ID: ${id} no encontrado`);
    try {
      await this.brigadaeaisRepository.save(brigadaEai);
      return brigadaEai;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  //--------------------------------------------
  async remove(id: string) {
    const deleteBrigadaEai = await this.findOne(id);
    await this.brigadaeaisRepository.remove(deleteBrigadaEai);
  }
}
