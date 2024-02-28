import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profesional } from '../../profesional/entities/profesional.entity';

@Entity()
export class Profesion {
  @PrimaryGeneratedColumn('uuid')
  id_profesion: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  descripcion: string;

  @OneToMany(() => Profesional, (profesional) => profesional.profesion, {
    nullable: false,
    cascade: true,
  })
  profesional: Profesional;

  @BeforeInsert()
  checkProfesionInsert() {
    this.descripcion = this.descripcion.toLocaleUpperCase();
  }
}
