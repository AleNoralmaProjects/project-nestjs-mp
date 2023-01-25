import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthProfesionalDto {
  @IsString()
  user: string;

  @IsString()
  @MaxLength(20)
  @MinLength(6)
  password: string;
}
