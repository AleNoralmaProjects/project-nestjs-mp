import { Module } from '@nestjs/common';
import { ProfesionService } from './profesion.service';
import { ProfesionController } from './profesion.controller';
import { Profesion } from './entities/profesion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorHandleDBService } from '../common/services/errorHandleDBExceptions';

@Module({
  controllers: [ProfesionController],
  providers: [ProfesionService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([Profesion])],
  exports: [TypeOrmModule],
})
export class ProfesionModule {}
