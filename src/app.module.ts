import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesionalModule } from './profesional/profesional.module';
import { ProfesionModule } from './profesion/profesion.module';
import { InfoEaisModule } from './info-eais/info-eais.module';
import { BrigadaEaisModule } from './brigada-eais/brigada-eais.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProfesionalModule,
    ProfesionModule,
    InfoEaisModule,
    BrigadaEaisModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
