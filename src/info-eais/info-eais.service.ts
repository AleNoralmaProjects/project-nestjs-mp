import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInfoEaiDto } from './dto/create-info-eai.dto';
import { UpdateInfoEaiDto } from './dto/update-info-eai.dto';
import { InfoEai } from './entities/info-eai.entity';
import { Repository } from 'typeorm';
import { ErrorHandleDBService } from '../common/services/errorHandleDBExceptions';

import { validate as isUUID } from 'uuid';

@Injectable()
export class InfoEaisService {
  constructor(
    @InjectRepository(InfoEai, 'default')
    private readonly infoeaisRepository: Repository<InfoEai>,
    private readonly errorHandleDBException: ErrorHandleDBService,
  ) {}

  async create(createInfoEaiDto: CreateInfoEaiDto) {
    try {
      const infoeais = this.infoeaisRepository.create(createInfoEaiDto);
      await this.infoeaisRepository.save(infoeais);
      return infoeais;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async findAll() {
    /* const { limit = 10, offset = 0 } = paginationDto; */

    const infoeais = await this.infoeaisRepository.find({});

    return infoeais;
  }

  async findOne(term: string) {
    let infoeais: InfoEai;

    if (isUUID(term)) {
      infoeais = await this.infoeaisRepository.findOne({
        where: {
          id_eais: term,
        },
        relations: {
          brigadaEai: true,
        },
      });
    } else {
      const queryBuilder =
        this.infoeaisRepository.createQueryBuilder('infoeais');
      infoeais = await queryBuilder
        .leftJoinAndSelect('infoeais.brigadaEai', 'id_brigadaeis')
        .where('cod_eais=:cod_eais', {
          cod_eais: term,
        })
        .getOne();
    }

    if (!infoeais)
      throw new NotFoundException(`Información del EAIS ${term} no encontrado`);
    return infoeais;
  }

  async update(id: string, updateInfoEaiDto: UpdateInfoEaiDto) {
    const infoeais = await this.infoeaisRepository.preload({
      id_eais: id,
      ...updateInfoEaiDto,
    });
    if (!infoeais)
      throw new NotFoundException(`Información del EAIS: ${id} no encontrado`);
    try {
      await this.infoeaisRepository.save(infoeais);
      return infoeais;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deleteInfoEai = await this.findOne(id);
    await this.infoeaisRepository.remove(deleteInfoEai);
  }
}
