import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '../interfaces/jwt.interface';
import { Profesional } from '../entities/profesional.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Profesional)
    private readonly profesionalRepository: Repository<Profesional>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: IJwtPayload): Promise<Profesional> {
    const { id_profesional } = payload;

    const user = await this.profesionalRepository.findOneBy({ id_profesional });

    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }

    if (!user.state) {
      throw new UnauthorizedException('User not active');
    }

    return user;
  }
}
