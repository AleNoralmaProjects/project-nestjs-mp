import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';
import { Profesional } from './entities/profesional.entity';
import { validate as isUUID } from 'uuid';
import * as bcrypt from 'bcrypt';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBExceptions';
import { AuthProfesionalDto } from './dto/auth-profesional.dto';
import { IJwtPayload } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProfesionalService {
  constructor(
    @InjectRepository(Profesional, 'default')
    private readonly profesionalRepository: Repository<Profesional>,
    private readonly errorHandleDBException: ErrorHandleDBService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authProfesionalDto: AuthProfesionalDto): Promise<any> {
    const { user, password } = authProfesionalDto;

    const auth_user = await this.profesionalRepository.findOne({
      where: { user },
      select: {
        user: true,
        password: true,
        role: true,
        id_profesional: true,
        state: true,
      },
    });

    if (!auth_user) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }
    if (!auth_user.state) {
      throw new UnauthorizedException('Usuario no habilitado');
    }
    if (!bcrypt.compareSync(password, auth_user.password)) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }
    return {
      user: {
        id_Profesional: auth_user.id_profesional,
        user: auth_user.user,
        role: auth_user.role,
      },
      token: this.getJwtToken({ id_profesional: auth_user.id_profesional }),
    };
  }

  async create(createProfesionalDto: CreateProfesionalDto) {
    try {
      const { password, ...usuarioData } = createProfesionalDto;
      const profesional = this.profesionalRepository.create({
        ...usuarioData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.profesionalRepository.save(profesional);
      return profesional;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async findAll() {
    return this.profesionalRepository.find({
      relations: {
        profesion: true,
      },
      order: {
        apellidos: 'ASC',
      },
    });
  }

  async findOne(term: string) {
    let user: Profesional;

    if (isUUID(term)) {
      user = await this.profesionalRepository.findOne({
        where: {
          id_profesional: term,
        },
        relations: {
          profesion: true,
          brigadaEai: {
            eais: true,
          },
        },
      });
    } else {
      const queryBuilder =
        this.profesionalRepository.createQueryBuilder('user');
      user = await queryBuilder
        .leftJoinAndSelect('user.profesion', 'profesion')
        .where('cedula=:cedula', {
          cedula: term,
        })
        .getOne();
    }

    if (!user)
      throw new NotFoundException(`Profesional con ID: ${term} no encontrado`);
    return user;
  }

  async findUser(term: string) {
    const professional = await this.profesionalRepository.findOne({
      where: {
        user: term,
      },
    });
    if (professional) {
      throw new NotFoundException(`Profesional con usuario ${term} ya existe`);
    }
    return true;
  }

  async findProfesionalActive() {
    return this.profesionalRepository
      .createQueryBuilder('profesional')
      .where('profesional.state = :state', { state: true })
      .andWhere('profesional.role = :role', { role: 'EAIS' })
      .leftJoinAndSelect('profesional.brigadaEai', 'brigadaEai')
      .getMany();
  }

  async findOneEnable(term: string) {
    const user = await this.profesionalRepository
      .createQueryBuilder('profesional')
      .leftJoinAndSelect(
        'profesional.brigadaEai',
        'brigadaEai',
        'brigadaEai.state = :state',
        {
          state: true,
        },
      )
      .where('profesional.id_profesional = :term', { term })
      .getOne();

    return user;
  }

  async update(id: string, updateProfesionalDto: UpdateProfesionalDto) {
    const user = await this.profesionalRepository.preload({
      id_profesional: id,
      ...updateProfesionalDto,
    });
    if (!user)
      throw new NotFoundException(`Profesional con ID: ${id} no encontrado`);
    try {
      await this.profesionalRepository.save(user);
      return user;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async updatePassword(id: string, updateProfesionalDto: UpdateProfesionalDto) {
    const { password } = updateProfesionalDto;
    const user = await this.profesionalRepository.preload({
      id_profesional: id,
      password: bcrypt.hashSync(password, 10),
    });
    if (!user)
      throw new NotFoundException(`Profesional con ID: ${id} no encontrado`);
    try {
      await this.profesionalRepository.save(user);
      return user;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deleteProfesional = await this.findOne(id);
    await this.profesionalRepository.remove(deleteProfesional);
  }

  async checkStatus(user: Profesional) {
    return {
      user: {
        id_Profesional: user.id_profesional,
        user: user.user,
        role: user.role,
      },
      token: this.getJwtToken({ id_profesional: user.id_profesional }),
    };
  }

  private getJwtToken(payload: IJwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
