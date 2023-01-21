import { Module } from '@nestjs/common';
import { ProfesionalService } from './profesional.service';
import { ProfesionalController } from './profesional.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesional } from './entities/profesional.entity';
import { ErrorHandleDBService } from '../common/services/errorHandleDBExceptions';

@Module({
  controllers: [ProfesionalController],
  providers: [ProfesionalService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([Profesional])],
  exports: [TypeOrmModule],
})
export class ProfesionalModule {}
