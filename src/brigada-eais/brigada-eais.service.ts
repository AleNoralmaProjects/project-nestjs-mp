import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBExceptions';
import { CreateBrigadaEaiDto } from './dto/create-brigada-eai.dto';
import { UpdateBrigadaEaiDto } from './dto/update-brigada-eai.dto';
import { BrigadaEai } from './entities/brigada-eai.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class BrigadaEaisService {
  constructor(
    @InjectRepository(BrigadaEai)
    private readonly brigadaeaisRepository: Repository<BrigadaEai>,
    private readonly errorHandleDBException: ErrorHandleDBService,
  ) {}

  //--------------------------------------------
  async create(createBrigadaEaiDto: CreateBrigadaEaiDto) {
    try {
      const brigadEai = this.brigadaeaisRepository.create(createBrigadaEaiDto);
      await this.brigadaeaisRepository.save(brigadEai);
      return brigadEai;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  //--------------------------------------------
  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const brigadaEai = await this.brigadaeaisRepository.find({
      take: limit,
      skip: offset,
      relations: {},
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
