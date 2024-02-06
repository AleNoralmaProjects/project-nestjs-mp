import { Module } from '@nestjs/common';
import { FichaFamiliarService } from './ficha-familiar.service';
import { FichaFamiliarController } from './ficha-familiar.controller';
import { PoolModule } from 'src/pool/pool.module';

@Module({
  controllers: [FichaFamiliarController],
  providers: [FichaFamiliarService],
  imports: [PoolModule],
})
export class FichaFamiliarModule {}
