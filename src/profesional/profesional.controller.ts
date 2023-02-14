import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProfesionalService } from './profesional.service';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';
import { Query } from '@nestjs/common/decorators';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AuthProfesionalDto } from './dto/auth-profesional.dto';
import { Profesional } from './entities/profesional.entity';
import { GetUser } from './decorators/get-user.decorator';
import { Auth } from './decorators/auth.decorator';

@Controller('profesional')
export class ProfesionalController {
  constructor(private readonly profesionalService: ProfesionalService) {}

  @Post('register')
  create(@Body() createProfesionalDto: CreateProfesionalDto) {
    return this.profesionalService.create(createProfesionalDto);
  }

  //Login
  @Post('login')
  authProfesional(@Body() authProfesionalDto: AuthProfesionalDto) {
    return this.profesionalService.login(authProfesionalDto);
  }

  //token Validation

  @Get('status-verify')
  @Auth()
  checkAuthStatus(@GetUser() user: Profesional) {
    return this.profesionalService.checkStatus(user);
  }

  @Get('list')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.profesionalService.findAll(paginationDto);
  }

  @Get('search/:term')
  findOne(@Param('term') term: string) {
    return this.profesionalService.findOne(term);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProfesionalDto: UpdateProfesionalDto,
  ) {
    return this.profesionalService.update(id, updateProfesionalDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.profesionalService.remove(id);
  }
}
