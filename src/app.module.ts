import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesionalModule } from './profesional/profesional.module';
import { ProfesionModule } from './profesion/profesion.module';
import { InfoEaisModule } from './info-eais/info-eais.module';
import { BrigadaEaisModule } from './brigada-eais/brigada-eais.module';
import { CommonModule } from './common/common.module';
import { FichaFamiliarModule } from './ficha-familiar/ficha-familiar.module';
import { PoolModule } from './pool/pool.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'fichaFamiliarDB',
      type: 'postgres',
      host: process.env.FF_DB_HOST,
      port: +process.env.FF_DB_PORT,
      database: process.env.FF_DB_NAME,
      username: process.env.FF_DB_USERNAME,
      password: process.env.FF_DB_PASSWORD,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProfesionalModule,
    ProfesionModule,
    InfoEaisModule,
    BrigadaEaisModule,
    CommonModule,
    FichaFamiliarModule,
    PoolModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
