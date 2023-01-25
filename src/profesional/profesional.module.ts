import { Module } from '@nestjs/common';
import { ProfesionalService } from './profesional.service';
import { ProfesionalController } from './profesional.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesional } from './entities/profesional.entity';
import { ErrorHandleDBService } from '../common/services/errorHandleDBExceptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  controllers: [ProfesionalController],
  providers: [ProfesionalService, ErrorHandleDBService, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Profesional]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
  exports: [TypeOrmModule, JwtModule, JwtStrategy, PassportModule],
})
export class ProfesionalModule {}
