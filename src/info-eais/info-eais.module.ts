import { Module } from '@nestjs/common';
import { InfoEaisService } from './info-eais.service';
import { InfoEaisController } from './info-eais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoEai } from './entities/info-eai.entity';
import { ErrorHandleDBService } from '../common/services/errorHandleDBExceptions';

@Module({
  controllers: [InfoEaisController],
  providers: [InfoEaisService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([InfoEai])],
  exports: [TypeOrmModule],
})
export class InfoEaisModule {}
