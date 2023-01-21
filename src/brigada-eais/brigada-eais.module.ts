import { Module } from '@nestjs/common';
import { BrigadaEaisService } from './brigada-eais.service';
import { BrigadaEaisController } from './brigada-eais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrigadaEai } from './entities/brigada-eai.entity';
import { ErrorHandleDBService } from '../common/services/errorHandleDBExceptions';

@Module({
  controllers: [BrigadaEaisController],
  providers: [BrigadaEaisService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([BrigadaEai])],
  exports: [TypeOrmModule],
})
export class BrigadaEaisModule {}
